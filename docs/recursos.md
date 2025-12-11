# Fase 4: Planificación de recursos

<br>

Para asegurar el desarrollo eficiente del proyecto, se han definido los recursos humanos, el stack tecnológico, los servicios externos y APIs, así como las herramientas de desarrollo y gestión necesarias para la correcta ejecución del proyecto.

---

<br>

## Índice

[A. Distribución de roles y responsabilidades](#a-distribuci%C3%B3n-de-roles-y-responsabilidades)

[B. Stack tecnológico completo](#b-stack-tecnol%C3%B3gico-completo)

[C. Servicios externos y APIs a utilizar](#c-servicios-externos-y-apis-a-utilizar)

[D. Herramientas de desarrollo y gestión](#d-herramientas-de-desarrollo-y-gesti%C3%B3n)


---

<br>

## A. Distribución de roles y responsabilidades

| Miembro       | Rol                   | Responsabilidades principales |
|---------------|----------------------|-------------------------------|
| Rocío         | Frontend Lead        | Diseño e implementación de la interfaz de usuario (UI) y experiencia de usuario (UX), desarrollo de vistas principales en React, integración con API, coherencia visual y accesibilidad. |
| Adrián        | Backend Lead         | Diseño e implementación del servidor y lógica de negocio, creación y gestión de la API REST, autenticación y seguridad, integración de funcionalidades del MVP (registro, login, diario, notificaciones básicas). |
| José Antonio  | Database Manager     | Diseño del modelo de datos en MongoDB, gestión de la persistencia de información (usuarios, registros, diario, notificaciones), consultas básicas y soporte en la integración con el backend. |

**Comunicación interna**  
- Discord y WhatsApp para comunicación rápida y coordinación diaria.  
- Reuniones semanales para seguimiento de avances y planificación de sprints cortos.

---

<br>

## B. Stack tecnológico completo

## Stack tecnológico completo

| Área         | Herramienta / Librería       | Versión aproximada | Justificación |
|--------------|-----------------------------|-----------------|---------------|
| Frontend     | React                       | 18.x            | Framework principal para crear la SPA, soporta componentes reutilizables y buena integración con librerías UI y state management |
| Frontend     | react-router-dom            | 6.x             | Navegación entre vistas y rutas |
| Frontend     | Zustand / Redux Toolkit      | Última          | Gestión de estado global (usuarios, emociones, hábitos, configuraciones) |
| Frontend     | Material UI / Chakra UI      | Última          | Componentes UI modernos, accesibles, personalización de temas y modo oscuro |
| Frontend     | react-hook-form + Yup        | Última          | Validación de formularios (registro, login, diario) |
| Frontend     | Recharts / Chart.js          | Última          | Visualización de estadísticas y gráficas |
| Frontend     | React-toastify / Sonner      | Última          | Alertas y feedback del usuario |
| Frontend     | Axios + jwt-decode           | Última          | Peticiones HTTP seguras al backend y manejo de JWT |
| Backend      | Node.js                     | 18.x            | Ejecución del servidor, manejo de peticiones y lógica de negocio |
| Backend      | Express.js                  | 4.x             | Framework principal para API REST |
| Backend      | jsonwebtoken (JWT)          | Última          | Autenticación y gestión de sesiones seguras |
| Backend      | bcrypt                      | Última          | Encriptación de contraseñas antes de guardarlas en la base de datos |
| Backend      | Nodemailer / Brevo           | Última          | Envío de correos automáticos (confirmación, recuperación de contraseña) |
| Backend      | node-cron / Agenda.js        | Última          | Programación de recordatorios y notificaciones automáticas |
| Base de datos | MongoDB Atlas               | Última          | Servicio NoSQL en la nube, plan gratuito, persistencia y seguridad garantizadas |
| Base de datos | Mongoose                    | Última          | ODM para definir esquemas, validación y relaciones en MongoDB, facilita integración con Node.js |


---

<br>


## C. Servicios externos y APIs a utilizar

### Servicios de Hosting y Base de Datos

| Servicio | Uso | Plan | Límites | Estado |
|----------|-----|------|--------|--------|
| **Vercel** | Hosting Frontend React | Gratuito | 100 MB almacenamiento, deployments ilimitados | ✅ En uso |
| **Render / Railway** | Hosting Backend Node.js | Gratuito | CPU limitado, 512 MB RAM | ✅ En uso |
| **MongoDB Atlas** | Base de datos NoSQL | M0 Gratuito | 512 MB almacenamiento, 1GB transferencia/mes | ✅ Configurado |

### APIs Externas Integradas

| API | Uso | Límites | Clave | Estado |
|-----|-----|--------|-------|--------|
| **Grok AI (xAI)** | Análisis de emociones y sugerencias de bienestar | ~10 queries/min, 10K/mes free | GROK_API_KEY | ✅ Integrada |
| **Google Analytics** | Estadísticas de uso (opcional) | Gratuito | GA_MEASUREMENT_ID | ✅ Configurado |
| **Sentry** | Monitorización de errores | 5K eventos/mes gratuitos | SENTRY_DSN | ✅ Configurado |
| **SendGrid / Brevo** | Emails transaccionales | 100 emails/día gratuitos | SENDGRID_API_KEY | ⚠️ No implementado aún |

### Límites de APIs Críticos

```
GROK API:
- 10 requests por minuto (límite de rate)
- 10,000 requests/mes en plan free
- Precio: $0.02 / 1K tokens aproximadamente
- Riesgo: Si la app crece rápido, necesitará pagar

MongoDB Atlas:
- 512 MB almacenamiento (suficiente para MVP)
- 1 GB transferencia de datos/mes
- Escalable a M2 ($9/mes) cuando sea necesario

SendGrid / Email:
- 100 emails/día en plan free
- Suficiente para confirmaciones y recuperación de contraseña
- Escalable a pago según demanda
```

---

<br>

## D. Herramientas de desarrollo y gestión

### Control de Versiones

- **Sistema:** Git (distribuido, local-first)
- **Repositorio:** GitHub (https://github.com/grupo7-daw2)
- **Estrategia de ramas:**
  - `main` → Producción (deployments estables)
  - `develop` → Integración (últimos cambios)
  - `feature/*` → Features en desarrollo
  - `bugfix/*` → Arreglos rápidos
  - `hotfix/*` → Urgencias en producción
- **Protecciones:**
  - `main` require code review (2 aprobaciones)
  - Automated tests deben pasar antes de merge
  - Commits firmados recomendados

### Gestión de Proyecto

| Herramienta | Uso | Detalles |
|-------------|-----|---------|
| **GitHub Projects** | Tablero Kanban con sprints | Columns: Backlog, Todo, In Progress, In Review, Done |
| **GitHub Issues** | Tracking de tareas y bugs | Labels: feature, bug, documentation, enhancement |
| **GitHub Wiki** | Documentación del proyecto | Sprint reviews, decisiones técnicas, guías |
| **Milestone** | Agrupación de issues por sprint | Sprint 1, Sprint 2, ..., Sprint 6 |

### Herramientas de Testing

| Herramienta | Uso | Configuración |
|-------------|-----|---------------|
| **Postman** | Testing manual de endpoints | Collection: MindCare-API.postman_collection.json |
| **Jest** | Tests unitarios y de integración | Config: jest.config.js en backend |
| **React Testing Library** | Tests de componentes React | Tests en carpeta `__tests__` |
| **Cypress / Playwright** | E2E testing (no implementado aún) | Futuro: agregar tests end-to-end |
| **Lighthouse** | Auditoría de performance y accesibilidad | Ejecutado en Vercel CI/CD |

### Calidad de Código

| Herramienta | Uso | Configuración |
|-------------|-----|---------------|
| **ESLint** | Linting de código (detecta errores) | Config: .eslintrc.json |
| **Prettier** | Formateo automático de código | Config: .prettierrc |
| **SonarQube** (opcional) | Análisis de código estático | No implementado actualmente |
| **GitHub Actions** | CI/CD - Tests automáticos | Workflows: `.github/workflows/*.yml` |

### Visualización y Análisis de Datos

| Herramienta | Uso | Acceso |
|-------------|-----|--------|
| **MongoDB Compass** | GUI para MongoDB (queries, visualización) | Local + MongoDB Atlas web console |
| **Recharts / Chart.js** | Gráficas en frontend (dashboard de emociones) | Integrado en React |
| **GitHub Insights** | Análisis de commits y actividad | Disponible en GitHub repo |
| **Google Analytics** | Tracking de usuarios (opcional) | Dashboard GA integrado |

### Comunicación y Coordinación

| Plataforma | Uso | Horarios |
|-----------|-----|---------|
| **Discord** | Chat general, notificaciones de GitHub | 24/7, respuestas ~1h |
| **WhatsApp** | Contacto rápido para urgencias | 24/7, respuestas inmediatas |
| **GitHub Discussions** | Conversaciones sobre decisiones técnicas | Asíncrono, importante |
| **Reuniones Semanales** | Sprint planning, review, retrospective | Jueves 18:00 GMT+1 |

---

<br>

## E. Gestión de Credenciales y Accesos

### Variables de Entorno Críticas

**Backend (.env.backend):**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mindcare
JWT_SECRET=<secreto-aleatorio-largo>
BCRYPT_ROUNDS=10
GROK_API_KEY=<clave-grok>
SENDGRID_API_KEY=<clave-sendgrid> (futuro)
SENTRY_DSN=<sentry-dsn>
FRONTEND_URL=https://mindcare.vercel.app
```

**Frontend (.env.frontend):**
```
REACT_APP_API_URL=https://mindcare-api.onrender.com
REACT_APP_GA_MEASUREMENT_ID=<google-analytics-id>
REACT_APP_ENVIRONMENT=production
```

### Acceso a Servicios

| Servicio | Credencial | Responsable | Almacenamiento |
|----------|-----------|-------------|-----------------|
| **GitHub** | PAT (Personal Access Token) | Adrián | 1Password (equipo) |
| **MongoDB Atlas** | Credenciales BD | José Antonio | 1Password (equipo) |
| **Vercel** | API Token | Rocío | GitHub Secrets (automático) |
| **Render/Railway** | API Token | Adrián | GitHub Secrets (automático) |
| **Grok API** | API Key | Adrián | .env.backend (local + GitHub Secrets) |
| **Sentry** | DSN | Adrián | .env.backend |

**Nota de Seguridad:** Las credenciales NO están en el repositorio público. Se usan:
- `.env.example` como plantilla
- `GitHub Secrets` para CI/CD
- `1Password` para gestión de contraseñas del equipo

---

<br>

## F. CI/CD y Automatización

### GitHub Actions Workflows

| Workflow | Trigger | Acciones |
|----------|---------|----------|
| **test.yml** | Push a main/develop | Tests unitarios + ESLint |
| **deploy-backend.yml** | Push a main | Deploy a Render/Railway |
| **deploy-frontend.yml** | Push a main | Deploy a Vercel |
| **security-scan.yml** | Weekly (viernes) | Scan de dependencias (Dependabot) |

### Deployment Pipeline

```
Git Push → GitHub Actions Tests → Code Review → Merge → Deploy
```

**Tiempo de despliegue:** ~3-5 minutos

---

<br>

## G. Monitorización y Logging

### Monitorización de Errores

- **Sentry:** Captura excepciones en tiempo real (backend + frontend)
- **MongoDB Alerts:** Notificaciones de problemas de conexión
- **Vercel Analytics:** Performance del frontend
- **Render/Railway Logs:** Logs del backend

### Logs del Proyecto

| Nivel | Herramienta | Almacenamiento | Retención |
|-------|-------------|-----------------|-----------|
| **Error** | Sentry | Cloud (Sentry.io) | 30 días |
| **Warning** | Console logs | MongoDB (aplicación) | 7 días |
| **Info** | Application logs | Stdout (Render logs) | 7 días |
| **Debug** | Local development | Consola del navegador | N/A |

---

<br>

## H. Escalabilidad y Futuro

### Cuando el Proyecto Crezca

**Si llega a 1,000+ usuarios activos mensuales:**

| Componente | Upgrade |
|-----------|---------|
| **Frontend Hosting** | Vercel → Vercel Pro o AWS CloudFront |
| **Backend Hosting** | Render free → Render paid ($7+) o Railway pro |
| **Base de Datos** | MongoDB M0 → M2 ($9/mes) o M10 ($100/mes) |
| **API Rate Limit** | Grok → Considerar otras IA o caché local |
| **CDN** | Vercel built-in → CloudFlare para assets |
| **Monitoring** | Sentry free → Sentry pro ($0.01/event adicional) |

### Plan de Escalado (Roadmap)

1. **Mes 1-3:** MVP con usuarios piloto (plan actual funciona)
2. **Mes 3-6:** ~500 usuarios → Upgrade MongoDB M2
3. **Mes 6-12:** ~5K usuarios → Upgrade Backend, caché Redis
4. **Año 2:** Considerar microservicios, base de datos replicada

---

<br>

## I. Resumen de Recursos

### Costes Mensuales de Operación

| Concepto | Coste Mensual |
|----------|---------------|
| Frontend Hosting (Vercel) | 0 € |
| Backend Hosting (Render) | 5-15 € |
| Base de Datos (MongoDB) | 0-9 € |
| Grok API | 10-20 € |
| Dominio | 1 € |
| **TOTAL** | **16-45 €/mes** |

### Disponibilidad de Servicios (SLA)

| Servicio | SLA |
|----------|-----|
| Vercel | 99.95% |
| Render | 99.5% |
| MongoDB Atlas | 99.95% |
| Grok AI | ~95% |
| GitHub | 99.9% |

### Conclusión

MindCare utiliza una **arquitectura moderna, escalable y rentable** basada en servicios gratuitos/low-cost durante MVP, con capacidad de escalar según demanda. El equipo tiene acceso a todas las herramientas necesarias y credenciales están correctamente gestionadas.  
