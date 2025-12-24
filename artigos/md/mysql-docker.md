# Mysql com Docker no VS Code

Desde que comecei a estudar banco de dados, algo que me incomoda é o ambiente, Workbench, etc. Até prefiro usar terminal, mas para Queries longas acaba não sendo muito prático.

Então tive uma ideia…

Estudar MySQL usando Docker dentro do WSL, escrevendo pelo VS Code, sem depender de ferramentas gráficas como o Workbench.

Neste artigo, o objetivo é mostrar um pouco sobre um container MySQL com persistência, conectar via extensão **MySQL** no VS Code e organizar os scripts SQL de forma profissional.

---

## Visão geral do ambiente

A ideia geral do setup é:

- Ubuntu WSL
- Docker (versão Desktop no Windows) rodando dentro do WSL
- Um container MySQL com volume para persistir os dados
- VS Code no Windows conectado ao MySQL via extensão **MySQL (cweijan)**

Link da extensão: https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2

---

## Criando o docker-compose do MySQL

Criei um arquivo `docker-compose.yml` com uma configuração básica de MySQL com persistência:

- Definindo:
    - imagem `mysql:8.0`
    - variáveis de ambiente: `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`
    - mapeamento de porta `3306:3306`
    - volume `mysql_data:/var/lib/mysql` para persistir os dados.

Meu exemplo:

![image.png](image.png)

Depois disso é só subir o Container!

---

## Verificando se o MySQL está rodando

Com o container iniciado, podemos conferir se ele está funcionando:

- Com `docker ps` para ver se o serviço `mysql` aparece como `Up`.
- Podemos testar dentro do mysql no terminal com`docker exec -it mysql-dev mysql -u root -p`.

![image.png](image%201.png)

---

## Configurando a conexão na extensão MySQL

Com a extensão instalada, podemos criar uma conexão apontando para o container:

- Host: `localhost`
- Port: `3306`
- User: o usuário configurado no `docker-compose.yml`
- Password: a senha correspondente
- Database: o banco que foi configurado

Depois de salvar a conexão, já podemos ver a conexão feita, nesse caso como “localhost@3306”.

![image.png](image%202.png)

---

## Lidando com permissões e múltiplos schemas

Durante o processo, me deparei com o erro do tipo **“Access denied for user 'user'@'%' to database 'database_name'”**, isso normalmente indica que:

- O usuário que está conectado não tem permissão para criar ou manipular esse schema.
- Vale conferir se você está usando `root` ou outro usuário, e se esse usuário tem privilégios adequados.

Nesse contexto, você pode:

- Usar o usuário `root` na extensão quando precisar criar schemas e estruturas novas.
- Ou criar um novo usuário com permissões específicas.

Nesse caso, eu preferi resolver isso com comandos como root pelo terminal mesmo.

---

## Organizando scripts SQL no projeto

Uma boa prática é manter todos os scripts SQL versionados em pastas.

- `sql/01_create_tables.sql`
- `sql/02_inserts.sql`
- `sql/03_queries.sql`

Isso permite repetir o ambiente do com mais facilidade, e avaliar a própria evolução de estudo e reaproveitar para outros projetos futuramente.

---

## Fluxo de trabalho diário com VS Code

No dia a dia, o fluxo fica bem simples:

- Iniciar o Docker/WSL.
- Subir o container com `docker compose up -d`.
- Abrir o VS Code na pasta do projeto.
- Conectar à instância MySQL via extensão **MySQL** (caso já não esteja conectado).
- Editar e executar os scripts `.sql` diretamente no editor, observando os resultados pela extensão.

---

Minha conclusão foi que trabalhar com MySQL via Docker no WSL e controlando tudo pelo VS Code cria um ambiente mais modular, portátil e concentrado.