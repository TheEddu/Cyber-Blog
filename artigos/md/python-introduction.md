# Introdução

## Introdução ao Python: Variáveis, Tipos de Dados e Estruturas Básicas

Dizem que as melhores formas de aprender são praticando e ensinando, então, aqui estou eu, compartilhando um pouco do que aprendi sobre Python, desde o básico.
Apresentando os conceitos básicos iniciais de Python, fundamentais para quem está começando ou quer começar na programação com Python. Não irei apresentar explicações longas e entediantes, e pretendo usar exemplos fáceis de entender e "divertidos".

## VARIÁVEIS

São usadas para armazenar valores. Em Python, não é necessário declarar o tipo de dado.

```python
game = "Pokemon Red & Blue"
main_character = "Red"
pokemon = "Charmander"
print(f"No jogo {game}, o protagonista é {main_character} e seu Pokémon inicial foi {pokemon}.")
```

Resultado:

```bash
No jogo Pokemon Red & Blue, o protagonista é Red e seu Pokémon inicial foi Charmander.
```

Variáveis são como "caixas" onde podemos guardar informações. Podemos dar nomes a essas caixas, como `game`, `main_character` e `pokemon`, e colocar dentro delas valores, como strings (texto) ou números.

Assim, podemos usar essas variáveis em nosso código para realizar operações ou exibir informações de forma dinâmica.

---

## TIPOS DE DADOS

A respeito dos tipos de dados, os principais tipos são:

- **int**: números inteiros (`10`, `5`)
- **float**: números decimais (`3.14`, `0.1`)
- **str**: cadeias de caracteres (`"Hello"`, `'World'`)
- **bool**: valores booleanos (`True`, `False`)
- **list**: listas mutáveis (`[1, 2, 3]`)
- **tuple**: tuplas imutáveis (`(1, 2, 3)`)
- **dict**: dicionários (`{"texto": "algumTexto", "numero": 20`)

---

## OPERADORES

Existem vários tipos de operadores em programação, cada um com uma função específica e importante para o desenvolvimento de lógica e cálculo em código. Vamos explorar alguns deles…

### Operadores Aritméticos

Os **Operadores Aritméticos** são utilizados para realizar operações matemáticas básicas, como adição, subtração, multiplicação e divisão.

Além disso, incluem um operador chamado de **módulo** (`%`), que serve para obtermos o **resto de uma divisão**.

Por exemplo, ao dividir 10 por 5 (`10 / 5`), o resultado é 2, sem resto, mas ao dividir 11 por 5 (`11 / 5`), o resultado é 2, com um resto de 1. O módulo é especialmente útil em muitos contextos, como verificar se um número é par ou ímpar.

Outro operador é o de **potência** (`**`), que eleva um número a uma certa potência. Por exemplo, `5**2` significa 5 elevado à 2, resultando em 25.

É uma forma de multiplicar um número por ele mesmo várias vezes.

### Operadores de Atribuição

Operadores de Atribuição servem para declarar valores a variáveis.

Como o igual (`=`), que simplesmente define um valor para uma variável.

Há também operadores de atribuição compostos, como `+=` (adicionar e atribuir) e `*=` (multiplicar e atribuir), que realizam uma operação matemática e atribuem o resultado à mesma variável.

Exemplo: `x += 1` é o mesmo que `x = x + 1`. São muito úteis para serem usados como contadores.

### Operadores de Comparação

Operadores de Comparação servem para, obviamente, comparar valores, retornam valores booleanos (`True` ou `False`), dependendo da comparação.

### Operadores Lógicos

Operadores Lógicos se tratam de valores booleanos, ou seja, usam "verdadeiro" e "falso". AND, só retorna True se ambos forem verdadeiros, OR, resulta em verdadeiro se ao menos 1 for verdadeiro, e NOT inverte o valor lógico.

