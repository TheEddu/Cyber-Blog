---
description: >-
  Durante a organização do meu ambiente Arch Linux, aproveitei um SSD Kingston A400 de 240 GB para transformá-lo em uma unidade de armazenamento secundário.
image: "https://images.unsplash.com/photo-1781914476939-91a41b914899?q=80&w=1354&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
---

# Como formatar um SSD secundário no Arch Linux e configurar a montagem automática

Trabalhando com um ambiente Linux, é comum reaproveitar unidades de armazenamento que já foram utilizadas em outras instalações. Mas... ao conectar um SSD secundário, o ambiente gráfico pode apresentar erros ao tentar montar suas partições.

Aqui, decidi documentar o processo de preparação de um SSD Kingston A400 de 240 GB no Arch Linux, desde a identificação do dispositivo até a criação de um novo sistema de arquivos ext4 e a configuração da montagem automática durante a inicialização.
Esse é o SSD que já era usado com Linux, mas fiz um upgrade no meu PC para colocar um NVME de 1tb, mas aproveitando o SSD antigo para armazenamento.

O objetivo foi transformar uma unidade que não estava sendo montada normalmente em um dispositivo de armazenamento secundário, pronto para receber arquivos, projetos e outros dados.

## O problema inicial

Ao tentar acessar o SSD pelo ambiente gráfico (como já havia feito no Windows) foi exibida a mensagem:

`Unable to mount Volume — Not authorized to perform operation`

Essa mensagem indica que a operação de montagem não foi autorizada, mas não foi suficiente para eu identificar a causa exata. O problema parecia estar relacionado às permissões, ao serviço responsável pela montagem ou ao estado da partição.

Como já havia sido realizado um backup dos dados e não existia a necessidade de preservar o sistema de arquivos antigo, escolhi preparar o SSD para um novo uso.

Antes de realizar qualquer alteração, era necessário identificar corretam ente o dispositivo e diferenciá-lo do disco principal (o NVME) que contém o Arch Linux.

### Identificação dos discos

O primeiro passo foi listar os dispositivos de armazenamento e suas partições:

```
lsblk -o NAME,SIZE,MODEL,SERIAL,TYPE,FSTYPE,MOUNTPOINTS
```

Esse comando apresenta informações importantes para o diagnóstico:

- `NAME`: nome do dispositivo ou da partição;
    
- `SIZE`: capacidade;
    
- `MODEL`: modelo do dispositivo;
    
- `SERIAL`: número de série, quando disponível;
    
- `TYPE`: tipo de dispositivo;
    
- `FSTYPE`: sistema de arquivos;
    
- `MOUNTPOINTS`: locais em que as partições estão montadas.
    

No ambiente utilizado, o resultado permitiu identificar dois SSDs:

| Dispositivo    | Modelo        | Capacidade | Utilização     |
| -------------- | ------------- | ---------- | -------------- |
| `/dev/sda`     | Kingston A400 | 223,6 GiB  | SSD secundário |
| `/dev/nvme0n1` | Kingston NV3  | 931,5 GiB  | nvme principal |

O SSD secundário tinha duas partições antigas: uma de 512 MiB em FAT e outra ocupando aproximadamente o restante do espaço em ext4.

O disco principal utilizava Btrfs e continha o sistema em funcionamento.

Essa distinção foi essencial para evitar alterações acidentais na unidade errada.

**Detalhe:** os nomes dos dispositivos podem mudar entre computadores ou inicializações. Antes de executar comandos destrutivos, confirme sempre o modelo, a capacidade, o número de série e a estrutura das partições.

## Verificação e desmontagem das partições

Antes de modificar a estrutura do SSD, é importante verificar se alguma partição está montada:

```
lsblk -o NAME,FSTYPE,MOUNTPOINTS /dev/sda
```

Caso as partições estejam montadas, elas devem ser desmontadas antes de prosseguir:

```
sudo umount /dev/sda1
sudo umount /dev/sda2
```

