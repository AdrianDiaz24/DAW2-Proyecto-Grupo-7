<div align="center">

# 🧠 MindCare

### *Plataforma de Bienestar Emocional con Inteligencia Artificial*

<p align="center">
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/RGPD-Compliant-success?style=flat-square" alt="RGPD" />
  <img src="https://img.shields.io/badge/Grok_AI-Integrated-FF6F00?style=flat-square" alt="Grok AI" />
  <img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="CI/CD" />
  <img src="https://img.shields.io/badge/Security-Helmet_+_JWT-red?style=flat-square" alt="Security" />
</p>

<br/>

**[🌐 Demo en Vivo](https://mindcare-frontend.onrender.com)** · **[📖 Documentación API](https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/)** · **[🐛 Reportar Bug](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/issues)** · **[💡 Solicitar Feature](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/issues)**

</div>

---

## 🎯 Nuestra Misión

> **Democratizar el acceso al seguimiento emocional con rigor clínico.**

MindCare nace de una realidad preocupante: **millones de personas enfrentan síntomas depresivos sin acceso a recursos profesionales** debido a barreras económicas, geográficas o estigma social.

Nuestra plataforma combina **fundamentos clínicos basados en el DSM-5 y técnicas de Behavioral Activation** con tecnología moderna y accesible, ofreciendo herramientas de autogestión emocional respaldadas por evidencia científica.

**No reemplazamos la terapia profesional** — somos el puente que acompaña a quienes necesitan apoyo mientras buscan ayuda especializada.

---

## 📑 Índice

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Observabilidad y Monitoreo](#-observabilidad-y-monitoreo)
- [Arquitectura](#-arquitectura)
- [Documentación](#-documentación)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Despliegue en Producción](#-despliegue-en-producción)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Cumplimiento Normativo](#-cumplimiento-normativo)
- [Equipo de Desarrollo](#-equipo-de-desarrollo)

---

## ✨ Características Principales

<table>
<tr>
<td width="50%">

### 🤖 Análisis con Grok AI
Integración con **Grok AI (OpenRoute)** para análisis inteligente de patrones emocionales, detección de tendencias y recomendaciones personalizadas basadas en el historial del usuario.

</td>
<td width="50%">

### 📔 Diario Seguro con Protección Criptográfica
Diario personal con **sistema de contraseñas por entrada** que permite compartir reflexiones de forma segura. Contraseñas hasheadas con bcrypt (10 salt rounds).

</td>
</tr>
<tr>
<td width="50%">

### 📊 Tracking Emocional Basado en Evidencia
Sistema de registros diarios diseñado según **guías clínicas (DSM-5, NICE, APA)**: estado de ánimo, calidad de sueño, niveles de ansiedad, actividades y cogniciones.

</td>
<td width="50%">

### 🆘 Sistema de Emergencia Integrado
**Botón de pánico** con envío automático de emails a contactos de emergencia. Acceso directo a líneas de ayuda profesional cuando más se necesita.

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Seguridad Enterprise-Grade
Autenticación JWT, headers seguros con Helmet, CORS configurado, encriptación bcrypt y validación exhaustiva de inputs en todos los endpoints.

</td>
<td width="50%">

### 📈 Observabilidad Avanzada
**Health checks automatizados**, logging estructurado con Morgan/Winston y endpoints de monitoreo para garantizar disponibilidad 24/7.

</td>
</tr>
</table>

## Aplicación desplegada

MindCare está completamente dockerizada y lista para despliegue en producción con CI/CD automatizado.

### Despliegue Local con Docker

```bash
# Clonar repositorio
git clone https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git
cd DAW2-Proyecto-Grupo-7

# Configurar variables de entorno
cp .env.docker.example .env

# Levantar todos los servicios (Frontend, Backend, MongoDB)
docker-compose up -d

# Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

### Imágenes Docker Disponibles

Las imágenes de Docker están publicadas en Docker Hub y actualizadas automáticamente con CI/CD:

- **Backend:** `dockerhub-username/mindcare-backend:latest`
- **Frontend:** `dockerhub-username/mindcare-frontend:latest`

### URL de Producción

**URL de producción:** [https://mindcare.com](https://daw-2-proyecto-grupo-7.vercel.app)

> **Nota:** La aplicación está desplegada tanto en [Render](https://render.com) como [Vercel](https://vercel.com) usando las imágenes Docker generadas automáticamente por GitHub Actions.

#### Desplegar tu Propia Instancia

**Documentación completa de despliegue:** [docs/despliegue.md](docs/despliegue.md)

El documento de despliegue incluye:
- Arquitectura de despliegue con diagramas
- Configuración de Docker y Docker Compose
- Pipeline CI/CD con GitHub Actions
- Guía paso a paso para Render
- Variables de entorno y configuraciones
- Troubleshooting y resolución de problemas
- Buenas prácticas implementadas

**Despliegue en Render (Recomendado):**
- ✅ Tier gratuito con 750h/mes
- ✅ HTTPS automático
- ✅ Deploy automático desde Docker Hub
- ✅ MongoDB Atlas incluido
- ✅ URL pública accesible

Ver guía paso a paso detallada: [docs/despliegue.md](docs/despliegue.md)

### CI/CD Automatizado

El proyecto incluye GitHub Actions workflows que automatizan:

✅ **Build y Push a Docker Hub** - Cada push a `main` o `dev` construye y publica nuevas imágenes versionadas automáticamente  
✅ **Generación de Documentación JSDoc** - Documentación del código generada automáticamente y desplegada en GitHub Pages  
✅ **Generación de PDFs** - Documentación en formato PDF disponible en artifacts de GitHub Actions  
✅ **Deploy a GitHub Pages** - Documentación técnica accesible públicamente en https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/  

**Workflows disponibles:**
- `docker-build.yml` - Construcción y publicación de imágenes Docker
- `docs-build.yml` - Generación y despliegue de documentación JSDoc

Ver workflows en: [`.github/workflows/`](.github/workflows/)

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2.0 | UI Library con Hooks y Functional Components |
| **React Router DOM** | 6.20.0 | Client-side Routing y navegación SPA |
| **Zustand** | 5.0.8 | State Management minimalista |
| **Axios** | 1.6.2 | HTTP Client con interceptors |
| **React Hot Toast** | 2.6.0 | Sistema de notificaciones UX |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18.x | JavaScript Runtime |
| **Express** | 4.16.1 | Web Framework minimalista |
| **MongoDB** | 7.x+ | Base de datos NoSQL |
| **Mongoose** | 8.0.3 | ODM con validación de esquemas |
| **JWT** | 9.0.2 | Autenticación stateless |
| **bcryptjs** | 2.4.3 | Hashing de contraseñas (10 rounds) |
| **Helmet** | 7.1.0 | Security headers HTTP |
| **Nodemailer** | 7.0.11 | Envío de emails SMTP |

### AI & Analytics
| Tecnología | Propósito |
|------------|-----------|
| **Grok AI** (OpenRoute) | Análisis de patrones emocionales |
| **Morgan** | HTTP Request logging |

### DevOps & Infrastructure
| Tecnología | Propósito |
|------------|-----------|
| **Docker** + **Docker Compose** | Containerización multi-servicio |
| **GitHub Actions** | CI/CD automatizado |
| **Nginx** | Reverse proxy y static serving |
| **Render.com** | Cloud hosting de producción |
| **Docker Hub** | Registry de imágenes |
| **JSDoc** + **Docdash** | Documentación automática |

---

## 📊 Observabilidad y Monitoreo

MindCare implementa un sistema de observabilidad para garantizar la fiabilidad del servicio en producción.

### Health Check Endpoint

```bash
GET /api/health
```

```json
{
  "status": "ok",
  "message": "API is up and running",
  "timestamp": "2026-02-13T10:00:00.000Z"
}
```

### Logging Estructurado

El sistema utiliza **Morgan** para logging de requests HTTP:

```
GET /api/auth/profile 200 15.234 ms - 256
POST /api/registro 201 45.123 ms - 512
GET /api/diario 200 23.456 ms - 1024
```

### Docker Health Checks

Los contenedores incluyen verificación automática de estado:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:4000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Métricas Recomendadas para Producción

| Herramienta | Propósito |
|-------------|-----------|
| **Prometheus** | Recolección de métricas |
| **Grafana** | Dashboards de visualización |
| **Winston** | Logs estructurados a archivo/servicio |
| **Sentry** | Error tracking y alertas |

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                  │
│                    (React + Zustand)                            │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                         │
│               SSL Termination + Static Files                     │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   MIDDLEWARE STACK                       │   │
│  │  Helmet → CORS → Morgan → JSON Parser → Cookie Parser   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌───────────────────────────┼───────────────────────────────┐ │
│  │                      ROUTES                               │ │
│  │  /auth  /diario  /registro  /formulario  /contactos  /ai │ │
│  └───────────────────────────┼───────────────────────────────┘ │
│                              │                                   │
│  ┌───────────────────────────┼───────────────────────────────┐ │
│  │              AUTH MIDDLEWARE (JWT)                        │ │
│  └───────────────────────────┼───────────────────────────────┘ │
│                              │                                   │
│  ┌───────────────────────────┼───────────────────────────────┐ │
│  │                   CONTROLLERS                             │ │
│  └───────────────────────────┼───────────────────────────────┘ │
└──────────────────────────────┼──────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    MONGODB      │  │    GROK AI      │  │     SMTP        │
│   (Mongoose)    │  │  (OpenRoute)    │  │  (Nodemailer)   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Modelos de Datos

| Modelo | Descripción |
|--------|-------------|
| `User` | Usuarios con autenticación y preferencias |
| `Diario` | Entradas del diario con protección opcional |
| `Registro` | Registros emocionales diarios estructurados |
| `FormularioInicial` | Configuración personalizada del usuario |
| `ContactoEmergencia` | Contactos para el sistema de emergencia |

---

## 🚀 Instalación

### 🐳 The Fast Way (Docker Compose)

> **Ideal para:** Demos, testing de integración, evaluación rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git
cd DAW2-Proyecto-Grupo-7

# 2. Configurar variables de entorno
cp .env.docker.example .env
# Editar .env con tus credenciales de MongoDB Atlas

# 3. Levantar toda la infraestructura
docker-compose up -d

# 4. Verificar servicios
docker-compose ps

# 5. ¡Listo!
# Frontend: http://localhost:3000
# Backend:  http://localhost:4000/api
# Health:   http://localhost:4000/api/health
```

```bash
# Detener servicios
docker-compose down
```

---

### 🛠️ The Developer Way (Setup Manual)

> **Ideal para:** Desarrollo activo, debugging, contribuciones al código

#### Prerrequisitos
- **Node.js** 18.x+ ([Descargar](https://nodejs.org/))
- **MongoDB** 7.x local o [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** o **yarn**

#### Backend Setup

```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
# Server
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mindcare

# Auth
JWT_SECRET=tu_clave_secreta_muy_segura_de_32_caracteres
JWT_EXPIRES_IN=1h

# CORS
FRONTEND_URL=http://localhost:3000

# Email (Sistema de Emergencia)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password

# AI (Opcional)
OPENROUTE_API_KEY=tu_api_key
```

```bash
npm run dev
# ✅ Backend corriendo en http://localhost:4000
```

#### Frontend Setup

```bash
cd frontend
npm install
```

Crear archivo `.env`:
```env
REACT_APP_API_URL=http://localhost:4000
```

> ⚠️ **Importante:** `REACT_APP_API_URL` debe apuntar a la URL base **sin** `/api`

```bash
npm start
# ✅ Frontend corriendo en http://localhost:3000
```

#### Verificar Instalación

```bash
# Health check del backend
curl http://localhost:4000/api/health
# Respuesta: {"status":"ok","message":"API is up and running",...}
```

---

## 📚 Documentación

### 📊 Documentation Roadmap

#### 📋 Business & Planning

| Fase | Documento | Descripción |
|------|-----------|-------------|
| 1 | [Definición del Problema](docs/problema.md) | User personas, evidencia de investigación, propuesta de valor |
| 1 | [Análisis de Competencias](docs/analisis-competencias.md) | Estudio de 5 competidores, USP diferenciador |
| 2 | [Viabilidad Técnica](docs/viabilidad-tecnica.md) | Stack justificado, riesgos técnicos, arquitectura |
| 3 | [Objetivos y Alcance](docs/objetivos-alcance.md) | MVP, objetivos SMART, criterios de éxito |
| 4 | [Recursos Necesarios](docs/recursos.md) | Roles, herramientas, servicios externos |
| 4 | [Estructura Organizativa](docs/estructura-organizativa.md) | Organigrama MindTracker Solutions S.L. |
| 5 | [Financiación](docs/financiacion.md) | Plan financiero, proyección de ingresos |
| 5 | [Presupuesto](docs/presupuesto.md) | Costes detallados, Planning Poker, 432h desarrollo |
| 6 | [Legislación](docs/legislacion.md) | RGPD, LOPD, cookies, accesibilidad |

#### 🔧 Technical Deep-Dive

| Categoría | Documento | Descripción |
|-----------|-----------|-------------|
| **Arquitectura** | [Backend README](backend/README.md) | Single Source of Truth del backend |
| **API** | [API Reference](backend/docs/API_REFERENCE.md) | Especificación completa de endpoints |
| **Seguridad** | [Arquitectura Auth](backend/docs/arquitectura-auth.md) | Flujos JWT, mejores prácticas |
| **Desarrollo** | [Middleware Guide](backend/docs/auth-middleware-guide.md) | Guía técnica authMiddleware |
| **Networking** | [Configuración CORS](docs/cors-configuration.md) | Setup, testing, troubleshooting |
| **Testing** | [Guía de Postman](docs/postman-guide.md) | Colección y flujos de prueba |
| **DevOps** | [Despliegue](docs/despliegue.md) | Docker, CI/CD, Render |

#### 📅 Sprint Documentation

| Documento | Contenido |
|-----------|-----------|
| [Planificación de Sprints](docs/planificacion-sprints.md) | 6 sprints con fechas y objetivos |
| [Entregables por Sprint](docs/entregables-sprints.md) | Funcionalidades por iteración |
| [Investigación Tracker](docs/investigación-tracker.md) | Sistema de seguimiento emocional (DSM-5) |
| [Formulario Inicial](docs/formulario-inicial.md) | Diseño basado en Behavioral Activation |

### 🔗 Recursos Externos

| Recurso | Descripción |
|---------|-------------|
| **[📖 GitHub Pages](https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/)** | Documentación JSDoc autogenerada |
| **[📋 Wiki del Proyecto](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/wiki)** | SCRUM, actas, guías |
| **[🌍 DeepWiki](https://deepwiki.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7)** | Versión multiidioma |
| **[📦 Módulo Optativa](docs/optativa/README.md)** | Cumplimiento de requisitos |

> **📥 PDFs:** Disponibles en [Actions → Artifacts](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/actions) del repositorio.

---

## 🚢 Despliegue en Producción

### URL de Producción

🌐 **[https://mindcare-frontend.onrender.com](https://mindcare-frontend.onrender.com)**

### Imágenes Docker

Las imágenes se publican automáticamente con cada push a `main`:

```bash
# Backend
docker pull [dockerhub-username]/mindcare-backend:latest

# Frontend  
docker pull [dockerhub-username]/mindcare-frontend:latest
```

### Desplegar tu Propia Instancia

**Opción recomendada: Render.com**
- ✅ Tier gratuito (750h/mes)
- ✅ HTTPS automático
- ✅ Deploy desde Docker Hub
- ✅ Variables de entorno seguras

> 📖 **Guía completa:** [docs/despliegue.md](docs/despliegue.md)

---

## 🔄 CI/CD Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Commit    │────▶│   GitHub    │────▶│   Docker    │────▶│   Render    │
│   to main   │     │   Actions   │     │    Hub      │     │   Deploy    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ├──▶ Build & Test
                           ├──▶ Docker Build & Push
                           ├──▶ JSDoc Generation
                           └──▶ GitHub Pages Deploy
```

### Workflows Activos

| Workflow | Trigger | Acción |
|----------|---------|--------|
| `docker-build.yml` | Push a `main`/`dev` | Build + Push a Docker Hub |
| `docs-build.yml` | Push a `main` | JSDoc + Deploy a GitHub Pages |

> 📁 Ver configuración: [`.github/workflows/`](.github/workflows/)

---

## ⚖️ Cumplimiento Normativo

MindCare está diseñado para cumplir con las normativas de protección de datos aplicables en España y la Unión Europea.

| Normativa | Estado | Descripción |
|-----------|--------|-------------|
| **RGPD** | ✅ Implementado | Consentimiento explícito, derechos ARCO+PO |
| **LOPD-GDD** | ✅ Implementado | Ley Orgánica 3/2018 de protección de datos |
| **Cookies** | ✅ Implementado | Banner de consentimiento informado |
| **WCAG 2.1** | 🔄 En progreso | Accesibilidad web |

### Medidas Técnicas Implementadas

- ✅ **Consentimiento explícito** en registro (checkbox obligatorio)
- ✅ **Derecho al olvido** - Eliminación completa de datos de usuario
- ✅ **Portabilidad** - Exportación de datos en formato legible
- ✅ **Encriptación** - Contraseñas con bcrypt, conexiones HTTPS
- ✅ **Minimización de datos** - Solo se recopilan datos necesarios

> 📖 **Documentación completa:** [docs/legislacion.md](docs/legislacion.md)

---

## 👥 Equipo de Desarrollo

MindCare ha sido desarrollado por un equipo de estudiantes de **DAW2** comprometidos con crear tecnología de impacto social positivo.

<table>
<tr>
<td align="center" width="33%">
<a href="https://github.com/AdrianDiaz24">
<strong>Adrián Díaz Angulo</strong>
</a>
<br/>
<sub>🔧 Backend Lead</sub>
<br/>
<sub>API REST · Auth · DevOps</sub>
</td>
<td align="center" width="33%">
<a href="https://github.com/Lmrocio">
<strong>Rocío Luque Montes</strong>
</a>
<br/>
<sub>🎨 Frontend Lead</sub>
<br/>
<sub>UI/UX · React · Accesibilidad</sub>
</td>
<td align="center" width="33%">
<a href="https://github.com/JoseAntonioDiazBusati">
<strong>José Antonio Díaz Busati</strong>
</a>
<br/>
<sub>🗄️ Database Manager</sub>
<br/>
<sub>MongoDB · Persistencia</sub>
</td>
</tr>
</table>

---

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

### 💙 MindCare

**Tecnología al servicio del bienestar emocional**

*Porque cuidar la mente también es cuidar la vida.*

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/AdrianDiaz24/DAW2-Proyecto-Grupo-7?style=social)](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7)
[![GitHub Forks](https://img.shields.io/github/forks/AdrianDiaz24/DAW2-Proyecto-Grupo-7?style=social)](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/fork)

</div>
