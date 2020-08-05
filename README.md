# MovieRec
## Equipe:
- Alan Prado Araújo
- Felipe dos Santos Leão Ribeiro
- Francisco de Paula Dias Neto
- Igor Henrique Firmo e Santos
- Lorena Mendes Peixoto
- Marcos Carvalho de Assis

## Descrição do projeto:
Um sistema que armazena e exibe listagens de diversos filmes para o usuário. Este sistema utiliza de informações como preferências de gênero de filme, filmes já assistidos e avaliados, avaliações de outros usuários e atividades de outras pessoas seguidas pelo usuário atual para exibir recomendações de filmes que ele possa assistir.

## Tecnologias:
- Front-end com HTML, CSS, JavaScript e React.
- Back-end com NodeJS e Express.
- Banco de dados não-relacional com MongoDB.
- Sistema de recomendação com Python e scikit-learn.

## Sprint Planning
### Histórias de usuários

#### Gerenciar perfil

Como usuário, eu quero ter um ambiente no sistema que represente meu perfil, onde possa apresentar uma imagem como avatar e compartilhar informações sobre mim.

###### Tarefas
- Projetar e criar tela de cadastro. (frontend - Lorena)
- Projetar e criar tela de login. (frontend - Lorena)
- Projetar e criar tela de perfil. (frontend - Igor)
- Implementar uma API Restful para acesso aos dados. (backend - Felipe)
- Criar servidor Web para acesso às páginas. (backend - Felipe)
- Implementar comunicação com o MongoDB. (backend - Felipe)
- Projetar e criar tabela de usuário. (backend - Alan)
- Implementar camada de acesso e gerenciamento dos usuários. (backend - Alan)
  - inserção; remoção; autenticação.

#### Histórico de filmes assistidos

Como usuário, eu quero guardar meu histórico de filmes assistidos para que eu possa me recordar deles, de seus gêneros e de suas classificações.

###### Tarefas
- Projetar e implementar tela de filmes assistidos. (frontend - Lorena)
- Projetar e criar tabela de filmes com nome, gêneros e classificação. (backend - Alan)
- Projetar e criar tabela de relacionamento de usuário com filmes. (backend - Alan)
- Implementar camada de acesso e gerenciamento de filmes assistidos. (backend - Alan)
  - inserção; remoção.

#### Listas de filmes

Como usuário, eu quero construir listas de filmes, públicas ou secretas, para catalogar filmes de algum tópico e compartilhar com outras pessoas. 

###### Tarefas
- Desenvolver interface de visualização de listas de filmes. (frontend - Lorena)
- Desenvolver interface de edição de listas de filmes. (frontend - Lorena)
- Projetar e criar tabela de listas para filmes. (backend - Alan)
- Implementar camada de acesso e gerenciamento das listas de filmes. (backend - Alan)
  - inserção; remoção de listas.
  - inserção; remoção de filmes nas listas.

#### Busca por filmes

Como usuário, eu quero conseguir encontrar os filmes de que gosto a partir do nome, gênero, ano e classificação de outros usuários.

###### Tarefas
- Projetar e criar tela de busca. (frontend - Igor)
- Popular o banco com a API do imdb. (backend - Alan)
- Implementar camada de acesso e gerenciamento dos filmes. (backend - Alan)
  - busca; filtro por categoria.

#### Recomendações de filmes

Como usuário, eu quero receber novas recomendações de filmes - baseadas no meu perfil de filmes assistidos, em um determinado filme, ou de um determinado gênero - para que eu possa assistir.

###### Tarefas
- Projetar e criar interface de recomendação de filmes (frontend - Igor).
- Desenvolver interface de comunicação do NodeJS para o Python (backend - Alan)
- Implementar camada de acesso às recomendações de filmes. (backend - Alan)
- Criar recomendador de filmes. (ML - Marcos e Francisco)
  - Criar um notebook, para prova de conceito e exercício, das recomendações baseadas em um filme (ML - Marcos)
  - Criar um notebook, para prova de conceito e exercício, das recomendações baseadas no perfil de usuário (ML - Francisco)
  - Desenvolver API para recomendações
    - GET recomendações de filmes, baseadas em um filme (ML - Marcos)
    - GET recomendações de filmes, baseadas em um ID de usuário (ML - Francisco)
    - GET recomendações de filmes, baseadas em gênero. (ML - Marcos)
  - Inicializar um servidor com acesso à API em Python (ML - Francisco)

#### Resenhas de filmes

Como usuário, eu quero avaliar (com um valor numérico) e resenhar filmes para registrar e compartilhar com outros usuários.

###### Tarefas
- Criar interface de escrita de resenhas. (frontend - Lorena)
- Criar interface de visualização de resenha. (frontend - Lorena)
- Projetar e criar tabela de resenhas de filmes. (backend - Felipe)
- Implementar camada de acesso e gerenciamento das resenhas. (backend - Felipe)
  - inserção; remoção; edição.

#### Avaliações de resenhas

Como usuário, eu quero ter a opção de comentar e curtir as resenhas de outros usuários para expressar minha opinião a respeito delas.

###### Tarefas
- Criar interface de comentários nas resenhas. (frontend - Lorena)
- Criar botão de curtir nas resenhas. (frontend - Lorena)
- Criar mostrador de curtidas nas resenhas. (frontend - Lorena)
- Projetar e criar tabela de comentários. (backend - Felipe)
- Projetar e criar relacionamento de curtidas entre usuários e avaliações. (backend - Felipe)
- Implementar camada de acesso e gerenciamento de curtidas nas resenhas. (backend - Felipe)
  - inserção; remoção.
- Implementar camada de acesso e gerenciamento de comentários nas resenhas. (backend - Felipe)
  - inserção; remoção; edição.
- Ordenar resenhas com base na quantidade de curtidas. (backend - Felipe)

#### Seguir outros usuários

Como usuário, eu quero poder seguir e poder ser seguido por outras pessoas, para que minhas atividades possam ser vistas pelos outros e que eu possa ver a atividade de pessoas que considero interessantes.

###### Tarefas
- Projetar e criar interface de atividades do usuário. (frontend - Igor)
- Projetar e criar interface de atividades dos usuários que ele segue. (frontend - Igor)
- Adicionar botão de “Seguir” e “Deixar de seguir” outros perfis. (frontend - Igor)
- Projetar e criar tabela para relacionamentos de “Seguir” entre os usuários. (backend - Felipe)
- Implementar o relacionamento de “Seguir” no banco de dados. (backend - Felipe)
- Implementar camada de acesso e gerenciamento do relacionamento de “seguir” algum usuário. (backend - Felipe)
  - inserção; remoção; busca de relacionamentos; busca de atividades de usuários seguidos.


## Arquitetura

O diagrama de pacotes a seguir apresenta quatro pacotes principais: WebView, Camada de Negócios (que contém o pacote API de Recomendação (ML)) e Banco de dados. De acordo com as dependências entre eles, nota-se que o pacote WebView usa classes do Camada de Negócio e vice-versa. Classes do pacote Camada de Negócio usam classes do Banco de Dados.

![](/images/package_diagram.jpg)