- **Aritméticos**: `+`, ,  ,`/`, `//` (divisão inteira), `%` (módulo), `*` (potência)
- **Atribuição**: `=`, `+=`, `=`
- **Comparação**: `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Lógicos**: `and`, `or`, `not`

---

## ESTRUTURAS CONDICIONAIS:

Utilizamos para "controle de fluxo" com `if`, `elif`, `else`, ou seja, criamos "loopings", "if" significa "se" em inglês, é como iniciamos o looping, (em Python, só pode haver 1 if por looping).

O "elif" serve para declararmos as outras alternativas, pode ser usado quantas vezes forem necessárias.

O "else" é como o looping é finalizado, é obrigatório para isso, para o else não se usa condições, ele trabalha como "se não for if nem elif, será else".

```python
classe = input("Você deseja começar a aventura de RPG com qual classe (Cavaleiro, Mago, Lanceiro, Arqueiro)? ").strip().lower()

if classe == "cavaleiro":
	print("Seu equipamento inicial é armadura, espada e escudo!")
elif classe == "mago":
	print("Seu equipamento inicial é manto e cajado!")
elif classe == "lanceiro":
	print("Seu equipamento inicial é lança!")
elif classe == "arqueiro":
	print("Seu equipamento inicial é arco e flecha!")
else:
	print("Tá jogando o jogo errado")

```

Resultado:

![condicionais.png](condicionais.png)

---

## LAÇOS DE REPETIÇÃO

Laços de repetição são usados para executar um bloco de código várias vezes, dependendo de uma condição ou de uma sequência.
Os principais laços de repetição em Python são:

- **for**: itera sobre uma sequência (lista, string, etc.).
- **while**: repete enquanto uma condição for verdadeira.

Nesse exemplo, vamos usar um laço de repetição para simular a contagem regressiva da destruição do planeta Namekusei, como em Dragon Ball Z.

```python
import time

minutos_restantes = 5

for minuto in range(minutos_restantes, 0, -1):
    print(f"O planeta Namekusei vai ser destruído em {minuto} minutos!")
    time.sleep(1)

# Simula a espera de 1 segundo para cada minuto (mas sabemos que no anime leva muuuito mais tempo😅)

print("Namekusei foi destruído!")

```

Resultado:

![contagem.png](contagem.png)

OBS: O `time.sleep(1)` é usado para simular uma pausa de 1 segundo entre as iterações, tornando a contagem mais realista. É um pouco mais avançado, mas não é difícil de entender.
Precisa do "import time" para funcionar, pois é uma biblioteca que permite fazer pausas no código.

---

Outro exemplo simples de laço de repetição, usando tanto o `for` quanto o `while`:

```python
for i in range(5):  # Loop de 0 a 4, pois ele "para" atntes de atingir o numero definido, nesse caso, 5.
	print(i)

    x = 0
    while x < 5:
    print(x)
    # Incrementa x de 1 em 1.
    x += 1

```

---

## FUNÇÕES

Eu definiria funções como sendo "Blocos de código reutilizáveis", são declarados com `def`.

Servem para organizar o código, tornando-o mais legível e modular.

```python
def calcular_dano(forca, arma):
	if arma == "espada":
		return forca * 15
	elif arma == "machado":
		return forca * 10
	else:
		return forca * 5

jogador_forca = 50
jogador_arma = "espada"
dano = calcular_dano(jogador_forca, jogador_arma)
print(f"O dano causado pelo jogador com {jogador_arma} é {dano} pontos de dano!")

```

Resultado:

```bash
O dano causado pelo jogador com espada é 750 pontos de dano!
```

---

## LISTAS

Se trata de uma coleção mutável de elementos, ou seja, que pode ser alterada ao longo do código, podendo ter valores mudados, adicionados ou removidos.

```python
pokemons = ["Pikachu", "Bulbasaur", "Charizard", "Squirtle", "Pidgeot", "Butterfree"]

print("Pokémons capturados pelo Ash:")
for pokemon in pokemons:
    print(f"- {pokemon}")
#Ash captura um novo Pokémon
pokemons.append("Snorlax")
print("\\nNovo Pokémon capturado! Lista atualizada:")
print(pokemons)

