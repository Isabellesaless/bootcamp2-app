# Buscador de Livros

## Autor
Isabelle Sales Silva — Matrícula 22605002

## Descrição
Aplicação web que permite buscar livros pelo título e visualizar capa, autor e ano de primeira publicação de cada resultado.

## API utilizada
- Nome da API e link da documentação: Open Library Search API — https://openlibrary.org/dev/docs/api/search
- Endpoint(s) consumido(s): `https://openlibrary.org/search.json?q={termo}&limit=5`

## Funcionalidades
- Buscar livros pelo título digitado no campo de busca
- Visualizar capa, título, autor(es) e ano de primeira publicação de cada resultado
- Ver uma mensagem amigável quando nenhum livro é encontrado ou quando ocorre um erro na busca

## Como executar localmente
1. Clone: `git clone https://github.com/isabellesaless/bootcamp2-app`
2. Abra o arquivo `index.html` no navegador

## Links
- **Aplicação no ar (GitHub Pages):** https://isabellesaless.github.io/bootcamp2-app/
- **Repositório:** https://github.com/isabellesaless/bootcamp2-app

## Persistência de dados
- Banco de dados: Supabase (PostgreSQL)
- Tabela `favoritos` guarda os livros favoritados pelo usuário
- CRUD implementado:
  - **Criar:** o botão "Favoritar" insere o livro na tabela
  - **Listar:** os favoritos salvos aparecem na seção "Meus favoritos" ao carregar a página
  - **Excluir:** o botão "Excluir" remove o favorito da tabela

## Docker
- **Imagem no Docker Hub:** https://hub.docker.com/r/isabellessilva/bootcamp2-app
- Comando para rodar o container:
`docker run -d -p 8080:80 isabellessilva/bootcamp2-app`
- Depois de rodar, acesse `http://localhost:8080` no navegador

## Sidequests realizadas
- `.dockerignore` configurado para não copiar arquivos desnecessários para a imagem
- Duas tags de versão publicadas no Docker Hub: `v1` e `latest`
- Descrição adicionada ao repositório do Docker Hub
- Dois containers rodando simultaneamente (portas 8080 e 8081)