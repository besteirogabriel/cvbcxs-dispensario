# Escolha da imagem base
FROM node:14

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos do projeto
COPY package*.json ./

# Instalando dependências do projeto
RUN npm install

# Copiando o restante dos arquivos do projeto
COPY . .

# Expondo a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]