```

Resultado:

![lista.png](lista.png)

Detalhe, nesse caso, é um exemplo "imperfeito", mas funcional, pois não foi incluído a funcionalidade de remover um item, mas para fins didáticos e de entendimento, é totalmente compreensível.

---

## TUPLAS

Tuplas são semelhantes às listas, mas são imutáveis, ou seja, não podem ser alteradas após a criação. São definidas com parênteses `()`.

```python
jogos = ("Dark Souls", "Dark Souls 2", "Dark Souls", "Dark Souls 3", "Bloodborne", "Elden Ring", "Sekiro")
print("Alguns Jogos Souls e Soulslike:")
for jogo in jogos:
    print(f"- {jogo}")

```

![tupla.png](tupla.png)

Nesse cenário convém usar tuplas, pois são jogos que já existem, portanto, não podem ser removidos, ou seja, a tupla não muda.
A desvantagem nese caso é que também não pode receber itens novos.

---

## DICIONÁRIOS

Se parece com listas, mas usamos chaves {}, e tem estrutura de chave-valor, ou seja, devemos declarar um "nome" como uma string (portanto, dentro de aspas), colocar 2 pontos e inserir o valor desejado, se for string, deve estar dentro de aspas também, no caso de números ou valores booleanos, não é necessário.

```python

personagem = {
    "nome": "Dante",
    "classe": "Devil Hunter",
    "habilidade": "Devil Trigger",
    "equipamento": ["Espada Rebellion", "Ebony", "Ivory"]
}
print(f"Nome: {personagem['nome']}")
print(f"Classe: {personagem['classe']}")
print(f"Habilidade: {personagem['habilidade']}")
print("Equipamentos:")
for habilidade in personagem["equipamento"]:
    print(f"- {habilidade}")

```

Nesse cenário usamos dicionários, pois temos vários tipos de dados para serem incluídos.

Resultado:

![dict.png](dict.png)

---

## EXCEÇÕES

Tratamento de erros com `try`, `except`, `finally`.

Funciona assim:

1. **try**: Tenta executar um bloco de código.
2. **except**: Se ocorrer um erro, executa o bloco de código dentro do except.
3. **finally**: Executa um bloco de código, independentemente de ocorrer um erro.
Nesse caso, vamos usar um exemplo simples, mas que pode ser adaptado para algo mais complexo.

```python
try:
	escolha = int(input("Escolha entre a pílula azul (0) ou a pílula vermelha (1): "))
	if escolha not in [0, 1]:
		raise ValueError("Escolha inválida!")
	if escolha == 1:
		print("Bem-vindo à realidade, Neo!")
	else:
		print("Você voltou à sua vida normal.")
except ValueError as e:
    print(f"Erro: {e}")

```

![except-0.png](except-0.png)

![except-1.png](except-1.png)

![except-erro.png](except-erro.png)

---

## PROJETO: GERENCIADOR DE JOGOS

Agora, desenvolveremos um pequeno projeto, com conceitos básicos, de um gerenciador de jogos.
A proposta do projeto é que o usuário possa adicionar jogos que tem interesse, criando uma "gamer list", e podendo remover os jogos que já jogou.

```python
# Gerenciador de jogos

# Aqui iniciamos a lista para armazenar os jogos, note que está vazia, pois queremos que o usuário insira os jogos, sem nenhum pré selecionado.

jogos = []

# Função para adicionar um jogo à lista.
# Primeiro declaramos a função "adicionar_jogo", dentro dela, criamos a variável "jogo" e solicitamos que o usuário insira o nome do jogo. usamos o "append" para adicionar o jogo a lista de jogos, a sintaxe para fazer isso no Python é "nome da lista.append(item)", que nesse caso fica como jogos.append(jogo), lembrando que append insere o item no final da lista.
def adicionar_jogo():
    jogo = input("Digite o novo jogo: ")
    jogos.append(jogo)
    print(f"jogo '{jogo}' adicionado com sucesso!\\n")

# Função para remover um jogo da lista.
# Verificamos se a lista está vazia com o "not". Se houver jogos, pedimos o índice do jogo a ser removido e usamos o método pop para removê-lo.
def remover_jogo():
    if not jogos:
        print("Nenhum jogo para remover.\\n")
        return

    mostrar_jogos()

