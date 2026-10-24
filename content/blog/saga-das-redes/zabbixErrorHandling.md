# A saga das redes: Monitoramento de um Ubuntu Server com Zabbix em Docker no Arch Linux: diagnóstico e solução

## 1. Introdução

Como parte da construção do meu homelab, iniciei a implementação de um ambiente de monitoramento utilizando o Zabbix Server executado em containers Docker no Arch Linux e uma máquina virtual Ubuntu Server como host monitorado.

O objetivo é praticar monitoramento de infraestrutura, administração de sistemas Linux, redes, containers e diagnóstico de conectividade em um ambiente controlado.

Mas logo no começo, durante a configuração, já encontrei o primeiro problema, o host Ubuntu Server aparecia indisponível na interface do Zabbix, mesmo com o agente instalado e em execução. A investigação revelou dois pontos importantes: o encaminhamento de tráfego entre as redes virtuais e a autorização de acesso no Zabbix Agent.

## 2. Arquitetura do laboratório

O ambiente foi organizado da seguinte forma:

| Componente | Configuração |
|---|---|
| Sistema de monitoramento | Arch Linux |
| Servidor Zabbix | Docker Compose |
| Versão do Zabbix | 7.4 |
| Banco de dados | MySQL 8.4 em contêiner |
| Interface web | Zabbix Web com Nginx |
| Host monitorado | Ubuntu Server em máquina virtual |
| Virtualização | KVM/libvirt |
| Agente | Zabbix Agent clássico |
| Porta do agente | TCP 10050 |
| Porta do servidor Zabbix | TCP 10051 |

O Ubuntu Server estava conectado à rede virtual do libvirt, com endereço `192.168.122.35`. O host Arch utilizava a interface virtual `virbr0`, com endereço `192.168.122.1` nessa rede.

O servidor Zabbix estava conectado a diferentes redes Docker, incluindo uma rede frontend e redes internas destinadas à separação dos serviços.

## 3. O problema inicial

Na interface web do Zabbix, o host Ubuntu Server aparecia indisponível, com falha de conexão ao agente:

`Cannot establish TCP connection to [[192.168.122.35]:10050]`

Inicialmente, era necessário descobrir se o problema estava no serviço do agente, no endereço configurado, no firewall ou na comunicação entre as redes.

A primeira etapa foi validar os componentes individualmente.

### Verificações realizadas

- Confirmar que o serviço `zabbix-agent` estava ativo no Ubuntu Server.
- Verificar se o agente estava escutando na porta TCP 10050.
- Conferir o endereço IP e a porta configurados na interface do Zabbix.
- Testar a comunicação a partir do contêiner do Zabbix Server.
- Inspecionar as rotas e regras de encaminhamento do Arch Linux.
- Capturar pacotes com `tcpdump` para observar o tráfego real.

Essa abordagem ajudou a separar um problema de conectividade de um problema de autorização no agente.

## 4. Diagnóstico da conectividade entre Docker e libvirt

O Zabbix Server estava conectado a várias redes Docker. Algumas delas utilizavam a opção `internal: true`, que restringe a conectividade externa dessas redes.

Por isso, testes realizados a partir dessas redes apresentaram falha de roteamento. Isso não significava que todo o ambiente Docker estava sem conectividade: era necessário testar a partir da rede efetivamente utilizada pelo contêiner do Zabbix Server.

A captura de pacotes na bridge Docker mostrou tentativas de conexão com o Ubuntu. Entretanto, os pacotes inicialmente não apareciam na interface `virbr0`.

A análise das regras do `nftables` mostrou que o libvirt mantinha regras de encaminhamento com rejeições para tráfego que não correspondesse às condições permitidas.

### Ajuste de firewall

Foi adicionada uma regra específica para permitir o encaminhamento TCP da interface frontend do Docker para a porta 10050 do Ubuntu Server.

A regra aplicada no Arch foi:

```bash
sudo nft insert rule ip libvirt_network guest_input \
    iifname "br-9837f527ba0c" \
    oifname "virbr0" \
    ip saddr 172.16.238.2 \
    ip daddr 192.168.122.35 \
    tcp dport 10050 \
    counter accept
```

A regra foi direcionada ao contêiner do Zabbix Server (`172.16.238.2`), ao Ubuntu Server (`192.168.122.35`) e à porta específica do agente.

