# Imagen base de Node.js
FROM node:18-alpine

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
EXPOSE 5000

# Variables de entorno por defecto (se sobreescriben en docker-compose)
ENV NODE_ENV=production \
    PORT=5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

# Comando para iniciar la aplicación
CMD ["npm", "start"]

