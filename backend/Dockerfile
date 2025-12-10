# Imagen base
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json / package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código del backend
COPY . .

# Variables de entorno (en producción es mejor pasarlas por -e o secrets)
ENV PORT=4000
ENV NODE_ENV=development
ENV FRONTEND_URL=http://localhost:3000

# IMPORTANTE: NUNCA metas aquí credenciales reales en producción
# ENV JWT_SECRET=...
# ENV MONGODB_URI=...
# ENV EMAIL_USER=...
# ENV EMAIL_PASS=...

# Exponer el puerto del backend
EXPOSE 4000

# Comando de arranque (ajusta si usas otro script)
CMD ["npm", "start"]
