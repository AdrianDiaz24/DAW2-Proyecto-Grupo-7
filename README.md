# MindCare

## Índice

- [Breve descripción](#breve-descripción)
- [Aplicación desplegada](#aplicación-desplegada)
- [Stack tecnológico](#stack-tecnológico)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [DevOps y Herramientas](#devops-y-herramientas)
- [Capturas de pantalla](#capturas-de-pantalla)
- [Instalación para desarrollo local](#instalación-para-desarrollo-local)
  - [Prerrequisitos](#prerrequisitos)
  - [1. Clonar el repositorio](#1-clonar-el-repositorio)
  - [2. Configurar el Backend](#2-configurar-el-backend)
  - [3. Configurar el Frontend](#3-configurar-el-frontend)
  - [4. Acceder a la aplicación](#4-acceder-a-la-aplicación)
- [Documentación](#documentación)
  - [Documentación técnica](#documentación-técnica)
  - [Documentación de gestión del proyecto](#documentación-de-gestión-del-proyecto)
- [Wiki del proyecto](#wiki-del-proyecto)
- [Equipo de desarrollo](#equipo-de-desarrollo)

---


## Breve descripción

MindCare es una aplicación web diseñada para apoyar a personas que padecen depresión o síntomas relacionados con su estado de ánimo. Su objetivo es proporcionar herramientas digitales que faciliten la autogestión emocional, fomenten el autocuidado y ofrezcan acompañamiento seguro y personalizado.  

La app permite registrar emociones y hábitos diarios, mantener un diario libre seguro y compartible, recibir notificaciones y consejos adaptados a los patrones emocionales del usuario, y acceder a artículos y recursos educativos confiables sobre salud mental. También incluye un botón de emergencia con acceso a líneas de ayuda oficiales.  

MindCare está orientada a jóvenes y adultos en situación de vulnerabilidad económica, geográfica o con acceso limitado a terapia profesional, ofreciendo una solución accesible, educativa y confiable para mejorar su bienestar emocional.

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

**URL de producción:** [https://mindcare-frontend.onrender.com](https://mindcare-frontend.onrender.com)

> **Nota:** La aplicación está desplegada en Render.com usando las imágenes Docker generadas automáticamente por GitHub Actions.

#### Desplegar tu Propia Instancia

El proyecto incluye tres guías completas de despliegue:

1. **[Guía de Despliegue con Docker](docs/docker-deployment-guide.md)** - Setup local y básico
2. **[Guía de Despliegue en Render](docs/render-deployment-guide.md)** ⭐ - Despliegue en producción (recomendado)
3. **[Flujo CI/CD Completo](docs/cicd-flow-diagram.md)** - Diagrama del proceso automatizado

**Despliegue en Render (45-60 minutos):**
- ✅ Tier gratuito con 750h/mes
- ✅ HTTPS automático
- ✅ Deploy automático desde Docker Hub
- ✅ MongoDB Atlas incluido
- ✅ URL pública accesible

Ver guía paso a paso: [docs/render-deployment-guide.md](docs/render-deployment-guide.md)

### CI/CD Automatizado

El proyecto incluye GitHub Actions workflows que automatizan:

✅ **Build y Push a Docker Hub** - Cada push a `main` construye y publica nuevas imágenes  
✅ **Generación de Documentación** - PDFs de docs y code-docs automáticos  
✅ **Deploy Automático** - (Opcional) Despliegue a servidor de producción  

Ver workflows en: [`.github/workflows/`](.github/workflows/)

## Stack tecnológico

MindCare ha sido desarrollada utilizando tecnologías modernas y robustas que garantizan escalabilidad, seguridad y una experiencia de usuario óptima. El proyecto está construido sobre una arquitectura de aplicación web full-stack que separa claramente las responsabilidades entre el frontend, backend y la capa de datos.

### Frontend
- **React** 18.2.0 - Librería para construir interfaces de usuario
- **React Router DOM** 6.20.0 - Navegación y enrutamiento
- **Zustand** 5.0.8 - Gestión de estado global
- **Axios** 1.6.2 - Cliente HTTP para llamadas a la API
- **React Hot Toast** 2.6.0 - Sistema de notificaciones
- **CSS3** - Estilos personalizados

### Backend
- **Node.js** con **Express** 4.16.1 - Framework web
- **MongoDB** con **Mongoose** 8.0.3 - Base de datos NoSQL
- **JWT** (jsonwebtoken) 9.0.2 - Autenticación y autorización
- **bcryptjs** 2.4.3 - Encriptación de contraseñas
- **CORS** 2.8.5 - Manejo de peticiones cross-origin
- **Helmet** 7.1.0 - Seguridad HTTP
- **Nodemailer** 7.0.11 - Envío de correos electrónicos
- **dotenv** 17.2.3 - Gestión de variables de entorno

### DevOps y Herramientas
- **Git** y **GitHub** - Control de versiones
- **Docker** y **Docker Compose** - Containerización y orquestación
- **GitHub Actions** - CI/CD automatizado
- **Docker Hub** - Registro de imágenes Docker
- **Nginx** - Servidor web para frontend en producción
- **Nodemon** 3.0.2 - Desarrollo con hot-reload
- **JSDoc** con **Docdash** - Documentación automática del código con tema personalizado
- **Postman** - Testing de API

## Capturas de pantalla

A continuación se presentan algunas capturas representativas de las principales funcionalidades de MindCare, mostrando la interfaz de usuario y las diferentes secciones de la aplicación.

### Página de inicio
[]

### Panel de registro emocional
[]

### Diario personal
[]

### Dashboard de estadísticas
[]

## Instalación para desarrollo local

Esta guía detalla los pasos necesarios para configurar y ejecutar MindCare en un entorno de desarrollo local. El proceso incluye la configuración tanto del servidor backend como de la aplicación frontend, así como las variables de entorno requeridas.

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (v5 o superior) o una cuenta en MongoDB Atlas
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/USUARIO/DAW2-Proyecto-Grupo-7.git
cd DAW2-Proyecto-Grupo-7
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindcare
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=tu_email@example.com
EMAIL_PASS=tu_password
```

Iniciar el servidor backend:
```bash
npm run dev
```

El backend estará disponible en `http://localhost:5000`

### 3. Configurar el Frontend

Abrir una nueva terminal:

```bash
cd frontend
npm install
```

Crear un archivo `.env` en la carpeta `frontend` con:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Iniciar el servidor de desarrollo:
```bash
npm start
```

El frontend estará disponible en `http://localhost:3000`

### 4. Acceder a la aplicación

Una vez ambos servidores estén corriendo, abre tu navegador en:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## Documentación

El proyecto MindCare cuenta con documentación completa y detallada que abarca desde aspectos técnicos de implementación hasta la planificación y gestión del proyecto. Esta documentación está organizada en dos categorías principales para facilitar su consulta.

### Documentación técnica

Esta sección incluye la documentación relacionada con la implementación técnica, APIs, configuraciones y recursos para desarrolladores.

- **[GitHub Pages](https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/)** - Documentación técnica completa generada automáticamente con JSDoc. Incluye especificación detallada de todas las funciones, clases, componentes y módulos del código fuente (backend y frontend). La documentación se actualiza automáticamente con cada push a `main` mediante GitHub Actions y está disponible en formato HTML navegable con búsqueda integrada.
  
> **Descarga en PDF:** Los PDFs de la documentación JSDoc se generan automáticamente y están disponibles en la sección de [**Actions → Artifacts**](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/actions) del repositorio. Busca el workflow más reciente de "Generador de Documentación JSDoc" y descarga el artifact `jsdoc-pdfs`.

- **[Documentación de la API](docs/optativa/api-documentation.md)** - Especificación completa de los endpoints de la API REST, incluyendo métodos HTTP, parámetros, respuestas y ejemplos de uso.
- **[Configuración CORS](docs/cors-configuration.md)** - Guía detallada sobre la configuración de Cross-Origin Resource Sharing implementada en el backend, incluyendo setup, testing y troubleshooting.
- **[Testing con Postman](docs/postman-guide.md)** - Guía completa para importar y utilizar la colección de Postman (ubicada en `backend/postman/`), incluyendo setup de entorno, estructura de endpoints, flujos de testing y validación de respuestas.
- **[Arquitectura del Backend](backend/README.md#-arquitectura)** - Documentación técnica sobre la arquitectura del sistema de autenticación y guías de uso del middleware.

### Documentación de gestión del proyecto

Documentación relacionada con la planificación, análisis, viabilidad y recursos del proyecto MindCare, organizada por fases de desarrollo.

- **[Definición del problema](docs/problema.md)** - Fase 1 del proyecto que incluye la descripción detallada del problema identificado, evidencias de investigación, definición de user personas, análisis de competencia y propuesta de valor fundamentada en necesidades reales de salud mental.
- **[Investigación y tracker](docs/investigación-tracker.md)** - Especificación técnica del sistema de seguimiento diario que monitoriza estado de ánimo, sueño, actividades, cogniciones y otros aspectos clave basados en guías clínicas (DSM-5, NICE, APA) para el acompañamiento en procesos de recuperación de la depresión.
- **[Formulario inicial](docs/formulario-inicial.md)** - Diseño de los formularios de registro inicial que identifican factores detonantes de episodios depresivos y actividades placenteras del usuario, permitiendo personalizar el seguimiento y las recomendaciones basadas en Behavioral Activation.
- **[Viabilidad técnica](docs/viabilidad-tecnica.md)** - Fase 2 del proyecto con requisitos funcionales priorizados, justificación del stack MERN, esquema de base de datos, arquitectura de la aplicación, evaluación de capacidades del equipo y análisis de riesgos técnicos con estrategias de mitigación.
- **[Objetivos y alcance](docs/objetivos-alcance.md)** - Fase 3 que define objetivos SMART del proyecto, delimita el MVP (Minimum Viable Product), establece qué se incluye y excluye del alcance, y detalla los criterios de éxito medibles y alcanzables.
- **[Recursos necesarios](docs/recursos.md)** - Fase 4 de planificación que detalla la distribución de roles y responsabilidades del equipo, el stack tecnológico completo, servicios externos y APIs a utilizar, y herramientas de desarrollo y gestión del proyecto.
- **[Análisis de competencias](docs/analisis-competencias.md)** - Estudio comparativo detallado de 5 competidores principales (Moodfit, Daylio, Woebot, Headspace, Yana) identificando sus fortalezas, debilidades y oportunidades de diferenciación, destacando el diario compartido seguro y sistema de emergencia como USP.
- **[Estructura organizativa](docs/estructura-organizativa.md)** - Definición de la estructura empresarial de MindTracker Solutions S.L. como startup HealthTech, incluyendo departamentos (C-Level, Tecnología, Marketing, Legal), funciones clave, comité ético-científico y escalabilidad mediante estructura funcional horizontal.
- **[Financiación](docs/financiacion.md)** - Plan completo de financiación con análisis de costes iniciales de desarrollo (14,118€), infraestructura, marketing, capital de trabajo, fuentes de financiación analizadas, proyección de ingresos y plan de contingencia para la sostenibilidad del proyecto.
- **[Presupuesto](docs/presupuesto.md)** - Presupuesto económico detallado del proyecto desarrollado en 6 sprints (7 nov - 10 dic 2025), utilizando metodología Planning Poker, comparación entre estimación y realidad con 432 horas de desarrollo registradas en Toggl Track, y análisis de desviaciones.

## Wiki del proyecto

El proyecto MindCare cuenta con documentación completa en dos wikis complementarias:

### Wiki de GitHub (Principal)

Documentación oficial del proyecto con metodología SCRUM, planificación de sprints, actas de reuniones y guías técnicas completas.

**Acceso a la wiki:** [https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/wiki](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/wiki)

**Contenido incluido:**
- **Metodología SCRUM:** Implementación de SCRUM en el proyecto con roles rotativos por sprint
- **Planificación de Sprints:** Tabla completa de los 6 sprints con fechas, objetivos y entregables
- **Actas de Reuniones:** Daily Scrums, Sprint Reviews y Sprint Retrospectives documentadas
- **Gestión de Recursos:** Asignación de tareas y gestión de tiempos del equipo
- **Guías Técnicas:** Arquitectura, API Reference, instalación, testing y contribución
- **Documentación de Usuario:** Manual de usuario y guía de instalación

### DeepWiki (Versión Multiidioma)

Wiki complementaria con versión en inglés del proyecto para facilitar la colaboración internacional y mostrar el uso de herramientas de documentación avanzadas.

**Acceso a DeepWiki:** [https://deepwiki.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7](https://deepwiki.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7)

## Equipo de desarrollo

MindCare ha sido desarrollado por un equipo multidisciplinar de profesionales especializados en diferentes áreas del desarrollo web. Cada miembro del equipo aporta su experiencia y conocimientos en su área de especialización para garantizar un producto de calidad.

### Adrián Díaz Angulo
- **GitHub:** [@AdrianDiaz24](https://github.com/AdrianDiaz24)
- **Rol:** Backend Lead
- **Responsabilidades:** Diseño e implementación del servidor, API REST, autenticación y seguridad, integración de funcionalidades del MVP

### Rocío Luque Montes
- **GitHub:** [@Lmrocio](https://github.com/Lmrocio)
- **Rol:** Frontend Lead
- **Responsabilidades:** Diseño e implementación de la interfaz y experiencia de usuario, desarrollo de vistas principales en React, integración con la API, accesibilidad y coherencia visual

### José Antonio Díaz Busati
- **GitHub:** [@JoseAntonioDiazBusati](https://github.com/JoseAntonioDiazBusati)
- **Rol:** Database Manager
- **Responsabilidades:** Diseño del modelo de datos en MongoDB, gestión de la persistencia de información, soporte en integración con el backend
