# Script para Docker

Estudando Desenvolvimento, Cyber e Linux, uma das maiores frustrações que tive, é ter que executar os mesmos comandos repetidamente, e agora que comecei a usar Docker me deparei com o mesmo problema, ter que executar algo como: 

docker compose up, docker compose down, docker exec para acessar terminais de diferentes serviços. 

Neste artigo abordei uma solução simples e poderosa: criar scripts Bash interativos que centralizam e facilitam essas operações.

## O que é Docker?

Docker é uma plataforma de containerização que permite encapsular aplicações e suas dependências em "containers" portáveis.

### Por que Docker é importante:

1. Consistência: O código roda igual em qualquer lugar (seu PC, servidor, cloud)

2. Isolado: Cada serviço tem seu ambiente separado

3. Escalabilidade: Podemos orquestrar múltiplos containers com Docker Compose

4. Desenvolvimento rápido: Não precisamos instalar MySQL, Apache, PHP, etc localmente

No contexto deste script, Docker nos permite rodar uma aplicação completa (web server + banco de dados) com um único comando.

### O que é WSL (Windows Subsystem for Linux)?

WSL permite executar um ambiente Linux completo dentro do Windows, sem virtualização pesada. 

É especialmente útil para quem tem Windows mas prefere realizar tarefas pelo Linux.

### Por que WSL é importante para Docker?

1. Docker nativo em Linux: Ao usar WSL, podemos executar Docker em um ambiente Linux real

2. Melhor desempenho: Comparado a VirtualBox ou Hyper-V

3. Integração com Windows: Podemos acessar arquivos Windows diretamente do WSL, e inclusive escrever código pelo VS Code.

Este script foi desenvolvido especificamente para ser compatível com WSL, funcionando perfeitamente no terminal Linux dentro do Windows.

```bash
#!/bin/bash

PROJECT_NAME="Docker Project"
URL="http://localhost:8085"

clear

while true; do
  echo "======================================"
  echo " $PROJECT_NAME"
  echo "======================================"
  echo "1) Subir containers (up -d)"
  echo "2) Parar containers"
  echo "3) Rebuild e subir"
  echo "4) Ver containers ativos"
  echo "5) Acessar terminal WEB (PHP)"
  echo "6) Acessar terminal DB (MySQL)"
  echo "7) Ver logs"
  echo "0) Sair"
  echo "--------------------------------------"
  read -p "Escolha uma opção: " option

  case $option in
    1)
      docker compose up -d
      echo "Containers iniciados."
      ;;
    2)
      docker compose down
      echo "Containers parados."
      ;;
    3)
      docker compose down
      docker compose up -d --build
      echo "Containers rebuildados."
      ;;
    4)
      docker ps -a
      ;;
    5)
      docker exec -it project_web bash
      ;;
    6)
      docker exec -it project_db bash
      ;;
    7)
      docker compose logs -f
      ;;
    0)
      echo "Saindo..."
      echo "Aplicação disponível em: $URL"
      exit 0
      ;;
    *)
      echo "Opção inválida."
      ;;
  esac

  echo
  echo "Aplicação disponível em: $URL"
  echo
  read -p "Pressione ENTER para continuar..."
  clear
done
```

Para tornar executável:

```bash
chmod +x run_script.sh
```

Executar com:

```bash
./run_script.sh
```

## O que é MySQL?

MySQL é um sistema de gerência de banco de dados relacional (RDBMS). 

É uma das combinações mais populares em web development, especialmente com PHP.

### A Utilidade do Script para Docker

Depois de toda essa introdução, voltamos ao ponto principal: por que criar um script Bash para automatizar Docker?

### Economia de Tempo

Sem o script, precisaria digitar manualmente ou ficar copiando e colando os comandos: docker compose up -d, docker ps -a, docker exec -it myapp_web bash etc.

Com um script interativo, uma única execução abre um menu onde podemos escolher a operação desejada.

Não mais digitando de novo, comandos longos.

### Redução de Erros

Com digitação manual é muito fácil escrever com espaços errados, letras faltando, opções incorretas, etc.

### Menu Interativo e Aprendizado

Iniciantes em Docker ganham um menu claro mostrando as operações disponíveis. É uma forma educativa de explorar os comandos sem medo de quebrar algo. Cada opção mostra o que está acontecendo.

### Como o Script Funciona

O script apresentado é um loop infinito (while true) que exibe um menu com 7 opções principais:

1. Subir containers (docker compose up -d)

2. Parar containers (docker compose down)

3. Rebuild e subir (docker compose down + docker compose up -d --build)

4. Ver containers ativos (docker ps -a)

5. Acessar terminal do web (docker exec -it myapp_web bash)

6. Acessar terminal do banco de dados (docker exec -it myapp_db bash)

7. Ver logs (docker compose logs -f)

0. Sair e mostrar a URL da aplicação

### O Fluxo de Execução

Cada vez que o script executa, ele faz loop: mostra o menu, aguarda sua escolha (read -p), usa case para processar a opção e volta ao menu. Isso permite trabalhar de forma fluida sem precisar reinicar o script a cada comando.

### Conclusão

Este script é um exemplo prático de como usar Bash para simplificar a vida de desenvolvedor. Não é mágica, é automação. 

Com Docker e WSL como base, um script bem escrito transforma tarefas repetitivas em um fluxo rápido e seguro.

## A Beleza da Automação

Scripts Bash simples como este são uma “paixão” particular para mim.

Eles não só economizam tempo, mas também padronizam processos. 

Acredito que quando se começa a criar seus próprios scripts, estamos no caminho para se tornar um dev que aplica o que sabe para criar soluções para si mesmo.