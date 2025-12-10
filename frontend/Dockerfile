# Etapa 1: build de la app
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código del frontend
COPY . .

# Generar build de producción (ajusta el script si es distinto)
RUN npm run build

# Etapa 2: servir contenido estático con Nginx
FROM nginx:alpine

# Copiar el build al directorio que sirve Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto donde sirve Nginx
EXPOSE 3000

# Config por defecto de Nginx (puedes personalizarla si usas rutas SPA)
CMD ["nginx", "-g", "daemon off;"]
