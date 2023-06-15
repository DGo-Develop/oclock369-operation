# Establecer la imagen base de Node.js
FROM --platform=linux/amd64 node:14-alpine

# Crear un directorio para la aplicación
WORKDIR /usr/src/app

# Copiar el package.json y el package-lock.json (si está presente)
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Si estás en un entorno de desarrollo, instala las dependencias de desarrollo
# RUN npm ci --only=development

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Iniciar la aplicación
CMD [ "node", "index.js" ]