# Nesta parte do código, estamos declarando a função mostrar_jogos(), que inclui o uso de um bloco try/except para lidar com possíveis erros.

#Essa parte é mais complexa, mas o que precisamos entender para esse bloco de código fazer sentido é que é "executada uma tentativa" em que o usuário deve inserir o valor do índice do número que deseja remover, esse "- 1" é importante pois na computação a contagem começa a partir do 0, mas os usuários não visualizam isso, portanto, o que o usuário "vê como sendo" o 1, para o computador é 0, e o que o usuário "vê como sendo" o 2, para computador é 1, e assim por diante, portanto, para que não haja um "conflito de entendimento" entre máquina e humano, é ncessário subtrair 1 do número que o usuário inserir, para que o computador entenda corretamente qual jogo deve ser removido.

# E então verificamos se o índice inserido está dentro do intervalo válido da lista (ou seja, se está entre 0 e o tamanho da lista menos 1). Fazemos isso usando: if 0 <= indice < len(jogos). Caso o índice seja válido, o jogo será removido com o método pop(), que além de remover o jogo da lista, retorna o valor removido para exibirmos uma mensagem confirmando que funcionou.

    try:
        indice = int(input("Digite o número do jogo que deseja remover: ")) - 1
        if 0 <= indice < len(jogos):
            jogo_removido = jogos.pop(indice)
            print(f"jogo '{jogo_removido}' removido com sucesso!\\n")
        else:
            print("Índice inválido!\\n")
# A conversão de entrada para inteiro (int(input())) pode gerar um erro se o usuário inserir alguma coisa que não seja um número (como uma letra ou símbolo). Se isso acontecesse, o Python mostraria um erro do tipo ValueError, fazendo o programa "quebrar". Para evitar que o programa quebre, utilizamos o bloco try/except para capturar esse erro e exibir uma mensagem de aviso para o usuario evitando que o programa quebre.

    except ValueError:
        print("Erro! Insira um número válido.\\n")

# Função para exibir todos os jogos da lista.
# Usamos o "not" para verificar se a lista não está vazia. Se houver jogos, será executado um "for i, jogo in enumerate(jogos, 1)" e eles serão exibidos em uma lista enumerada.

def mostrar_jogos():
    if not jogos:
        print("Nenhum jogo cadastrado.\\n")
    else:
        print(" ===== Seus jogos: =====")
        for i, jogo in enumerate(jogos, 1):
            print(f"{i}. {jogo}")
        print("=========================\\n")

# Função principal para exibir o menu de opções e executar a ação selecionada pelo usuário.
# Aqui as coisas ficam bem simples, criamos a função "menu", dentro dela executamos um "while True", enquanto o usuário não escolher a opção de sair (4), o menu continua a ser exibido.
# Ou seja, enquanto for verdadeiro, ira exibir as mensagens, para o usuário inserir o numero da opção para escolher a ação. O loop serve para realizar a ação que o usuário escolheu, perceba que dentro das opções 1, 2 e 3, as funções criadas anteriormente estão sendo chamadas, ou seja, elas serão executadas dependendo da escolha do usuário.

# Observação: Esse é um ótimo exemplo de como as funções são úteis, pois sem elas, os códigos que colocamos dentro das funções precisariam ser feitos dentro de cada if/elif.

def menu():
    while True:
        print("===== Gerenciador de jogos =====")
        print("1. Adicionar jogo")
        print("2. Remover jogo")
        print("3. Ver todos os jogos")
        print("4. Sair")
        opcao = input("Escolha uma opção: ")
        print("================================")

        if opcao == "1":
            adicionar_jogo()
        elif opcao == "2":
            remover_jogo()
        elif opcao == "3":
            mostrar_jogos()
        elif opcao == "4":
            print("Saindo...")
            break
        else:
            print("Opção inválida!\\n")

# Inicia o programa chamando a função "menu".
menu()

```

Resultado:

![result-project.png](result-project.png)