Se uma partição não estiver montada, o comando poderá informar que ela não está montada. Nesse caso, não há necessidade de desmontá-la novamente.

Se o sistema informar que o dispositivo está ocupado, é necessário identificar o processo que está utilizando a partição antes de continuar.

## Criação de uma nova tabela de partições GPT

Com o dispositivo identificado e suas partições desmontadas, foi utilizado o utilitário `fdisk` para substituir a estrutura de particionamento anterior.

```
sudo fdisk /dev/sda
```

Dentro do programa, foram utilizados os seguintes comandos, um de cada vez:

```
g
n
1
[Enter]
[Enter]
w
```

Cada comando possui uma finalidade:

- `g`: cria uma nova tabela de partições GPT;
    
- `n`: cria uma nova partição;
    
- `1`: define o número da partição;
    
- Primeiro Enter: aceita o setor inicial padrão;
    
- Segundo Enter: aceita o setor final padrão, utilizando o espaço disponível;
    
- `w`: grava as alterações no disco e encerra o programa.
    

O resultado esperado é uma única partição, identificada como `/dev/sda1`, ocupando praticamente todo o espaço disponível.

A criação da tabela GPT substitui a estrutura de particionamento anterior. Por isso, esse procedimento só deve ser realizado depois de confirmar o dispositivo e garantir que os dados necessários estejam protegidos em um backup.

## Atualização e conferência da tabela de partições

Após sair do `fdisk`, a tabela de partições foi atualizada e conferida:

```
sudo partprobe /dev/sda
lsblk -f /dev/sda
```

O objetivo aqui é verificar se o sistema reconheceu a nova estrutura antes da formatação.

## Formatação da partição em ext4

Com a nova partição identificada corretamente, foi criado um sistema de arquivos ext4:

```
sudo mkfs.ext4 -L Dados /dev/sda1
```

Nesse comando:

- `mkfs.ext4` cria um sistema de arquivos ext4;
    
- `-L Dados` atribui o rótulo `Dados`;
    
- `/dev/sda1` identifica a partição que será formatada.
    

O ext4 foi escolhido por ser um sistema de arquivos consolidado no ecossistema Linux, adequado para armazenamento de arquivos, documentos, projetos de desenvolvimento e outros dados.

É importante diferenciar a partição do sistema de arquivos: a partição define uma região do disco, enquanto o ext4 organiza os arquivos e diretórios dentro dela.

**Detalhe:** a formatação substitui as estruturas necessárias para acessar os dados antigos. Só executei depois de ter confirmado que se trata do disco certo.

## Criação do ponto de montagem

No Linux, um sistema de arquivos precisa ser montado em um diretório para que seu conteúdo fique acessível.

Para organizar o armazenamento secundário, foi criado o diretório `/dados`:

```
sudo mkdir -p /dados
```

Esse diretório será o ponto de montagem do SSD. Depois da montagem, os arquivos gravados em `/dados` serão armazenados na partição correspondente.

O`/dados` é apenas uma "convenção", não obrigatório. Outros caminhos tão poderia ser usados tranquilamente.

## Identificação do UUID

Em vez de depender do nome do dispositivo, como `/dev/sda1`, a configuração de montagem pode utilizar o UUID do sistema de arquivos.

Para consultá-lo:

```
sudo blkid /dev/sda1
```

A saída é algo como:

```
/dev/sda1: LABEL="Dados" UUID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" TYPE="ext4"
```

O UUID é um identificador associado ao sistema de arquivos. É melhor usar ele no arquivo de configuração, ajuda a evitar problemas caso a ordem de identificação dos discos seja alterada.

## Configuração da montagem automática com `/etc/fstab`

Para que o SSD seja montado automaticamente durante a inicialização, foi editado o arquivo `/etc/fstab`:

```
sudo nano /etc/fstab
```

Ao final do arquivo, deve ser adicionada uma linha como esta, substituindo o UUID pelo valor real:

