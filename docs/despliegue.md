# Documentación de Despliegue - MindCare

## Índice

1. [Introducción](#introducción)
2. [Arquitectura de Despliegue](#arquitectura-de-despliegue)
3. [Archivos de Configuración Docker](#archivos-de-configuración-docker)
   - [Backend Dockerfile](#backend-dockerfile)
   - [Frontend Dockerfile](#frontend-dockerfile)
   - [Docker Compose](#docker-compose)
   - [Configuración Nginx](#configuración-nginx)
   - [Script de Inicio del Frontend](#script-de-inicio-del-frontend)
4. [Pipeline CI/CD](#pipeline-cicd)
   - [Flujo de Integración Continua](#flujo-de-integración-continua)
   - [GitHub Actions Workflow](#github-actions-workflow)
   - [Diagrama de Flujo](#diagrama-de-flujo)
5. [Despliegue en Render](#despliegue-en-render)
   - [Configuración del Backend](#configuración-del-backend)
   - [Configuración del Frontend](#configuración-del-frontend)
   - [Variables de Entorno](#variables-de-entorno)
6. [Buenas Prácticas Implementadas](#buenas-prácticas-implementadas)
7. [Resolución de Problemas](#resolución-de-problemas)

---

## Introducción

Este documento describe la infraestructura y procesos de despliegue de la aplicación MindCare. El proyecto utiliza una arquitectura de contenedores Docker, integración continua con GitHub Actions, y despliegue automatizado en Render.

---

## Arquitectura de Despliegue

MindCare está compuesto por dos servicios principales:

- **Backend**: API REST construida con Node.js y Express
- **Frontend**: Aplicación React servida por Nginx

Ambos servicios se dockerizan de forma independiente y se despliegan en Render utilizando imágenes almacenadas en DockerHub.

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   GitHub    │─────>│ GitHub       │─────>│  DockerHub  │
│ Repository  │      │ Actions      │      │             │
└─────────────┘      └──────────────┘      └─────────────┘
                                                   │
                                                   v
                                            ┌─────────────┐
                                            │   Render    │
                                            │  (Backend + │
                                            │   Frontend) │
                                            └─────────────┘
```

---

## Archivos de Configuración Docker

### Backend Dockerfile

El Dockerfile del backend se encuentra en `backend/Dockerfile`.

**Contenido del archivo:**

```dockerfile
FROM node:18-alpine

LABEL maintainer="MindCare Team"
LABEL description="Backend API REST de MindCare con Node.js y Express"
LABEL version="1.0"

RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

ENV NODE_ENV=production \
    PORT=5000

CMD ["npm", "start"]
```

**Características principales:**

1. **Imagen base ligera**: Utiliza `node:18-alpine` para minimizar el tamaño de la imagen.
2. **Healthcheck**: Instala `wget` para verificar el estado del servicio mediante el endpoint `/api/health`.
3. **Instalación de dependencias**: Solo instala dependencias de producción con `npm install --production`.
4. **Seguridad**: Crea y utiliza un usuario no root (`nodejs`) para ejecutar la aplicación.
5. **Variables de entorno**: Define `NODE_ENV=production` y `PORT=5000` como valores por defecto.

### Frontend Dockerfile

El Dockerfile del frontend utiliza una construcción multi-etapa en `frontend/Dockerfile`.

**Contenido del archivo:**

```dockerfile
# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Etapa 2: Producción
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
```

**Características principales:**

1. **Multi-stage build**: Separa la etapa de construcción de la de producción para reducir el tamaño final de la imagen.
2. **Build arguments**: Permite pasar la URL del backend en tiempo de construcción mediante `REACT_APP_API_URL`.
3. **Servidor de producción**: Utiliza Nginx para servir los archivos estáticos compilados.
4. **Puerto dinámico**: Implementa un script de entrada personalizado para soportar puertos dinámicos en plataformas como Render.

### Docker Compose

El archivo `docker-compose.yml` orquesta ambos servicios.

**Configuración del backend:**

```yaml
backend:
  container_name: mindcare-backend
  build:
    context: ./backend
    dockerfile: Dockerfile
  image: mindcare-backend:latest
  restart: unless-stopped
  environment:
    NODE_ENV: production
    PORT: 5000
    MONGODB_URI: ${MONGODB_URI}
    JWT_SECRET: ${JWT_SECRET}
    JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-7d}
    FRONTEND_URL: ${FRONTEND_URL:-http://localhost:3000}
  ports:
    - "5000:5000"
  networks:
    - mindcare-network
  healthcheck:
    test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:5000/api/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s
```

**Configuración del frontend:**

```yaml
frontend:
  container_name: mindcare-frontend
  build:
    context: ./frontend
    dockerfile: Dockerfile
    args:
      REACT_APP_API_URL: ${REACT_APP_API_URL:-http://localhost:5000}
  image: mindcare-frontend:latest
  restart: unless-stopped
  ports:
    - "3000:80"
  depends_on:
    backend:
      condition: service_healthy
  networks:
    - mindcare-network
  healthcheck:
    test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 30s
```

**Características principales:**

1. **Healthchecks**: Ambos servicios implementan verificaciones de salud para asegurar disponibilidad.
2. **Dependencias**: El frontend espera a que el backend esté saludable antes de iniciarse.
3. **Red privada**: Los servicios se comunican a través de una red bridge aislada.
4. **Variables de entorno**: Utiliza archivos `.env` para configuración flexible entre entornos.
5. **Reinicio automático**: Política `unless-stopped` para garantizar disponibilidad.

### Configuración Nginx

El archivo `frontend/nginx.conf` configura el servidor web.

**Contenido del archivo:**

```nginx
server {
    listen ${PORT};
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Cabeceras de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Configuración para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # No cachear el index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        expires 0;
    }

    gzip on;
}
```

**Características principales:**

1. **Puerto dinámico**: Utiliza la variable `${PORT}` para adaptarse a diferentes entornos.
2. **Cabeceras de seguridad**: Implementa cabeceras HTTP para protección contra ataques comunes.
3. **Routing SPA**: Redirige todas las rutas al `index.html` para el correcto funcionamiento de React Router.
4. **Caché optimizado**: Cachea assets estáticos durante 1 año, pero no cachea el HTML principal.
5. **Compresión Gzip**: Reduce el tamaño de los archivos transferidos.

### Script de Inicio del Frontend

El script `frontend/docker-entrypoint.sh` permite puerto dinámico.

**Contenido del archivo:**

```bash
#!/bin/sh
set -e

export PORT=${PORT:-80}

echo "Configurando Nginx en el puerto ${PORT}..."

envsubst '${PORT}' < /etc/nginx/conf.d/default.conf > /tmp/default.conf
cat /tmp/default.conf > /etc/nginx/conf.d/default.conf
rm /tmp/default.conf

echo "Iniciando Nginx..."

exec nginx -g 'daemon off;'
```

**Funcionamiento:**

1. Establece un puerto por defecto (80) si no se proporciona uno.
2. Utiliza `envsubst` para sustituir la variable `${PORT}` en la configuración de Nginx.
3. Reemplaza la configuración original con la procesada.
4. Inicia Nginx en modo foreground.

Esto es necesario porque Nginx no puede interpretar variables de entorno directamente en su configuración. El script procesa la configuración antes de iniciar el servidor.

---

## Pipeline CI/CD

### Flujo de Integración Continua

El proyecto implementa un pipeline automatizado que:

1. Se activa con cada push a las ramas `main` o `dev`
2. Construye imágenes Docker para backend y frontend
3. Etiqueta las imágenes con versionado semántico
4. Publica las imágenes en DockerHub
5. Las imágenes están disponibles para despliegue en Render

### GitHub Actions Workflow

El workflow se encuentra en `.github/workflows/docker-build.yml`.

**Pasos principales del workflow:**

1. **Checkout del repositorio**: Descarga el código fuente.
2. **Extracción de versión**: Lee la versión del proyecto desde el Dockerfile.
3. **Login en DockerHub**: Autenticación usando GitHub Secrets.
4. **Construcción de imágenes**: Ejecuta `docker compose build`.
5. **Etiquetado múltiple**: Aplica etiquetas `latest`, `vX.Y.Z` y nombre de rama.
6. **Publicación**: Sube las imágenes a DockerHub (excepto en pull requests).

**Características del workflow:**

1. **Triggers múltiples**: Push a main/dev, pull requests y ejecución manual.
2. **Versionado automático**: Extrae la versión del Dockerfile backend.
3. **Múltiples etiquetas**: Cada imagen se etiqueta con:
   - `latest`: Última versión construida
   - `vX.Y.Z`: Versión semántica del proyecto
   - Nombre de la rama (ej: `main`, `dev`)
4. **Secrets seguros**: Utiliza GitHub Secrets para credenciales sensibles.
5. **Condicional en push**: No publica imágenes en pull requests.

### Diagrama de Flujo

```
┌──────────────────────────────────────────────────────────────────┐
│                    INICIO: Push a main/dev                       │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             v
                    ┌────────────────┐
                    │ Checkout Repo  │
                    └────────┬───────┘
                             │
                             v
                  ┌─────────────────────┐
                  │ Extraer Versión del │
                  │    Dockerfile       │
                  └──────────┬──────────┘
                             │
                             v
                   ┌──────────────────┐
                   │ Login DockerHub  │
                   └────────┬─────────┘
                            │
                            v
          ┌─────────────────────────────────┐
          │  Construir Imágenes Docker      │
          │  - Backend (Node.js + Express)  │
          │  - Frontend (React + Nginx)     │
          └────────────┬────────────────────┘
                       │
                       v
          ┌────────────────────────────────┐
          │    Etiquetar Imágenes:         │
          │    - latest                    │
          │    - vX.Y.Z (versión)          │
          │    - nombre-rama (main/dev)    │
          └────────────┬───────────────────┘
                       │
                       v
                  ┌─────────┐
                  │ ¿PR?    │
                  └──┬───┬──┘
                     │   │
                 No  │   │ Sí
                     │   │
                     v   v
          ┌──────────────┐    ┌─────────────┐
          │ Push a       │    │ No publicar │
          │ DockerHub    │    │   (Saltar)  │
          └──────┬───────┘    └─────────────┘
                 │
                 v
        ┌────────────────────┐
        │  Imágenes en       │
        │  DockerHub:        │
        │  - Backend         │
        │  - Frontend        │
        └────────┬───────────┘
                 │
                 v
        ┌────────────────────┐
        │  Disponible para   │
        │  Despliegue en     │
        │  Render            │
        └────────────────────┘
```

**Flujo detallado:**

1. **Trigger**: El workflow se activa automáticamente con un push a `main` o `dev`.
2. **Checkout**: Descarga el código del repositorio.
3. **Extracción de versión**: Lee la etiqueta `LABEL version` del Dockerfile backend.
4. **Autenticación**: Login en DockerHub usando secrets configurados en GitHub.
5. **Construcción**: Ejecuta `docker compose build` para crear las imágenes.
6. **Etiquetado**: Aplica múltiples etiquetas a cada imagen para versionado y trazabilidad.
7. **Publicación condicional**: Solo publica en DockerHub si no es un pull request.
8. **Disponibilidad**: Las imágenes quedan disponibles para pull desde Render.

---

## Despliegue en Render

### Configuración del Backend

**Pasos para desplegar el backend:**

1. Crear un nuevo Web Service en Render
2. Seleccionar "Deploy an existing image from a registry"
3. Configurar la imagen: `usuario/mindcare-backend:latest`
4. Configurar el puerto: `5000`
5. Configurar variables de entorno necesarias

**Variables de entorno requeridas:**

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/mindcare
JWT_SECRET=tu-secret-seguro
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://tu-frontend.onrender.com
```

**Configuración avanzada:**

- **Health Check Path**: `/api/health`
- **Auto-Deploy**: Activado para actualizaciones automáticas cuando se publique una nueva imagen

### Configuración del Frontend

**Pasos para desplegar el frontend:**

1. Crear un nuevo Web Service en Render
2. Seleccionar "Deploy an existing image from a registry"
3. Configurar la imagen: `usuario/mindcare-frontend:latest`
4. Render asignará automáticamente un puerto dinámico
5. Configurar variables de entorno necesarias

**Variables de entorno requeridas:**

```
REACT_APP_API_URL=https://tu-backend.onrender.com
PORT=10000
```

> **Importante:** La URL del backend debe ser la URL base **sin** `/api` al final, ya que los endpoints del código ya incluyen la ruta `/api` automáticamente. Por ejemplo: `https://mindcare-backend-latest.onrender.com` (sin `/api`).

Nota: Render asigna automáticamente el puerto, la variable `PORT` se pasa al contenedor.

**Configuración avanzada:**

- **Health Check Path**: `/`
- **Auto-Deploy**: Activado

### Variables de Entorno

**Backend:**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `PORT` | Puerto del servidor | `5000` |
| `MONGODB_URI` | URI de conexión a MongoDB Atlas | `mongodb+srv://...` |
| `JWT_SECRET` | Secret para tokens JWT | `secreto-seguro-aleatorio` |
| `JWT_EXPIRES_IN` | Tiempo de expiración de tokens | `7d` |
| `FRONTEND_URL` | URL del frontend para CORS | `https://frontend.onrender.com` |

**Frontend:**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `REACT_APP_API_URL` | URL del backend API | `https://backend.onrender.com` |
| `PORT` | Puerto asignado por Render | Asignado automáticamente |

**Importante sobre variables de entorno:**

- Los archivos `.env` locales contienen valores para desarrollo (`localhost`)
- Las variables de entorno en Render sobrescriben estos valores en producción
- El código está preparado con fallbacks: `process.env.VARIABLE || 'localhost:xxxx'`

---

## Buenas Prácticas Implementadas

### Seguridad

1. **Usuario no root**: El backend se ejecuta con un usuario sin privilegios (`nodejs:1001`).
2. **Secrets en GitHub**: Credenciales sensibles almacenadas como GitHub Secrets, nunca en el código.
3. **Variables de entorno**: Separación de configuración del código.
4. **Cabeceras de seguridad**: Nginx configurado con cabeceras HTTP de seguridad.
5. **CORS configurado**: Solo permite peticiones desde el dominio del frontend.

### Optimización

1. **Multi-stage builds**: Reduce el tamaño de la imagen del frontend eliminando dependencias de desarrollo.
2. **Imágenes Alpine**: Utiliza imágenes base ligeras para reducir tamaño y superficie de ataque.
3. **Cache de dependencias**: Los `COPY package*.json` separados aprovechan el cache de Docker.
4. **Caché de assets**: Nginx configurado para cachear archivos estáticos durante 1 año.
5. **Compresión Gzip**: Reduce el tamaño de transferencia de archivos.
6. **Producción npm**: Solo instala dependencias de producción en el backend.

### Monitoreo y Fiabilidad

1. **Healthchecks**: Ambos servicios implementan verificaciones de salud.
2. **Restart policies**: Política `unless-stopped` para recuperación automática.
3. **Dependencias entre servicios**: Frontend espera a que backend esté saludable.
4. **Logs estructurados**: Salida de logs en formato legible para debugging.

### CI/CD

1. **Versionado semántico**: Las imágenes se etiquetan con versiones extraídas del código.
2. **Múltiples etiquetas**: Permite revertir a versiones específicas (`latest`, `v1.0`, `main`).
3. **Build automático**: Cada push a main/dev construye y publica imágenes.
4. **Workflow dispatch**: Permite ejecución manual del pipeline.
5. **Validación en PR**: Construye imágenes en pull requests sin publicarlas.

### Mantenibilidad

1. **Dockerfiles documentados**: Comentarios claros en cada paso.
2. **Separación de concerns**: Backend y frontend completamente independientes.
3. **Configuración centralizada**: `docker-compose.yml` como fuente única de verdad para desarrollo.
4. **Logs descriptivos**: Scripts con mensajes informativos sobre el proceso.

### Portabilidad

1. **Variables de entorno**: Configuración flexible para diferentes entornos.
2. **Puerto dinámico**: Script de entrada en frontend soporta puertos asignados dinámicamente.
3. **Fallbacks configurados**: Valores por defecto para desarrollo local.
4. **Docker Compose**: Permite levantar toda la aplicación localmente con un comando.

---

## Resolución de Problemas

### Error: "No open ports detected" en Render

**Causa**: Render no puede detectar en qué puerto está escuchando Nginx.

**Solución**: El script `docker-entrypoint.sh` sustituye la variable `${PORT}` en la configuración de Nginx antes de iniciar el servidor. Asegúrate de que:
- El script tiene permisos de ejecución (`chmod +x`)
- La configuración de Nginx usa `listen ${PORT};`
- Render tiene configurada la variable de entorno `PORT`

### Error: "CORS policy" en frontend

**Causa**: El backend no está configurado para aceptar peticiones desde el dominio del frontend en producción.

**Solución**: 
1. En Render, ve al servicio backend
2. Actualiza la variable `FRONTEND_URL` con la URL del frontend: `https://tu-frontend.onrender.com`
3. Redeploy el servicio

### Error: "Failed to fetch" en el frontend

**Causa**: El frontend está intentando conectarse a `localhost:4000` en lugar del backend desplegado.

**Solución**:
1. En Render, ve al servicio frontend
2. Verifica que la variable `REACT_APP_API_URL` apunte al backend en producción: `https://tu-backend.onrender.com`
3. Redeploy el servicio

### El workflow de GitHub Actions falla en "docker compose build"

**Causa**: Variables de entorno requeridas no están configuradas como GitHub Secrets.

**Solución**:
1. Ve a Settings > Secrets and variables > Actions en tu repositorio
2. Añade los siguientes secrets:
   - `DOCKER_USERNAME`: Usuario de DockerHub
   - `DOCKER_PASSWORD`: Token de acceso de DockerHub
   - `MONGODB_URI`: URI de MongoDB (opcional para build)
   - `JWT_SECRET`: Secret JWT (opcional para build)

### Las imágenes no se actualizan en Render

**Causa**: Render no detecta cambios si solo se actualiza la etiqueta `latest`.

**Solución**:
1. En el dashboard de Render, ve al servicio
2. Haz clic en "Manual Deploy" > "Clear build cache & deploy"
3. O configura webhooks en DockerHub para notificar a Render de nuevas imágenes

### Error: Duplicación de `/api` en las URLs (`/api/api/...`)

**Causa**: La variable `REACT_APP_API_URL` se está configurando con `/api` incluido, pero el código del frontend ya añade `/api` a las rutas. Esto causa que las URL finales sean incorrectas (ej: `https://backend.com/api/api/auth/login`).

**Por qué sucede**: 
- Las variables de entorno de React se "hornean" en el código JavaScript durante el build (`npm run build`)
- Si GitHub Actions construye la imagen con `REACT_APP_API_URL` que incluye `/api`, ese valor queda compilado en la imagen
- Aunque cambies la variable en Render, la imagen ya tiene el valor incorrecto

**Solución**:
1. **Configuración correcta**: La variable `REACT_APP_API_URL` debe ser la URL base **sin** `/api`:
   - ✅ Correcto: `https://mindcare-backend-latest.onrender.com`
   - ❌ Incorrecto: `https://mindcare-backend-latest.onrender.com/api`

2. **Archivos a verificar**:
   - `.github/workflows/docker-build.yml`: Variable `REACT_APP_API_URL` sin `/api`
   - `docker-compose.yml`: Valor por defecto sin `/api`
   - `.env` local: URL sin `/api`

3. **Después de corregir**: 
   - Hacer push a `main` o `dev` para que GitHub Actions construya nuevas imágenes
   - En Render: "Manual Deploy" → "Clear build cache & deploy"

**Verificación**: El código en `frontend/src/config/api.js` ya incluye `/api` en los endpoints:
```javascript
endpoints: {
    login: `${API_URL}/api/auth/login`,  // Ya incluye /api
    // ...
}
```

Por lo tanto, si `API_URL` es `https://backend.com`, la URL final será correctamente `https://backend.com/api/auth/login`.

---

**Última actualización**: 11 de diciembre de 2025  
**Versión del documento**: 1.0  
**Equipo**: MindCare Development Team
