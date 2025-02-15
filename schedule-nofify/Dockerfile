# Etapa 1: Usar uma imagem base com Node.js
FROM node:18-slim AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json (se houver) para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código-fonte para o container
COPY . .

# Compilar o código do NestJS
RUN npm run build

# Etapa 2: Preparar a imagem final
FROM node:18-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos compilados da etapa anterior
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Expor a porta que o app irá rodar
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "run", "start:prod"]
