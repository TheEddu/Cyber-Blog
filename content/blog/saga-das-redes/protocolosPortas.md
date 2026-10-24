# A saga das redes: Protocolos e Portas: o básico das redes de computadores

Quando acessamos um site, enviamos uma mensagem pelo WhatsApp ou assistimos a um vídeo no YouTube, existe uma enorme troca de dados acontecendo entre dispositivos. Já se perguntou como essas informações encontram o caminho certo? E como o computador sabe quem deve receber esses dados?

## Endereço IP

O endereço IP funciona como o endereço de uma casa.

Imagine que alguém vai entregar uma encomenda para você. Primeiro, essa pessoa precisa saber em qual casa você mora. Nas redes, esse "endereço da casa" é o IP, que identifica um dispositivo conectado à rede.

E aproveitando a analogia, dentro da casa existem vários cômodos. Como a encomenda saberia se deve ir para o escritório, cozinha ou quarto?

É aí que entram as portas.

## O que são portas?

As portas são "entradas lógicas" que representam serviços ou aplicações executando dentro de um computador.

O IP identifica qual computador receberá os dados, a porta identifica **qual aplicação** deverá processá-los.

Por exemplo:

- IP → identifica o computador.
- Porta → identifica o serviço dentro desse computador.

Um único computador pode possuir mais de 65 mil portas, de 0 até 65.535.

### Primeiramente, vamos nos atentar às portas conhecidas (Well-Known Ports)

São as portas de **0 a 1023**. Reservadas para serviços muito conhecidos entre o pessoal de TI, como:

- FTP → portas 20 e 21
- SMTP (envio de e-mails) → porta 25
- HTTP → porta 80
- HTTPS → porta 443

Essas portas são padronizadas para facilitar a comunicação entre sistemas.

## Como acontece uma comunicação

Quando vamos usar o computador para acessar um site, O navegador cria uma conexão utilizando:

- Seu endereço IP
- Uma porta efêmera aleatória (por exemplo, 49.163)

Depois envia a requisição para:

- O IP do servidor
- A porta 80 (HTTP) ou 443 (HTTPS)

Quando o servidor responde, ele envia os dados:

- Da porta 80 ou 443
- Para a porta efêmera criada pelo seu computador

Depois de finalizar a comunicação, essa porta temporária é encerrada

## TCP (comunicação confiável)

O TCP (Transmission Control Protocol) é um dos protocolos mais importantes da Internet.

Seu objetivo é garantir que todos os dados cheguem corretamente ao destino.

Entre suas principais características estão:

- entrega confiável
- controle de erros
- confirmação de recebimento
- reorganização dos pacotes na ordem correta
- retransmissão caso algum pacote seja perdido

### O Three-Way Handshake

Antes de iniciar uma comunicação, o TCP estabelece uma conexão através de três etapas:

1. **SYN:** o cliente solicita a conexão
2. **SYN-ACK:** o servidor aceita a solicitação
3. **ACK:** o cliente confirma

Após essas três etapas começa a transmissão dos dados. Esse processo cuida para que ambos os lados estejam prontos para se comunicar.

## Controle de fluxo

O TCP também evita que o transmissor envie dados mais rapidamente do que o receptor consegue processar.

Isso acontece através de um mecanismo chamado Windowing, no qual o receptor informa quanto consegue receber em determinado momento. Assim, a velocidade da transmissão é ajustada dinamicamente.

## UDP (velocidade, sem muita confiabilidade)

O UDP (User Datagram Protocol) também atua na camada de transporte, porém um pouco diferente.

Enquanto o TCP garante que tudo chegue corretamente, o UDP simplesmente envia os dados. Basicamente um “envie e esqueça”.

Ele não confirma recebimento, não reorganiza pacotes, não retransmite dados perdidos, nem estabelece conexão antes do envio.

Mas em compensação… é extremamente rápido.

## Quando utilizar UDP?

O UDP é ideal quando a velocidade é mais importante do que a precisão.

Alguns exemplos:

- transmissões ao vivo
- chamadas de voz (VoIP)
- videoconferências
- jogos online
- streaming de vídeo
- consultas DNS

Nessas situações, perder alguns pacotes costuma ser menos prejudicial do que esperar pela retransmissão.

## ICMP: o protocolo de diagnóstico

Diferente do TCP e do UDP, o ICMP (Internet Control Message Protocol) não serve para transportar dados de usuários. Sua função principal é diagnosticar problemas de rede.

É através dele que ferramentas como o **ping** funcionam.

Quando executamos um ping, é enviado um ICMP Echo Request e o equipamento remoto responde com um ICMP Echo Reply.

Com isso é possível verificar se o equipamento está acessível e o tempo de resposta da rede (latência).

## Ataques envolvendo ICMP

Embora seja muito útil para diagnóstico, o ICMP também pode ser explorado em ataques.

### ICMP Flood

Consiste no envio de milhares de pacotes ICMP para sobrecarregar um servidor.

O objetivo é consumir processamento e largura de banda, causando uma negação de serviço (DoS).

Quando esse ataque parte de milhares de computadores comprometidos, recebe o nome de DDoS, um tipo de ataque bem conhecido.

### Ping of Death

Foi um ataque utilizado contra sistemas antigos.

Ele enviava pacotes ICMP maiores que o tamanho permitido, provocando falhas, travamentos e estouro de memória.

Hoje praticamente todos os sistemas modernos já estão protegidos contra essa vulnerabilidade.

## HTTP e HTTPS

Quando navegamos na Internet, normalmente utilizamos dois protocolos.

### HTTP (Porta 80)

O HTTP é o protocolo tradicional da web. Seu principal problema é que os dados trafegam sem criptografia.

Isso significa que informações como senhas, logins, cartões de crédito podem ser interceptadas caso alguém consiga monitorar a comunicação. Por esse motivo, o HTTP praticamente deixou de ser utilizado em sites modernos.

## HTTPS (Porta 443)

O HTTPS utiliza o mesmo funcionamento do HTTP, porém adiciona criptografia através dos protocolos SSL ou, atualmente, TLS. Com isso podemos ter confidencialidade dos dados, integridade das informações e maior proteção contra interceptações.

Quanto um site apresenta o cadeado ao lado do endereço, significa que a conexão está utilizando HTTPS.

## Por que o HTTPS é tão importante?

Além de proteger os usuários, o HTTPS também oferece vantagens para os próprios sites.

Como maior confiança dos visitantes, melhor posicionamento nos mecanismos de busca (SEO) e proteção contra interceptação de dados.

Hoje, a grande maioria dos sites redireciona automaticamente qualquer acesso HTTP para HTTPS.

## Resumindo

Para entender como a Internet funciona, precisamos aprender alguns conceitos fundamentais:

- O endereço IP identifica o computador.
- A porta identifica o serviço ou aplicação.
- O TCP prioriza confiabilidade.
- O UDP prioriza velocidade.
- O ICMP é utilizado para diagnóstico da rede.
- HTTP utiliza a porta 80 e transmite dados sem criptografia.
- HTTPS utiliza a porta 443 e protege as informações com criptografia.