# Usar la imagen oficial de Node.js en la versión 18.20.1 como base
FROM node:18.20.1

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias y instalarlas
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente del proyecto al contenedor
COPY . .

# Exponer el puerto en el que tu aplicación estará escuchando
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "build"]
