# Schedule Jobs

## Introdução

O projeto **Schedule Jobs** é uma API desenvolvida para facilitar a administração de um serviço que permite o cadastro de colaboradores e jornadas de trabalho. Com esta API, é possível associar colaboradores a suas respectivas jornadas e agendar a execução dessas jornadas de forma eficiente.

Além disso, o projeto conta com um cron job que é executado diariamente à meia-noite, responsável por identificar quais jobs devem ser executados no dia seguinte. Isso garante que todas as atividades programadas sejam realizadas de maneira oportuna e organizada.

## Estrutura do Projeto

O projeto foi dividido em duas partes principais: **Front-end** e **Back-end**.

### Tecnologias Utilizadas

- **Back-end**: 
  - Node.js
  - NestJs
  - Redis
  - MongoDB

- **Front-end**:
  - React
  - Next
  - Tailwind
  - Shadcn.ui

Essa divisão permite uma melhor organização do código e facilita a manutenção e escalabilidade do sistema.