# Imagen base de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto del backend
EXPOSE 5000

# Variables de entorno por defecto (se sobreescriben en docker-compose)
ENV NODE_ENV=production
ENV PORT=5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

