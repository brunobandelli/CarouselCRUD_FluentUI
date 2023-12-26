# Carrossel com Painel de Edição

O projeto tem como intuito atender o protótipo proposto no figma e o escopo conforme documento em pdf na pasta raiz localizado: https://github.com/brunobandelli/testeSharePrime/blob/main/Escopo%20do%20Teste.pdf

## Visão Geral

Este projeto consiste em um carrossel com funcionalidades CRUD para gerenciar imagens exibidas no carrossel. Desenvolvido utilizando Vite, React, TypeScript, Axios para requisições de API, Fluent UI para a interface do usuário e MockAPI para simular uma API durante o desenvolvimento.

## Funcionalidades

- Adição, remoção e atualização de imagens no carrossel.
- Verificação aprimorada de dados durante a inserção, incluindo:
  - Consulta para garantir que o número de ordem não esteja duplicado.
  - Restrição para garantir que o número de ordem esteja no intervalo de 1 a 20.
  - Limite de 20 itens na lista do carrossel.

## Tecnologias Utilizadas

- **Vite**: Rápido, flexível e configurável para o desenvolvimento de aplicativos modernos.
- **React**: Biblioteca de JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset JavaScript que adiciona tipagem estática ao código.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **Fluent UI**: Conjunto de ferramentas para criar interfaces de usuário consistentes e intuitivas.
- **MockAPI**: Ferramenta para simular uma API durante o desenvolvimento.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js
- npm (ou yarn)

## Instalação

1. Clone o repositório.
2. Navegue até o diretório do projeto: `cd seu-projeto`
3. Instale as dependências: `npm install` ou `yarn install`

## Configuração

Certifique-se de configurar corretamente as variáveis de ambiente ou arquivos de configuração, se aplicável.

## Uso

Execute o projeto localmente com o comando:

```bash
npm run dev
````
Ou, se estiver usando yarn:

```bash
yarn dev
````

Contato
Se tiver dúvidas ou sugestões, entre em contato através do brunobandelli@gmail.com.
