<h1>Projeto BlogsAPI</h1>

O BlogsAPI é uma aplicação que tem como objetivo abastecer um blog de notícias. Ou seja, pode-se dizer que é uma api que realiza as quatro operações básicas performadas em um banco de dados (Create, Read, Update, Delete).

<h2>Instalação</h2>

Para clonar o projeto é só colar a seguinte linha de comando no terminal:
- git clone git@github.com:EduardoSimoess/blogsAPI.git;
Em seguida é necessário instalar as dependências do projeto localmente:
- npm i;
Para inicializar a aplicação utilize o comando:
- npm start;
Para utilizar as rotas é necessário o auxílio de alguma extensão como o thunder cliente ou o insomnia.

<h2>Desenvolvimento</h2>

O software selecionado para desenvolver a aplicação foi o node.js, já os dados foram armazenados usando MySQL2. Para facilitar a integração do banco de dados com a aplicação optei pelo uso do Sequelize.

Para melhor organização do projeto utilizei a arquitetura MSC. De modo que, a camada Model fica responsável pela integração com o banco de dados, a Service contém todas as lógicas de negócio utilizadas na aplicação e, por fim, a Controller fica responsável por passar o resultado das requisições.

Por fim, com o intuito de melhorar o grau de segurança da aplicação foi utilizado JSON Web Token!

<h2>Funcionalidades</h2>

O site possibilita que sejam feitas requisições de quatro tipos diferentes: usuários, login, categorias e posts.

1. No primeiro tipo é possível cadastrar ou deletar um usuário (caso possua a autorização necessária para tal), procurar alguém específico através de seu id ou até mesmo receber uma lista com todos os cadastros;

2. Já no segundo temos apenas uma rota que irá verificar se usuário e senha estão corretos, retornando um token de autenticação;

3. Na terceira é possível inserir novas categorias de posts e também ter acesso à lista de todas as categorias já inseridas.

4. O último tipo é o que apresenta o maior número de funcionalidades, foram implementadas rotas para criar e excluir posts, atualizar o conteúdo dos mesmos, além de ter acesso a uma lista com todos eles. Por fim, é possível pesquisar um post utilizando seu id ou até mesmo palavras chave.
