# Escolha da imagem base
FROM node:14

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos do projeto
COPY package*.json ./

# Instalando dependências do projeto
RUN npm install
RUN npm install pg

# Copiando o restante dos arquivos do projeto
COPY . .

# Expondo a porta que o aplicativo usará
EXPOSE 443

# Comando para iniciar o aplicativo
CMD ["npm", "start"]

# Install bcrypt with build from source option
RUN npm install bcrypt --build-from-source
