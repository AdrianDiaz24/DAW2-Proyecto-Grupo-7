# Etapa 1: Build de la aplicación React
FROM node:18-alpine AS builder

# Información del mantenedor
LABEL maintainer="MindCare Team"
LABEL description="Frontend React de MindCare"
LABEL version="1.0"

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Argumentos de build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build de producción
RUN npm run build

# Etapa 2: Servidor Nginx para servir la aplicación
FROM nginx:alpine

# Copiar build de React a Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar script de inicio
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Dar permisos de ejecución al script
RUN chmod +x /docker-entrypoint.sh

# Exponer puerto 80
EXPOSE 80

# Usar el script de inicio personalizado
ENTRYPOINT ["/docker-entrypoint.sh"]