**Detalhe:** essa regra foi inserida em tempo de execução. Ela precisaria ser validada e persistida por um mecanismo compatível com o gerenciamento de firewall do libvirt, pois pode desaparecer após reinicializações ou a recriação das regras. O nome da bridge e os endereços também dependem da configuração atual do ambiente.

## 5. Identificação do endereço de origem

Após permitir o encaminhamento, o teste de conexão deixou de falhar da mesma maneira. Entretanto, o comando `zabbix_get` passou a retornar uma resposta vazia, indicando que a conexão TCP era estabelecida, mas o agente encerrava a comunicação.

A captura de pacotes no Ubuntu Server revelou o detalhe decisivo:

```text
192.168.122.1:<porta-origem> > 192.168.122.35:10050
```

Embora a requisição partisse do contêiner Docker, o Ubuntu recebia a conexão com origem `192.168.122.1`, o endereço do host Arch na rede virtual do libvirt.

Isso acontecia devido à tradução de endereços de rede (NAT) no caminho entre as redes.

Essa descoberta demonstrou por que não bastava autorizar somente o endereço físico do Arch (`192.168.88.253`) ou o endereço interno do contêiner Docker.

## 6. Correção da autorização no Zabbix Agent

O arquivo de configuração do agente clássico está localizado em:

```text
/etc/zabbix/zabbix_agentd.conf
```

O parâmetro `Server` define quais endereços IP podem realizar consultas passivas ao agente. A configuração original autorizava apenas o endereço físico do Arch.

A linha foi alterada para incluir também o endereço efetivamente observado na captura:

```ini
Server=192.168.88.253,192.168.122.1
```

O nome do host foi mantido conforme cadastrado no Zabbix:

```ini
Hostname=ubuntu-server-lab
```

Após salvar a configuração, o serviço foi reiniciado:

```bash
sudo systemctl restart zabbix-agent
sudo systemctl status zabbix-agent --no-pager
```

Essa alteração autorizou o endereço de origem utilizado na comunicação com o agente, sem liberar indiscriminadamente qualquer endereço IP.

## 7. Validação final

O teste foi realizado a partir do contêiner do Zabbix Server:

```bash
sudo docker exec zabbix-docker-zabbix-server-1 \
    zabbix_get -s 192.168.122.35 -p 10050 -k agent.ping
```

O resultado esperado para uma consulta bem-sucedida é:

```text
1
```

Depois do ajuste no parâmetro `Server` e da reinicialização do agente, o host passou a aparecer como **Available** (verde) na interface web do Zabbix.

O resultado confirmou que a comunicação entre o servidor de monitoramento e o agente estava funcionando.

## 8. Principais aprendizados

Este exercício reforçou alguns conceitos importantes para administração de sistemas e monitoramento de infraestrutura:

- **Diagnóstico por camadas:** verificar serviço, porta, roteamento, firewall e autorização separadamente.
- **Redes Docker:** compreender que contêineres podem estar conectados a diferentes redes, com políticas de conectividade distintas.
- **Virtualização com libvirt:** entender como as regras de firewall influenciam o tráfego encaminhado para máquinas virtuais.
- **NAT e endereços de origem:** identificar o endereço realmente visto pelo destino em vez de presumir qual endereço será utilizado.
- **Zabbix Agent:** diferenciar conectividade TCP de autorização para consultas passivas.
- **Observabilidade e troubleshooting:** usar ferramentas como `tcpdump`, `nftables`, `journalctl` e `zabbix_get` para validar hipóteses com evidências.

Um dos aprendizados mais relevantes foi que uma conexão pode alcançar a máquina e ainda assim não funcionar corretamente na camada da aplicação. O endereço de origem observado pelo destino pode ser diferente daquele esperado, especialmente em ambientes com Docker, NAT e virtualização.

## Conclusão

A implementação do Zabbix em Docker no Arch Linux, monitorando um Ubuntu Server virtualizado, tornou-se um exercício prático de integração entre containers, redes virtuais, firewall e monitoramento.

Mais do que resolver uma falha de disponibilidade, o processo demonstrou a importância de investigar o caminho real dos pacotes, confirmar os endereços de origem e validar as permissões da aplicação com testes objetivos.

Esse é o propósito do homelab: transformar conceitos de redes e sistemas em experiência prática, documentada e reproduzível.