

# Schedule Jobs

O projeto **Schedule Jobs** é uma API que fornece dados para a administração de um serviço que permite cadastrar colaboradores, jornadas e associá-los, possibilitando agendar quando cada jornada de cada colaborador será executada. Além disso, o projeto conta com um cron job que roda todos os dias à meia-noite para obter quais serão os jobs a serem executados no dia.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados dos colaboradores e jornadas.
- **Redis**: Armazenamento em memória utilizado para caching e gerenciamento de sessões.
- **BullJs**: Gestão de filas.

## Configuração do Projeto

Para configurar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   $ git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```bash
   $ cd schedule-jobs
   ```

3. Instale as dependências:
   ```bash
   $ npm install
   ```

4. Para subir instancias dos bancos com Docker, execute:
   ```bash
   $ docker-compose up -d
   ```
   Isso irá iniciar os bancos de dados MongoDB e Redis com as variaveis de ambiente ja configuradas.

## Compilar e Executar o Projeto

```bash
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

## Executar Testes

```bash
# testes unitários
$ npm run test
```
