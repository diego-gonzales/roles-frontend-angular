# Etapa 1: Construir la aplicación Angular
FROM node:14 AS build

WORKDIR /app

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación en modo de producción
RUN npm run build

# Etapa 2: Crear la imagen final del contenedor
FROM nginx:alpine

# Copiar los archivos de compilación de la aplicación Angular a la carpeta de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para la aplicación
EXPOSE 80

# Comando para iniciar el servidor nginx en segundo plano
CMD ["nginx", "-g", "daemon off;"]
