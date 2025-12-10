# Guía de Despliegue con Docker - MindCare

Esta guía explica cómo desplegar MindCare usando Docker y Docker Compose, tanto localmente como en producción.

## Requisitos Previos

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (versión 2.0 o superior)
- Cuenta en **Docker Hub** (para publicar imágenes)

### Verificar Instalación

```bash
docker --version
docker-compose --version
```

---

## Despliegue Local con Docker Compose

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.docker.example .env
```

Edita `.env` con tus configuraciones:

```env
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=tu_password_seguro
MONGO_DB=mindcare
JWT_SECRET=tu_secreto_jwt_muy_largo_y_seguro_minimo_32_caracteres
FRONTEND_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000/api
```

### 2. Construir y Levantar los Servicios

```bash
# Construir todas las imágenes
docker-compose build

# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 3. Verificar que Todo Funciona

```bash
# Ver estado de los contenedores
docker-compose ps

# Verificar salud de los servicios
docker-compose ps

# Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend: http://localhost:5000/api
# MongoDB: localhost:27017
```

### 4. Comandos Útiles

```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (¡cuidado! elimina la BD)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart backend

# Ver logs de un servicio
docker-compose logs -f backend

# Ejecutar comandos en un contenedor
docker-compose exec backend sh
docker-compose exec mongodb mongosh
```

---

## Publicar Imágenes en Docker Hub

### 1. Crear Cuenta en Docker Hub

Registrarse en: https://hub.docker.com

### 2. Login desde Terminal

```bash
docker login
# Introduce tu username y password
```

### 3. Construir y Etiquetar Imágenes

```bash
# Backend
docker build -t tuusuario/mindcare-backend:latest ./backend
docker tag tuusuario/mindcare-backend:latest tuusuario/mindcare-backend:v1.0.0

# Frontend
docker build -t tuusuario/mindcare-frontend:latest ./frontend
docker tag tuusuario/mindcare-frontend:latest tuusuario/mindcare-frontend:v1.0.0
```

### 4. Push a Docker Hub

```bash
# Subir backend
docker push tuusuario/mindcare-backend:latest
docker push tuusuario/mindcare-backend:v1.0.0

# Subir frontend
docker push tuusuario/mindcare-frontend:latest
docker push tuusuario/mindcare-frontend:v1.0.0
```

---

## CI/CD con GitHub Actions

### 1. Configurar Secrets en GitHub

Ve a: `Settings > Secrets and variables > Actions > New repository secret`

Añade los siguientes secrets:

- `DOCKER_USERNAME` - Tu username de Docker Hub
- `DOCKER_PASSWORD` - Tu password o Personal Access Token de Docker Hub

### 2. Cómo Funciona el Workflow

El workflow `.github/workflows/docker-build.yml` se ejecuta automáticamente cuando:

- Haces push a `main` o `develop`
- Creas un tag (ej: `v1.0.0`)
- Creas un Pull Request

**Acciones que realiza:**
1. ✅ Construye las imágenes de Backend y Frontend
2. ✅ Las sube a Docker Hub con tags automáticos
3. ✅ Usa caché para builds más rápidos
4. ✅ (Opcional) Despliega automáticamente a producción

### 3. Crear un Release

```bash
# Crear tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

Esto activará el workflow y creará imágenes con tag `v1.0.0`.

---

## Despliegue en Producción

### Opción 1: Servidor VPS (DigitalOcean, AWS, etc.)

#### 1. Conectar al Servidor

```bash
ssh usuario@tu-servidor.com
```

#### 2. Instalar Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 3. Clonar Repositorio o Usar Imágenes de Docker Hub

**Opción A: Desde repositorio**
```bash
git clone https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git
cd DAW2-Proyecto-Grupo-7
cp .env.docker.example .env
# Editar .env con configuraciones de producción
docker-compose up -d
```

**Opción B: Desde Docker Hub** (más recomendado)

Crear `docker-compose.prod.yml`:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    # ... configuración
  
  backend:
    image: tuusuario/mindcare-backend:latest
    # ... configuración
  
  frontend:
    image: tuusuario/mindcare-frontend:latest
    # ... configuración
```

```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### 4. Configurar Nginx Reverse Proxy (Recomendado)

```nginx
# /etc/nginx/sites-available/mindcare
server {
    listen 80;
    server_name mindcare.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 5. Configurar HTTPS con Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mindcare.tudominio.com
```

---

### Opción 2: Plataformas Cloud (Render, Railway, Fly.io)

#### Render.com (Recomendado - Gratis para empezar)

1. **Crear cuenta en Render:** https://render.com
2. **Conectar repositorio de GitHub**
3. **Crear servicios:**
   - Web Service para Backend (Docker)
   - Web Service para Frontend (Docker)
   - Database para MongoDB

#### Railway.app

1. **Crear cuenta en Railway:** https://railway.app
2. **Conectar GitHub y seleccionar repo**
3. **Railway detectará Docker automáticamente**

#### Fly.io

```bash
# Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Crear app
fly launch
```

---

## Monitoreo y Mantenimiento

### Ver Logs en Producción

```bash
# Logs de todos los servicios
docker-compose logs -f

# Logs de un servicio específico
docker-compose logs -f backend

# Últimas 100 líneas
docker-compose logs --tail=100 backend
```

### Actualizar a Nueva Versión

```bash
# Pull de nuevas imágenes
docker-compose pull

# Reiniciar con nuevas imágenes
docker-compose up -d

# Limpiar imágenes antiguas
docker image prune -a
```

### Backup de MongoDB

```bash
# Backup
docker-compose exec mongodb mongodump --out /data/backup

# Copiar backup al host
docker cp mindcare-mongodb:/data/backup ./backup

# Restore
docker-compose exec mongodb mongorestore /data/backup
```

---

## Troubleshooting

### Problema: Contenedor no inicia

```bash
# Ver logs detallados
docker-compose logs backend

# Ver estado del contenedor
docker-compose ps

# Entrar al contenedor para debuggear
docker-compose exec backend sh
```

### Problema: Error de conexión a MongoDB

```bash
# Verificar que MongoDB está corriendo
docker-compose ps mongodb

# Ver logs de MongoDB
docker-compose logs mongodb

# Probar conexión
docker-compose exec mongodb mongosh
```

### Problema: Frontend no se conecta al Backend

1. Verificar `REACT_APP_API_URL` en `.env`
2. Verificar que Backend está corriendo: `curl http://localhost:5000/api`
3. Verificar CORS en Backend

---

## Recursos Adicionales

- **[Documentación de Docker](https://docs.docker.com)**
- **[Documentación de Docker Compose](https://docs.docker.com/compose)**
- **[Best Practices Docker](https://docs.docker.com/develop/dev-best-practices)**
- **[Docker Hub](https://hub.docker.com)**

---

## Soporte

Si tienes problemas con el despliegue:
1. Revisa esta guía
2. Consulta los [Issues del repositorio](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/issues)
3. Abre un nuevo Issue con los logs del error

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0

