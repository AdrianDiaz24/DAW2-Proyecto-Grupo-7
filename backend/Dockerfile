# Imagen base de Node.js
FROM node:18-alpine

# Información del mantenedor
LABEL maintainer="MindCare Team"
LABEL description="Backend API REST de MindCare con Node.js y Express"
LABEL version="1.0"

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar código fuente
COPY . .

# Crear usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no root
USER nodejs

# Exponer puerto del backend
EXPOSE 4000

# Variables de entorno por defecto
ENV NODE_ENV=production \
    PORT=4000


# Comando para iniciar la aplicación
CMD ["npm", "start"]