```
UUID=UUID-AQUI /dados ext4 defaults,nofail 0 2
```

Os campos dessa configuração representam:

1. **Dispositivo:** UUID do sistema de arquivos;
    
2. **Ponto de montagem:** `/dados`;
    
3. **Tipo:** `ext4`;
    
4. **Opções:** `defaults,nofail`;
    
5. **Dump:** `0`, desativando o uso desse mecanismo tradicional de backup;
    
6. **Verificação:** `2`, definindo a prioridade tradicional de verificação do sistema de arquivos após a raiz.
    

A opção `nofail` permite que a inicialização prossiga caso a unidade não esteja disponível.

Sobre a edição do `/etc/fstab`, é bom tomar certo cuidado, para evitar que uma configuração incorreta venha a provocar problemas durante a inicialização.

## Teste da montagem

Depois de salvar o arquivo, a configuração foi recarregada e testada:

```
sudo systemctl daemon-reload
sudo mount -a
```

O comando `mount -a` tenta montar os sistemas de arquivos definidos no `/etc/fstab` que ainda não estejam montados, permitindo verificar a configuração sem reiniciar o computador.

Em seguida, foram utilizados dois comandos para conferir o resultado:

```
findmnt /dados
df -h /dados
```

O primeiro permite verificar qual sistema de arquivos está montado no diretório. O segundo apresenta a capacidade, o espaço utilizado e o espaço disponível.

Se houver erros durante a montagem, é necessário corrigi-los antes de considerar o procedimento concluído.

## Permissões para o usuário

Após montar o SSD, é possível que o diretório pertença ao usuário `root`. Para permitir que o usuário atual grave arquivos diretamente em `/dados`, foi utilizado:

```
sudo chown "$USER":"$(id -gn)" /dados
```

Esse comando altera o proprietário e o grupo do diretório de montagem.

Como a alteração é feita no diretório onde o SSD está montado, ela não exige modificar as permissões de todo o sistema. É importante executar esse comando com o SSD montado.

## Teste de leitura e gravação

Para confirmar que o armazenamento estava acessível, criei um arquivo de teste:

```
touch /dados/teste.txt
ls /dados
```

O teste verifica se o usuário consegue criar, listar e remover um arquivo no diretório.

Como verificação adicional, vale reiniciar o computador e executar novamente:

```
findmnt /dados
```

Se o SSD estiver montado corretamente após a reinicialização, a configuração de montagem automática estará funcionando como esperado.

## Resultado e possíveis aplicações

Ao final do procedimento, o SSD secundário fica preparado com uma única partição ext4, identificada pelo rótulo `Dados` e configurada para montagem automática em `/dados`.

Esse espaço pode ser utilizado para:

- armazenar documentos e arquivos pessoais;
    
- organizar projetos de desenvolvimento;
    
- guardar arquivos ISO e instaladores;
    
- armazenar backups;
    
- manter arquivos volumosos separados do sistema principal.
    

Em um ambiente de laboratório Linux, separar dados e projetos em uma unidade secundária também pode ajudar na organização do armazenamento. 
Mas claro que isso, por si só, não substitui uma estratégia de backup: falhas físicas, exclusões acidentais e outros incidentes ainda podem causar perda de dados.

## Concluindo...

O reaproveitamento de um SSD no Arch Linux envolve mais do que formatar uma partição. É necessário identificar corretamente o dispositivo, compreender a estrutura de particionamento, escolher o sistema de arquivos, configurar o ponto de montagem e validar a montagem automática.

Neste caso, a preparação do SSD Kingston A400 de 240 GB permitiu transformá-lo em uma unidade secundária para armazenamento, utilizando ferramentas nativas do Linux e uma configuração persistente pelo `/etc/fstab`.

O processo também reforça práticas importantes de administração de sistemas: verificar antes de executar comandos destrutivos, utilizar UUIDs nas configurações de montagem e testar as alterações antes de considerar a tarefa concluída.



