# Segurança da Informação: Grimório de um Cyber Aventureiro

Publicado em Abril de 2025

---

## O Começo da Jornada

Antes de empunhar uma espada digital, todo aventureiro que se preze deve conhecer as regras do jogo. A primeira delas? Segurança da Informação, tão ignorada, mal aplicada, desconhecida por muitos, mas tão importante.

Não é fácil defini-la em uma palavra, é uma área muito ampla, mas basicamente, envolve formas de proteger informações valiosas para pessoas ou grupos, evitando roubos ou perdas, ou minimizando os danos já causados.

---

## Tríade CIA

Um dos tópicos mais básicos da Segurança da Informação são os 3 pilares, chamado de CIA (ou CID em português):

- **Confidencialidade (Confidentiality):** Só quem tem a chave certa pode abrir os portões.
- **Integridade (Integrity):** Os dados não podem ser alterados no caminho, ou seja, o que entra é o mesmo que sai.
- **Disponibilidade (Availability):** As informações devem estar acessíveis sempre que for necessário.

Ou seja, suas informações devem ser confidenciais (somente você ter acesso), íntegras (da mesma forma como você deixou) e disponíveis (sempre acessíveis para você).

---

## Senhas Fracas

Um problema comum em empresas é colocar senhas fracas nos computadores dos usuários comuns, acreditando que eles "não têm nada que pode acabar com a empresa", sem considerar o risco de **escalonamento de privilégios**.

Um ataque hacker normalmente não começa no topo. Os computadores mais básicos, que geralmente têm menos segurança, são os primeiros alvos. Uma vez dentro, o atacante executa o escalonamento de privilégios.

---

## Escalonamento de Privilégios

Não existe uma única forma de escalonar privilégios, cada sistema é diferente. A “arte de escalonar privilégios” consiste em obter acesso aos privilégios de outros usuários, geralmente explorando as permissões deles.

### Escalonamento Horizontal

Transitar entre contas do mesmo nível, como de um funcionário comum para outro. Por exemplo:

- Um atacante acessa computadores de um setor administrativo e transita entre eles.
- Dados de colaboradores podem ser acessados se contas de ex-funcionários não forem removidas.

### Escalonamento Vertical

Subir de nível, como de um funcionário para o administrador do sistema. Por exemplo:

- Um atacante acessa o computador de um usuário básico e usa técnicas para escalar para usuários mais privilegiados, como o administrador.

---

## Controle de Acesso

Controlar o acesso é impedir que qualquer um acesse qualquer coisa. Por exemplo, no ambiente empresarial, impedir que funcionários acessem documentos da diretoria.

Sem controle de acesso, qualquer colaborador poderia:

- Apagar dados do servidor.
- Acessar folhas de pagamento.
- Instalar programas não confiáveis, contaminando a empresa com vírus.

### Boas Práticas de Controle de Acesso

- Criar usuários/grupos e permissões definidos por setor.
- Implementar autenticação multifator (MFA) quando viável.
- Fazer revisões de permissões frequentemente.
- Remover acessos de ex-funcionários imediatamente após a demissão.
- Não permitir contas compartilhadas com nomes genéricos.

---

## Resposta a Incidentes

Nenhuma empresa ou instituição é uma muralha inquebrável. O que se pode fazer é prevenir ou minimizar os danos.

Responder a incidentes envolve:

1. Identificar o que aconteceu.
2. Investigar como e quando aconteceu.
3. Barrar o avanço.
4. Recuperar-se.

Por exemplo, em um ataque de phishing seguido de ransomware, uma boa resposta seria:

- Bloquear o usuário e isolar a máquina.
- Remover a ameaça antes que se espalhe.
- Realizar um relatório com lições aprendidas e reforçar medidas preventivas.

---

## Princípio do Mínimo Privilégio

Se um usuário só precisa acessar conteúdo X para exercer sua função, ele não precisa de acesso ao Y. Por exemplo:

- Um estagiário de logística não deve ter acesso ao sistema financeiro.

### Boas Práticas de Mínimo Privilégio

- Limitar os acessos pelas funções.
- Não permitir contas com acesso de administrador para usuários comuns.
- Realizar revisões constantes.
- Remover acessos de antigos funcionários.

---

## Disclaimer

Este material foi elaborado para compartilhar conhecimento de forma gratuita e acessível. Sou um estudante, e todo o conteúdo aqui apresentado reflete meus estudos, interpretações e experiências pessoais durante minha jornada de aprendizado.

- Este artigo não tem fins comerciais e não possui qualquer vínculo.
- Todo o conteúdo foi desenvolvido de forma original, sem a intenção de reproduzir ou plagiar obras de terceiros.
- Caso algum trecho coincida com materiais já existentes, trata-se de coincidência não intencional e estou aberto a revisar/corrigir/remover o conteúdo, se necessário.
- As informações aqui contidas não substituem orientações profissionais ou consultorias especializadas em segurança da informação.
- As ilustrações presentes neste material foram geradas com inteligência artificial ou são de fontes de imagens de uso livre, para tornar a leitura mais visual e didática.

Este material é parte do meu portfólio como estudante e tem como objetivo demonstrar habilidades, incentivar o aprendizado e colaborar com a comunidade.

---

© 2025 CyberBlog