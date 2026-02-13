# MindCare API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.16.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-8.0.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Grok_AI-Enabled-FF6F00?style=for-the-badge&logo=openai&logoColor=white" alt="Grok AI" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <strong>Backend RESTful API para la plataforma de bienestar emocional MindCare</strong>
</p>

---

## 📑 Índice

- [Descripción](#-descripción)
- [Stack Tecnológico](#-stack-tecnológico)
- [Quick Start](#-quick-start)
- [Variables de Entorno](#-variables-de-entorno)
- [Arquitectura y Diseño](#-arquitectura-y-diseño)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Integración con Grok AI](#-integración-con-grok-ai)
- [Sistema de Seguridad](#-sistema-de-seguridad)
- [Dockerización](#-dockerización)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación Adicional](#-documentación-adicional)
- [Contribución](#-contribución)

---

## 📋 Descripción

**MindCare API** es el backend de una aplicación de salud mental diseñada para proporcionar herramientas digitales de autogestión emocional. Esta API gestiona:

- 🔐 **Autenticación segura** con JWT y bcrypt
- 📝 **Diario personal** con sistema de protección por contraseña para compartir entradas
- 📊 **Registros diarios** de estado emocional, sueño, actividades y cogniciones
- 📋 **Formularios iniciales** para personalizar el seguimiento del usuario
- 🆘 **Contactos de emergencia** con envío de emails automáticos
- 🤖 **Análisis con IA** mediante integración con Grok (OpenRoute)

El sistema está diseñado siguiendo principios de **Clean Architecture**, con separación clara de responsabilidades entre controladores, servicios y modelos.

---

## 🛠️ Stack Tecnológico

### Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18.x | Runtime JavaScript |
| **Express** | 4.16.x | Framework web minimalista |
| **MongoDB** | 7.x+ | Base de datos NoSQL |
| **Mongoose** | 8.0.3 | ODM para MongoDB |

### Autenticación y Seguridad

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **jsonwebtoken** | 9.0.2 | Generación y verificación de JWT |
| **bcryptjs** | 2.4.3 | Hashing de contraseñas (10 salt rounds) |
| **Helmet** | 7.1.0 | Headers HTTP de seguridad |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |

### Comunicaciones e IA

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Nodemailer** | 7.0.11 | Envío de emails de emergencia |
| **Axios** | 1.13.2 | Cliente HTTP para API de Grok |
| **Grok AI** | 4.1 | Análisis inteligente de datos del usuario |

### DevOps

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Docker** | Latest | Containerización |
| **Nodemon** | 3.0.2 | Hot-reload en desarrollo |
| **Morgan** | 1.9.1 | HTTP request logger |

---

## 🚀 Quick Start

### Prerrequisitos

- Node.js 18.x o superior
- MongoDB 7.x o cuenta en MongoDB Atlas
- npm o yarn

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git
cd DAW2-Proyecto-Grupo-7/backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar en modo desarrollo
npm run dev

# El servidor estará disponible en http://localhost:4000
```

### Verificar que funciona

```bash
curl http://localhost:4000/api/health
# Respuesta: {"status":"ok","message":"API is up and running","timestamp":"..."}
```

---

## 🔧 Variables de Entorno

Crea un archivo `.env` en el directorio `backend/` con las siguientes variables:

```env
# Servidor
PORT=4000
NODE_ENV=development

# Base de Datos
MONGODB_URI=mongodb://localhost:27017/mindcare

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura_de_al_menos_32_caracteres
JWT_EXPIRES_IN=1h

# Frontend (para CORS)
FRONTEND_URL=http://localhost:3000

# Email (Nodemailer con Gmail)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_de_gmail

# IA - Grok (OpenRoute)
OPENROUTE_API_KEY=tu_api_key_de_openroute
```

> ⚠️ **Importante**: Nunca subas el archivo `.env` a un repositorio público.

---

## 🏗️ Arquitectura y Diseño

MindCare API sigue una arquitectura de capas con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Frontend)                    │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   EXPRESS MIDDLEWARE                     │
│   ┌─────────┐  ┌──────┐  ┌────────┐  ┌───────────────┐ │
│   │ Helmet  │  │ CORS │  │ Morgan │  │ JSON Parser   │ │
│   └─────────┘  └──────┘  └────────┘  └───────────────┘ │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      ROUTES LAYER                        │
│  /auth  /diario  /registro  /formulario  /contactos     │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│              AUTH MIDDLEWARE (JWT Verification)          │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  CONTROLLERS LAYER                       │
│   Business Logic & Request/Response Handling             │
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│              MODELS LAYER (Mongoose Schemas)             │
│  User  │  Diario  │  Registro  │  Formulario  │  Contacto│
└───────────────────────────┬─────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     MONGODB DATABASE                     │
└─────────────────────────────────────────────────────────┘
```

### Documentación detallada

| Documento | Descripción |
|-----------|-------------|
| [Arquitectura de Autenticación](docs/arquitectura-auth.md) | Diagramas de flujo del sistema JWT |
| [Guía del Middleware de Auth](docs/auth-middleware-guide.md) | Uso de `authMiddleware` y `optionalAuthMiddleware` |
| [Referencia completa de la API](docs/API_REFERENCE.md) | Especificación de todos los endpoints |

---

## 📡 Endpoints de la API

### Resumen de Endpoints

| Módulo | Base Path | Auth | Descripción |
|--------|-----------|------|-------------|
| **Auth** | `/api/auth` | Parcial | Registro, login y perfil |
| **Diario** | `/api/diario` | Sí | CRUD de entradas de diario |
| **Registros** | `/api/registro` | Sí | Registros emocionales diarios |
| **Formulario** | `/api/formulario` | Sí | Formulario inicial del usuario |
| **Contactos** | `/api/contactos-emergencia` | Sí | Gestión de contactos de emergencia |
| **IA** | `/api/ai` | No | Análisis con Grok AI |
| **Health** | `/api/health` | No | Health check del servicio |

> 📖 **Ver la referencia completa**: [docs/API_REFERENCE.md](docs/API_REFERENCE.md)

### Ejemplos de Uso

#### Registro de usuario

```bash
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "password": "MiPassword123!"
}
```

#### Login y obtención de token

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "maria@ejemplo.com",
  "password": "MiPassword123!"
}

# Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Acceso a ruta protegida

```bash
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🤖 Integración con Grok AI

MindCare integra **Grok AI** (a través de OpenRoute) para proporcionar análisis inteligente de los datos emocionales del usuario. Esta funcionalidad permite:

- **Análisis de patrones** en los registros emocionales
- **Recomendaciones personalizadas** basadas en el historial del usuario
- **Detección de tendencias** en el estado de ánimo

### Endpoint de IA

```bash
POST /api/ai/analyze
Content-Type: application/json

{
  "registros": [...],      # Historial de registros emocionales
  "formulario": {...},     # Datos del formulario inicial
  "periodo": "7d"          # Periodo de análisis
}
```

### Configuración

Para habilitar la funcionalidad de IA, configura la variable de entorno:

```env
OPENROUTE_API_KEY=tu_api_key_de_openroute
```

> 🔗 **API utilizada**: [OpenRoute Grok 4.1 Fast](https://api.openrouteservice.org)

---

## 🔐 Sistema de Seguridad

MindCare implementa múltiples capas de seguridad:

### Capas de Protección

| Capa | Implementación | Descripción |
|------|----------------|-------------|
| **HTTP Headers** | Helmet | Configura headers seguros (CSP, HSTS, etc.) |
| **Autenticación** | JWT | Tokens firmados con expiración de 1 hora |
| **Contraseñas** | bcryptjs | Hashing con 10 salt rounds |
| **CORS** | cors middleware | Control de orígenes permitidos |
| **Validación** | Controllers | Validación de inputs en cada endpoint |
| **Autorización** | authMiddleware | Verificación de permisos por ruta |

### Mejores Prácticas Implementadas

```javascript
// 1. Helmet para headers seguros
app.use(helmet());

// 2. CORS restrictivo
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// 3. Bcrypt con salt rounds seguros
const SALT_ROUNDS = 10;
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

// 4. JWT con expiración corta
jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
```

---

## 🐳 Dockerización

### Build Local

```bash
# Construir imagen
docker build -t mindcare-backend .

# Ejecutar contenedor
docker run -d \
  -p 4000:4000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/mindcare \
  -e JWT_SECRET=tu_secret \
  --name mindcare-api \
  mindcare-backend
```

### Docker Compose (Recomendado)

Desde la raíz del proyecto:

```bash
# Levantar todos los servicios (Backend + Frontend + MongoDB)
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down
```

### Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app

# Dependencias de producción
COPY package*.json ./
RUN npm install --production

# Código fuente
COPY . .

# Usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 4000
ENV NODE_ENV=production PORT=4000

CMD ["npm", "start"]
```

---

## 🧪 Testing

### Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Producción
npm start

# Test de autenticación
npm run test:auth

# Test de CORS
npm run test:cors
```

### Testing con Postman

Importa la colección de Postman desde `postman/` para probar todos los endpoints:

1. Abre Postman
2. Importa `postman-collection.json`
3. Configura las variables de entorno (`baseUrl`, `token`)
4. Ejecuta las requests

---

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── app.js                 # Configuración de Express
│   ├── server.js              # Entry point
│   ├── config/                # Configuraciones
│   ├── controllers/           # Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── diario.controller.js
│   │   ├── registro.controller.js
│   │   ├── formulario.controller.js
│   │   └── contactoEmergencia.controller.js
│   ├── middleware/            # Middlewares personalizados
│   │   └── authMiddleware.js
│   ├── models/                # Esquemas de Mongoose
│   │   ├── usuarios_mongoose.js
│   │   ├── diario_mongoose.js
│   │   ├── registro_mongoose.js
│   │   ├── formularioInicial_mongoose.js
│   │   └── contactoEmergencia_mongoose.js
│   ├── routes/                # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── diario.routes.js
│   │   ├── registro.routes.js
│   │   ├── formulario.routes.js
│   │   ├── contactoEmergencia.routes.js
│   │   ├── ia.routes.js
│   │   └── health.routes.js
│   ├── ia/                    # Integración con Grok AI
│   │   ├── grokController.js
│   │   └── grokService.js
│   ├── services/              # Servicios de negocio
│   ├── utils/                 # Utilidades
│   └── views/                 # Vistas Pug (errores)
├── docs/                      # Documentación técnica
│   ├── arquitectura-auth.md
│   ├── auth-middleware-guide.md
│   └── API_REFERENCE.md
├── postman/                   # Colección de Postman
├── scripts/                   # Scripts de testing
├── logs/                      # Archivos de log
├── uploads/                   # Archivos subidos
├── Dockerfile                 # Configuración Docker
├── package.json
├── .env.example
└── README.md
```

---

## 📚 Documentación Adicional

| Documento | Descripción |
|-----------|-------------|
| [API_REFERENCE.md](docs/API_REFERENCE.md) | Referencia completa de todos los endpoints |
| [arquitectura-auth.md](docs/arquitectura-auth.md) | Arquitectura del sistema de autenticación |
| [auth-middleware-guide.md](docs/auth-middleware-guide.md) | Guía de uso del middleware de autenticación |
| [cors-configuration.md](../docs/cors-configuration.md) | Configuración detallada de CORS |
| [postman-guide.md](../docs/postman-guide.md) | Guía de testing con Postman |

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 👥 Equipo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Adrián Díaz Angulo | Backend Lead | [@AdrianDiaz24](https://github.com/AdrianDiaz24) |
| Rocío Luque Montes | Frontend Lead | [@Lmrocio](https://github.com/Lmrocio) |
| José Antonio Díaz Busati | Database Manager | [@JoseAntonioDiazBusati](https://github.com/JoseAntonioDiazBusati) |

---

<p align="center">
  <strong>MindCare API</strong> - Desarrollado con ❤️ para el bienestar emocional
</p>
