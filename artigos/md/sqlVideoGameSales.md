

### Video Game Sales — SQL

#### Descrição de Projeto

Este projeto tem como objetivo praticar a exploração e analise de dados de vendas de videogames utilizando **SQL (MySQL)**, com foco em construção de consultas analíticas, entendimento de regras de negócio e organização de um banco relacional a partir de arquivos CSV.

O projeto foi desenvolvido em um ambiente **Docker com MySQL**.

---

#### Fonte dos Dados

Os dados utilizados neste projeto foram obtidos do **Maven Analytics Data Playground**, contendo informações históricas sobre vendas de videogames por plataforma, gênero, publicadora e região.


[Video Game Sales - Maven Analytics Data Playground](https://mavenanalytics.io/data-playground/video-game-sales )

O conjunto de dados inclui métricas como:

* Vendas na América do Norte
* Vendas na Europa
* Vendas no Japão
* Vendas em outras regiões
* Vendas globais

---

#### Tecnologias Utilizadas

* MySQL 8
* Docker / Docker Compose
* VS Code (como editor)
* WSL


Um volume foi configurado para disponibilizar o arquivo CSV ao container:

```
volumes:
  - ./data:/data
```

#### Estrutura do Banco de Dados

Estrutura de diretórios:
```
project/
├── docker-compose.yml
├── data/
│   └── games_sales.csv
└── sql/
```


Banco de dados criado:

```
video_game_sales
```

Tabela principal:

```
games_sales
```

Estrutura da tabela

```sql
CREATE TABLE games_sales (
    img VARCHAR(255),
    title VARCHAR(255),
    console VARCHAR(50),
    genre VARCHAR(50),
    publisher VARCHAR(100),
    developer VARCHAR(100),
    critic_score DECIMAL(3,1),
    total_sales DECIMAL(5,2),
    na_sales DECIMAL(5,2),
    jp_sales DECIMAL(5,2),
    pal_sales DECIMAL(5,2),
    other_sales DECIMAL(5,2),
    release_date DATE,
    last_update DATE
);
```

### Sobre os tipos de dados...

VARCHAR → textos como títulos, consoles e publishers

DECIMAL → vendas em milhões, cuidando para precisão numérica

critic_score como DECIMAL(3,1) → notas de 0.0 a 10.0

DATE → permite análises temporais por ano, período ou intervalo



### Regras de Negócio Consideradas

Cada linha representa um jogo lançado para um console específico (na lista existem vários jogos repetidos, mas para consoles diferentes)

As vendas regionais (NA, JP, PAL, Other) representam valores independentes

Também inclui as vendas globais

**Um jogo possui:**

um gênero principal
uma publisher principal
O release_date indica o início do ciclo comercial do jogo
Nem todos os jogos possuem critic_score (dados ausentes são esperados)


### Importar o CSV

```
SET GLOBAL local_infile = 1;
```
Isso habilita o servidor MySQL a aceitar LOAD DATA LOCAL INFILE.

Mas existe outra camada de bloqueio, pois o cliente MySQL também precisa ser iniciado com permissão para usar LOCAL INFILE.
Se o cliente não permitir, o servidor nem chega a ler o arquivo.

Então executei no host:
```
docker exec -it nome_do_container mysql \
  --local-infile=1 \
  -u root -p
```

```
SHOW VARIABLES LIKE 'local_infile';
SHOW GLOBAL VARIABLES LIKE 'local_infile';
```
Assim, o MySQL está configurado para permitir a importação de arquivos locais.
Ambos devem retornar ON.

Esse passo precisou ser tomado devido a configuração do MySQL no container Docker, que por padrão desabilita o carregamento de arquivos locais por questões de segurança.

Para realizar a Importação dos dados, utilizei o seguinte comando SQL:

Importação dos dados:
```sql
LOAD DATA LOCAL INFILE '/data/games_sales.csv'
INTO TABLE games_sales
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

Mas antes, para funcionar, precisei adicionar no volumes do docker-compose.yml:
```
      - ./data:/data
```
Isso serviu para definir um volume que mapeia o diretório local `./data` para o diretório `/data` dentro do container Docker, permitindo que o MySQL acesse o arquivo CSV.


Os dados foram importados a partir de arquivos CSV utilizando o comando LOAD DATA LOCAL INFILE, permitindo controle explícito do schema e validação dos tipos de dados antes da análise.


## Processo de Criação de Queries

Um dos principais objetivos do projeto foi aprender mais do que escrever SQL, mas sim considerar sempre o raciocínio por trás.

### Exemplo de abordagem

**Pergunta de negócio:**

> Quais jogos venderam acima da média global do dataset?

**Raciocínio humano:**

* Existe uma média de vendas considerando todos os jogos
* Cada jogo possui um valor de vendas globais
* Jogos acima dessa média são considerados acima do desempenho médio

**Tradução para SQL:**

```sql
SELECT
    title,
    console,
    total_sales
FROM games_sales
WHERE total_sales >
    (SELECT AVG(total_sales) FROM games_sales)
ORDER BY total_sales DESC;
```

---

### Outro exemplo

**Pergunta de negócio:**

> Quais publishers têm o portfólio mais diversificado em gêneros?

**Raciocínio humano:**

* Diversidade não significa vender mais
* Significa atuar em diferentes gêneros
* Contar gêneros distintos por publisher

**SQL:**

```sql
SELECT
    publisher,
    COUNT(DISTINCT genre) AS total_genres
FROM games_sales
GROUP BY publisher
ORDER BY total_genres DESC;
```



## Perguntas Analisadas

* Quais são os 10 jogos mais vendidos do dataset?
* Qual console possui o maior número de jogos lançados?
* Qual gênero possui mais jogos cadastrados?
* Qual publisher lançou mais jogos?
* Qual é a média de vendas globais dos jogos?
* Quais jogos venderam mais de 10 milhões de cópias globalmente?
* Qual console teve maior volume total de vendas globais?
* Quantos jogos foram lançados após 2015?
* Quais gêneros têm vendas globais acima da média geral?
* Quais jogos possuem nota da crítica acima de 9?
* Quais plataformas tiveram maior impacto no mercado global?
* Existem gêneros mais fortes no Japão do que no Ocidente?
* Quais jogos venderam acima da média global do dataset?
* Quais publishers têm o portfólio mais diversificado em gêneros?
* A nota da crítica tem correlação visível com vendas globais?
* Quais consoles dependem mais de poucos jogos “blockbusters”?
* Qual foi o console mais mal sucedido em vendas?
* Qual foi o console mais bem sucedidos em vendas?
* Qual o top 5 generos mais populares?
* Qual o top 5 generos menos populares?


As queries estão no repositório: 
[Video Game Sales — SQL](https://github.com/TheEddu/SQL-Project-Video-Game-Sales)

---

## Conclusão

Este projeto foi desenvolvido com foco em **pensamento analítico**, não apenas em sintaxe SQL.
A proposta é demonstrar como perguntas de negócio podem ser estruturadas, analisadas e traduzidas em consultas claras e reproduzíveis.

Com o SQL sendo tratado como **ferramenta para pensar com dados**.








