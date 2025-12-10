# Planificación de Sprints - MindCare

## Índice
1. [Introducción](#introducción)
2. [Resumen de Sprints](#resumen-de-sprints)
3. [Sprint 1 - Setup y Arquitectura Base](#sprint-1---setup-y-arquitectura-base)
4. [Sprint 2 - Autenticación y Roles de Usuario](#sprint-2---autenticación-y-roles-de-usuario)
5. [Sprint 3 - Funcionalidades Principales (Parte 1)](#sprint-3---funcionalidades-principales-parte-1)
6. [Sprint 4 - Funcionalidades Principales (Parte 2)](#sprint-4---funcionalidades-principales-parte-2)
7. [Sprint 5 - Testing, Optimización y UI/UX](#sprint-5---testing-optimización-y-uiux)
8. [Sprint 6 - Despliegue y Documentación Final](#sprint-6---despliegue-y-documentación-final)
9. [Métricas y Seguimiento](#métricas-y-seguimiento)

---

## Introducción

Este documento detalla la planificación de los **6 sprints** del proyecto MindCare, una aplicación web de salud mental desarrollada con stack MERN (MongoDB, Express, React, Node.js). El proyecto se desarrolló de forma intensiva en aproximadamente **5 semanas** con sprints de duración variable según la complejidad de las tareas.

El proyecto fue desarrollado por un equipo de **3 estudiantes de DAW** entre el **7 de noviembre de 2025** y el **10 de diciembre de 2025**, con un total de **177 commits** distribuidos estratégicamente en las diferentes fases del desarrollo.

**Nota sobre fechas:** Aunque los primeros commits datan del 17 de octubre (documentación inicial de la propuesta), el desarrollo real del MVP comenzó el 7 de noviembre.

### Equipo de Desarrollo

**Todos los miembros son estudiantes de 2º de Desarrollo de Aplicaciones Web (DAW)**

| Miembro | Rol | Responsabilidades |
|---------|-----|-------------------|
| **José Antonio Díaz Busati** | Database Manager (Junior) | Diseño de modelos de datos, gestión de MongoDB, queries, persistencia |
| **Adrián Díaz Angulo** | Backend Lead (Mid-Senior) | Arquitectura backend, API REST, autenticación, integraciones, CI/CD |
| **Rocío Luque Montes** | Frontend Lead (Mid) | Diseño UI/UX, desarrollo React, componentes, integración con API |

---

## Resumen de Sprints

| Sprint | Fechas | Objetivo Principal | Estado |
|--------|--------|-------------------|--------|
| **Sprint 1** | 07-11-2025 al 11-11-2025 | Setup y Arquitectura Base | ✅ Completado |
| **Sprint 2** | 11-11-2025 al 20-11-2025 | Autenticación y Roles de Usuario | ✅ Completado |
| **Sprint 3** | 20-11-2025 al 26-11-2025 | Funcionalidades Principales (Parte 1) | ✅ Completado |
| **Sprint 4** | 26-11-2025 al 28-11-2025 | Funcionalidades Principales (Parte 2) | ✅ Completado |
| **Sprint 5** | 03-12-2025 al 05-12-2025 | Testing, Optimización y UI/UX | ✅ Completado |
| **Sprint 6** | 08-12-2025 al 10-12-2025 | Despliegue y Documentación Final | ✅ Completado |

---

## Sprint 1 - Setup y Arquitectura Base

### 📅 Fechas
**Inicio:** 07-11-2025  
**Fin:** 11-11-2025  
**Duración:** 4 días intensivos

### 🎯 Objetivo
Establecer la infraestructura del proyecto, documentación inicial y estructura base tanto del frontend como del backend.

### 📋 Tareas (Issues)

| ID | Tarea | Descripción | Estimación (h) | Responsable |
|----|-------|-------------|----------------|-------------|
| #1 | Crear repositorio GitHub | Inicializar repositorio con README inicial | 1h | Equipo |
| #2 | Documentación de problema | Identificar y documentar el problema a resolver | 8h | Equipo |
| #3 | Viabilidad técnica | Investigar y documentar tecnologías a utilizar | 6h | Equipo |
| #4 | Objetivos y alcance | Definir objetivos SMART y alcance del proyecto | 5h | Equipo |
| #5 | Recursos necesarios | Identificar recursos humanos, técnicos y económicos | 4h | Equipo |
| #6 | Estructura del Backend | Crear carpetas, instalar Express, configurar app.js | 6h | Backend Dev |
| #7 | Estructura del Frontend | Crear proyecto React, configurar routing básico | 6h | Frontend Dev |
| #8 | Estructura de documentación | Crear carpeta /docs y estructura base | 2h | Equipo |
| #9 | Configuración de .gitignore | Configurar archivos a ignorar (.env, node_modules) | 1h | Backend Dev |

**Total estimado:** 39 horas

### 🎁 Entregables

✅ **Documentación:**
- `docs/problema.md` - Análisis del problema de salud mental
- `docs/viabilidad-tecnica.md` - Justificación del stack MERN
- `docs/objetivos-alcance.md` - Objetivos SMART y limitaciones
- `docs/recursos.md` - Recursos necesarios para el proyecto
- `README.md` actualizado con estructura del proyecto

✅ **Código:**
- Estructura de carpetas del backend (`/backend/src/`)
- Estructura de carpetas del frontend (`/frontend/src/`)
- Configuración inicial de Express
- Configuración inicial de React
- Archivos `.gitignore` configurados

✅ **Infraestructura:**
- Repositorio GitHub configurado
- Branches: `main`, `dev`
- Estructura de carpetas organizada

### 📊 Commits relacionados (18 commits)
- `c702aa00` - Initial commit (17-10)
- `326b691b` - Escribir estructura del README.md (17-10)
- `7b23545d` - Crear problema.md (17-10)
- `c859c760` - Crear viabilidad-tecnica.md (17-10)
- `0ee6cb9a` - Crear objetivos-alcance.md (17-10)
- `e230348d` - Crear recursos.md (17-10)
- `56b35b17` - Crear enlaces a docs (17-10)
- `6d067545` a `bbc30fb3` - Completar documentación inicial (31-10)
- `2e7c3671` - Crear estructura del backend e integrar Express (07-11)
- `5c16df08` - Crear estructura de frontend (07-11)
- `0204376a` - Crear estructura del proyecto (07-11)

**Nota importante sobre las fechas:** Los commits del 17-31 de octubre corresponden a la **fase de documentación de la propuesta** (Fase 1 del proyecto académico: análisis del problema, viabilidad técnica, objetivos). El **desarrollo real del MVP** comenzó el 7 de noviembre con la configuración del entorno y estructura de código.

---

## Sprint 2 - Autenticación y Roles de Usuario

### 📅 Fechas
**Inicio:** 11-11-2025  
**Fin:** 20-11-2025  
**Duración:** 1.5 semanas

### 🎯 Objetivo
Implementar el sistema de autenticación completo con registro, login, gestión de sesiones mediante JWT y conexión a MongoDB.

### 📋 Tareas (Issues)

| ID | Tarea | Descripción | Estimación (h) | Responsable |
|----|-------|-------------|----------------|-------------|
| #10 | Configurar conexión MongoDB | Crear archivo db.js, conexión a MongoDB Atlas | 3h | Backend Dev |
| #11 | Configurar variables de entorno | Crear .env, .env.example con variables necesarias | 2h | Backend Dev |
| #12 | Modelo de Usuario (Mongoose) | Crear esquema de usuario con validaciones | 4h | Backend Dev |
| #13 | Implementar bcrypt | Hash de contraseñas, método comparePassword | 3h | Backend Dev |
| #14 | Endpoint de registro | POST /api/auth/register con validaciones | 5h | Backend Dev |
| #15 | Endpoint de login | POST /api/auth/login con generación de JWT | 5h | Backend Dev |
| #16 | Middleware de autenticación | Verificación de JWT en rutas protegidas | 4h | Backend Dev |
| #17 | Endpoint api/health | Verificar funcionamiento del servidor y BD | 2h | Backend Dev |
| #18 | Página de registro (React) | Formulario de registro con validaciones | 6h | Frontend Dev |
| #19 | Página de login (React) | Formulario de login, gestión de tokens | 6h | Frontend Dev |
| #20 | Configurar CORS | Permitir peticiones desde el frontend | 2h | Backend Dev |
| #21 | Configurar Helmet | Añadir seguridad con headers HTTP | 1h | Backend Dev |

**Total estimado:** 43 horas

### 🎁 Entregables

✅ **Backend:**
- Conexión a MongoDB Atlas funcionando
- Modelo `Usuario` con Mongoose
- Rutas de autenticación (`/api/auth/register`, `/api/auth/login`)
- Middleware `authMiddleware.js` para proteger rutas
- Endpoint `/api/health` para verificar estado
- Configuración de CORS y Helmet

✅ **Frontend:**
- Página de registro funcional
- Página de login funcional
- Gestión básica de tokens (localStorage)

✅ **Seguridad:**
- Contraseñas hasheadas con bcrypt
- JWT configurado correctamente
- Variables sensibles en .env

### 📊 Commits relacionados (15 commits)
- `e7e9ee99` - Crear rama "dev" (11-11)
- `782ef3b2` - Crear rama "feature/conexionDb" (11-11)
- `c7d1e84f` - Añadir .env al .gitignore (11-11)
- `34073d80` - Crear la conexión a la BD y al .env.example (11-11)
- `549e1b46` - Conexión con la BD probada (11-11)
- `35442f77` - Implementar api/health (19-11)
- `9c7a884a` - Crear esquema mongoose usuarios y registro (20-11)
- `9cbe4799` - Configurar app.js con cors y helmet (20-11)
- `e0682462` - Crear ruta para registrar usuarios con bcrypt (20-11)
- `c57f6923` - Implementar la verificación de datos y subida (20-11)
- `9b3be2d6` - Implementar rutas a páginas básicas (20-11)

---

## Sprint 3 - Funcionalidades Principales (Parte 1)

### 📅 Fechas
**Inicio:** 20-11-2025  
**Fin:** 26-11-2025  
**Duración:** 1 semana

### 🎯 Objetivo
Implementar las funcionalidades core del MVP: sistema de diario emocional, tracker diario y formulario inicial del usuario.

### 📋 Tareas (Issues)

| ID | Tarea | Descripción | Estimación (h) | Responsable |
|----|-------|-------------|----------------|-------------|
| #22 | Modelo Diario (Mongoose) | Esquema para entradas del diario emocional | 4h | Backend Dev |
| #23 | Investigar tracker diario | Definir qué datos recopilar (emociones, actividades) | 3h | Equipo |
| #24 | Definir formulario inicial | Campos del formulario de onboarding del usuario | 3h | Equipo |
| #25 | CRUD de entradas de diario | Endpoints para crear, leer, actualizar, eliminar | 8h | Backend Dev |
| #26 | Modelo de Tracker (Mongoose) | Esquema para registro diario de datos | 4h | Backend Dev |
| #27 | Endpoints de Tracker | POST/GET para registros diarios | 6h | Backend Dev |
| #28 | Script de seeding | Crear datos de prueba para desarrollo | 4h | Backend Dev |
| #29 | Gestión de estado (Zustand) | Store para auth, diario, tracker | 5h | Frontend Dev |
| #30 | Componente DiaryEditor | Editor de texto para entradas del diario | 8h | Frontend Dev |
| #31 | Componente EmotionSelector | Selector visual de emociones | 6h | Frontend Dev |
| #32 | Página de Diario | Interfaz principal del diario emocional | 10h | Frontend Dev |
| #33 | Actualizar modelo Usuario | Añadir campos del formulario inicial | 3h | Backend Dev |

**Total estimado:** 64 horas

### 🎁 Entregables

✅ **Backend:**
- Modelo `Diario` con Mongoose
- Modelo `Tracker` con Mongoose
- Rutas CRUD para diario (`/api/diario`)
- Rutas para tracker diario (`/api/tracker`)
- Script de seeding con datos de prueba
- Modelo Usuario actualizado con campos adicionales

✅ **Frontend:**
- Store de Zustand configurado (authStore, diarioStore)
- Componente `DiaryEditor` funcional
- Componente `EmotionSelector` con UI/UX
- Página de Diario integrada con backend

✅ **Investigación:**
- Documento con estructura del tracker diario
- Documento con campos del formulario inicial

### 📊 Commits relacionados (18 commits)
- `5e4aa00d` - Crear diario_mongoose (20-11)
- `36a03b8c` - Investigar sobre tracker diario (20-11)
- `a3209ecf` - Definir formulario inicial del usuario (20-11)
- `c185486c` - Crear scriptSeeding (21-11)
- `57c0ebdc` - Implementar la lógica de inicio de sesión (24-11)
- `d27d01b9` - Actualizar usuarios_mongoose (25-11)
- `e390b5c4` - Actualizar seed.js (25-11)
- `af04a065` - Implementar gestión de estados con Zustand (26-11)
- `55bf214d` - Añadir rutas y lógicas para formulario inicial (27-11)
- `c763f180` - Implementar la lógica del diario (27-11)
- `4df22aa8` - Añadir componentes del diario (27-11)

---

## Sprint 4 - Funcionalidades Principales (Parte 2)

### 📅 Fechas
**Inicio:** 26-11-2025  
**Fin:** 28-11-2025  
**Duración:** 3 días

### 🎯 Objetivo
Completar funcionalidades del MVP e integrar API externa de IA (Grok) para análisis de emociones.

### 📋 Tareas (Issues)

| ID | Tarea | Descripción | Estimación (h) | Responsable |
|----|-------|-------------|----------------|-------------|
| #34 | Crear API de IA | Configurar cliente para Grok API | 4h | Backend Dev |
| #35 | Controlador Grok | Endpoint para análisis de texto con IA | 6h | Backend Dev |
| #36 | Rutas de IA | POST /api/ia/analizar-emocion | 3h | Backend Dev |
| #37 | Actualizar modelo Diario | Integrar resultados del análisis de IA | 3h | Backend Dev |
| #38 | Middleware completo | Validaciones y manejo de errores | 4h | Backend Dev |
| #39 | Colección Postman | Documentar todos los endpoints en Postman | 4h | Backend Dev |
| #40 | Wiki del proyecto | Crear documentación técnica en GitHub Wiki | 5h | Equipo |
| #41 | Implementar CORS avanzado | Configurar whitelist de dominios | 2h | Backend Dev |
| #42 | Arreglar flujo de autenticación | Solucionar bugs en registro/login | 6h | Full Stack |
| #43 | Actualizar Landing | Mejorar página de inicio | 8h | Frontend Dev |
| #44 | Crear página Home | Dashboard principal post-login | 10h | Frontend Dev |
| #45 | Bases para Seguimiento | Estructura inicial para tracking | 6h | Frontend Dev |
| #46 | Solucionar errores generales | Bug fixing y testing manual | 8h | Equipo |

**Total estimado:** 69 horas

### 🎁 Entregables

✅ **Backend:**
- Integración completa con Grok API
- Endpoint `/api/ia/analizar-emocion` funcional
- Modelo Diario con análisis de IA
- Middleware robusto con validaciones
- Colección Postman completa
- Documentación en Wiki

✅ **Frontend:**
- Landing page mejorada
- Página Home/Dashboard
- Estructura base para página de Seguimiento
- Flujo de autenticación refinado

✅ **APIs Externas:**
- Grok API integrada
- Análisis de emociones automático

### 📊 Commits relacionados (15 commits)
- `2cfc5b72` - Crear api ia (26-11)
- `660ada6e` - Configurar cliente IA (26-11)
- `4476834410` - Crear grok controller (26-11)
- `eee80720` - Actualizar mongoose (26-11)
- `390fec37` - Crear ia.routes (26-11)
- `0b7e9467` - Implementar middleware (26-11)
- `8f69728f` - Crear usuarios.postman (26-11)
- `096952b3` - Implementar cors (26-11)
- `1acb1486` - Crear wiki.md (26-11)
- `f50f0a61` - Arreglar flujo de registro y login (26-11)
- `d32f4fe8` - Actualizar Landing (27-11)
- `5497c9dd` - Crear base en Home (27-11)
- `b9b195be` - Crear bases para seguimiento (27-11)
- `ebd5e843` - Solucionar error token nulo (27-11)

---

## Sprint 5 - Testing, Optimización y UI/UX

### 📅 Fechas
**Inicio:** 03-12-2025  
**Fin:** 05-12-2025  
**Duración:** 3 días

### 🎯 Objetivo
Optimizar el rendimiento, mejorar la interfaz de usuario, implementar componentes visuales avanzados y preparar documentación técnica.

### 📋 Tareas (Issues)

| ID | Tarea | Descripción | Estimación (h) | Responsable |
|----|-------|-------------|----------------|-------------|
| #47 | Configurar JSDoc | Setup de jsdoc.json y scripts | 2h | Equipo |
| #48 | Configurar workflow CI/CD | GitHub Actions para docs y tests | 6h | DevOps |
| #49 | Actualizar YAML | Configurar pipelines de deployment | 4h | DevOps |
| #50 | Botón de emergencia | Implementar modal de emergencia funcional | 8h | Frontend Dev |
| #51 | Diseño del botón emergencia | Estilos y UX del componente | 4h | Frontend Dev |
| #52 | Cabecera Landing (sin animaciones) | Maquetar nav básico | 6h | Frontend Dev |
| #53 | Cabecera Landing (con animaciones) | Añadir micro-interacciones | 8h | Frontend Dev |
| #54 | Cabecera responsive | Adaptar nav para móvil | 10h | Frontend Dev |
| #55 | Menu hamburguesa | Implementar navegación móvil | 8h | Frontend Dev |
| #56 | Fix encoding UTF-8 | Solucionar problemas de caracteres | 3h | Equipo |
| #57 | Testing visual | Pruebas manuales de UI/UX | 6h | Equipo |
| #58 | Refactorización | Limpiar código, mejorar estructura | 8h | Equipo |
| #59 | Optimización de rendimiento | Lazy loading, code splitting | 6h | Frontend Dev |

**Total estimado:** 79 horas

### 🎁 Entregables

✅ **UI/UX:**
- Cabecera del Landing con animaciones avanzadas
- Diseño responsive completo
- Menú hamburguesa funcional (con issues pendientes)
- Botón de emergencia funcional
- Mejoras visuales generales

✅ **Documentación:**
- JSDoc configurado
- Documentación técnica de código
- GitHub Actions configurado

✅ **Calidad:**
- Código refactorizado
- Fix de encoding UTF-8
- Optimizaciones de rendimiento

⚠️ **Issues conocidos:**
- Nav móvil presenta problemas (commit `e95237f`)
- Menú hamburguesa requiere ajustes adicionales

### 📊 Commits relacionados (12 commits)
- `346909a` - Crear jsdoc.json (03-12)
- `cba561c` a `8b6ba10` - Actualizar yaml (03-12)
- `7f60fc6` - Implementar botón de emergencia (04-12)
- `37b0d01` - Maquetar cabecera landing sin animaciones (04-12)
- `cc1575d` - Maquetar cabecera landing con animaciones (04-12)
- `f49eeac` - Maquetar nav para landing con responsive (04-12)
- `e95237f` - Nav de móvil no funciona, revisar en otro momento (04-12) ⚠️
- `b14f6bc` a `bba27f1` - Initial plan (05-12)
- `f4e7f86` a `7222805` - Fix UTF-8 encoding issues (05-12)

---

## Sprint 6 - Despliegue y Documentación Final

### 📅 Fechas
**Inicio:** 08-12-2025  
**Fin:** 10-12-2025  
**Duración:** 3 días

### 🎯 Objetivo
Preparar el proyecto para producción mediante Docker, configurar CI/CD, completar la documentación y realizar el deployment final.

### 📋 Tareas (Issues)

| ID | Tarea | Descripción | Estimación (h) | Responsable |
|----|-------|-------------|----------------|-------------|
| #60 | Crear imagen Docker (YAML) | Configurar docker-compose.yml | 4h | DevOps |
| #61 | Dockerfile backend | Crear Dockerfile para Node.js/Express | 4h | DevOps |
| #62 | Dockerfile frontend | Crear Dockerfile para React | 4h | DevOps |
| #63 | Actualizar Dockerfile | Optimizar imágenes, multi-stage builds | 6h | DevOps |
| #64 | Configurar CI/CD completo | GitHub Actions para build y deploy | 6h | DevOps |
| #65 | Testing en contenedores | Verificar funcionamiento en Docker | 4h | Equipo |
| #66 | Configurar variables prod | .env.production, secrets en GitHub | 3h | DevOps |
| #67 | Deployment a producción | Subir a servidor/plataforma cloud | 4h | DevOps |
| #68 | Solucionar errores finales | Bug fixing pre-lanzamiento | 8h | Equipo |
| #69 | Verificar requisitos | Checklist de cumplimiento del proyecto | 4h | Equipo |
| #70 | Documentación técnica completa | README, API docs, guías de instalación | 10h | Equipo |
| #71 | Limpieza de documentación | Eliminar archivos obsoletos | 2h | Equipo |
| #72 | Documentación organizacional | Estructura empresarial, análisis competitivo | 6h | Equipo |
| #73 | Preparar presentación final | Slides, demo, argumentación | 8h | Equipo |

**Total estimado:** 73 horas

### 🎁 Entregables

✅ **Infraestructura:**
- Docker Compose configurado
- Dockerfile para backend optimizado
- Dockerfile para frontend optimizado
- CI/CD con GitHub Actions funcionando

✅ **Deployment:**
- Aplicación desplegada en producción
- Variables de entorno configuradas
- Monitorización básica implementada

✅ **Documentación:**
- `API_DOCUMENTATION.md` completo
- `README.md` actualizado
- Documentación de deployment
- Análisis de competencia
- Estructura organizacional

✅ **Calidad:**
- Errores críticos solucionados
- Requisitos del proyecto verificados
- Código listo para producción

### 📊 Commits relacionados (30+ commits)
- `4a0381f` - Crear imagen docker yaml (08-12)
- `91704db` - Crear primeros dockerfile (10-12)
- `a02d0f8` - Actualizar dockerfile (10-12)
- `7238622` a `84a4df2` - Actualizar yml y dockerfile frontend (10-12)
- `700bccd` a `39617ba` - Actualizar yml (10-12)
- `614a0bc` - Actualizar dockerfile (10-12)
- `10f2ebf` - Solucionar errores, comprobar requisitos (10-12)
- `1328669` - Merge pull request #100 (10-12)
- `cace8b9` a `8481d29` - Limpieza y documentación final (10-12)

---

## Métricas y Seguimiento

### 📈 Resumen General

| Métrica | Valor |
|---------|-------|
| **Total de Sprints** | 6 |
| **Duración total** | 5 semanas (7 nov - 10 dic 2025) |
| **Total de commits** | 177 |
| **Total de tareas estimadas** | 73 issues |
| **Horas estimadas totales** | 367 horas |
| **Horas reales totales** | 432 horas |
| **Desviación promedio** | +17.7% |
| **Miembros del equipo** | 3 personas |
| **Coste total de desarrollo** | 14,118 € |
| **Promedio horas por sprint** | 72 horas reales |

### 📊 Distribución de Commits por Sprint

```
Sprint 1: 18 commits (10.2%)
Sprint 2: 15 commits (8.5%)
Sprint 3: 18 commits (10.2%)
Sprint 4: 15 commits (8.5%)
Sprint 5: 12 commits (6.8%)
Sprint 6: 30+ commits (16.9%)
Otros: 69 commits (38.9%)
```

### 🎯 Velocidad del Equipo

| Sprint | Tareas Planificadas | Tareas Completadas | Horas Estimadas | Horas Reales | Eficiencia |
|--------|---------------------|-------------------|-----------------|--------------|------------|
| Sprint 1 | 9 | 9 | 39h | 41h | 100% |
| Sprint 2 | 12 | 12 | 43h | 50h | 100% |
| Sprint 3 | 12 | 12 | 64h | 77.5h | 100% |
| Sprint 4 | 13 | 13 | 69h | 79h | 100% |
| Sprint 5 | 13 | 12 | 79h | 100h | 92% |
| Sprint 6 | 14 | 14 | 73h | 84.5h | 100% |

### 👥 Distribución de Trabajo por Miembro

| Miembro | Horas Totales | % del Total | Área Principal |
|---------|---------------|-------------|----------------|
| **Rocío Luque** | 183.5h | 42.5% | Frontend, UI/UX, Componentes |
| **Adrián Díaz** | 171.5h | 39.7% | Backend, API, DevOps, Arquitectura |
| **José Antonio Díaz** | 77h | 17.8% | Base de Datos, Modelos, Seeding |
| **TOTAL** | **432h** | **100%** | |

**Observaciones:**
- Rocío tuvo la mayor carga debido a la complejidad de componentes UI y animaciones
- José Antonio tuvo rol más especializado en BD, menos horas pero críticas para el proyecto
- Adrián lideró aspectos técnicos complejos (API IA, Docker, CI/CD)

### ⚠️ Issues Pendientes y Deuda Técnica

1. **Nav móvil** - Identificado en commit `e95237f` (04-12-2025)
   - Estado: Pendiente de revisión
   - Prioridad: Media-Alta
   - Impacto: UX en dispositivos móviles

2. **Menú hamburguesa** - Varios commits de ajustes
   - Estado: Funcional con mejoras pendientes
   - Prioridad: Media
   - Impacto: Navegación móvil

### 📝 Lecciones Aprendidas

1. **Estimaciones iniciales**: Los sprints 3 y 5 requirieron más horas de las previstas inicialmente
2. **Integración continua**: La configuración de CI/CD en el Sprint 6 facilitó el deployment
3. **Documentación temprana**: La documentación del Sprint 1 fue fundamental para mantener el foco
4. **Testing**: Se debería haber dedicado más tiempo a testing automatizado

### 🚀 Recomendaciones para Futuros Sprints

1. Abordar la deuda técnica del nav móvil
2. Implementar tests unitarios y de integración
3. Mejorar la monitorización en producción
4. Añadir métricas de rendimiento
5. Implementar logging estructurado

---

**Documento generado:** 10-12-2025  
**Versión:** 1.0  
**Equipo:** MindCare Development Team

