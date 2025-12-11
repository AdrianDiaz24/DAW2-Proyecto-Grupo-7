# MindCare - Proyecto Optativa DWEC/DWES

## Equipo de Desarrollo

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

---

## Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Cumplimiento de Requisitos Técnicos](#cumplimiento-de-requisitos-técnicos)
   - [Backend](#backend-nodejs-y-express)
   - [Base de Datos](#base-de-datos-mongodb)
   - [Frontend](#frontend-react)
   - [Integración Frontend-Backend](#integración-frontend-backend)
   - [Seguridad](#seguridad)
3. [Cumplimiento de Requisitos Metodológicos](#cumplimiento-de-requisitos-metodológicos)
   - [Organización y Gestión](#organización-y-gestión)
   - [Documentación](#documentación)
4. [Resultados de Aprendizaje](#resultados-de-aprendizaje)
5. [Tecnologías Utilizadas](#tecnologías-utilizadas)
6. [Enlaces a Documentación](#enlaces-a-documentación)

---

## Descripción del Proyecto

MindCare es una aplicación web fullstack desarrollada con el stack MERN (MongoDB, Express, React, Node.js) que tiene como objetivo proporcionar una plataforma digital para el seguimiento y gestión del bienestar emocional. La aplicación permite a los usuarios registrar su estado anímico, actividades diarias y acceder a recursos para el cuidado de su salud mental.

**Características principales:**
- Sistema de autenticación y autorización con JWT
- Registro diario de emociones y actividades
- Diario personal con protección opcional por contraseña
- Gestión de contactos de emergencia
- Interfaz responsive y accesible
- API REST completamente documentada

---

## Cumplimiento de Requisitos Técnicos

### Backend (Node.js y Express)

#### Endpoints Funcionales

**CUMPLIMIENTO: El proyecto implementa más de 15 endpoints funcionales que cubren todas las operaciones CRUD requeridas.**

**Rutas de Autenticación** (`backend/src/routes/auth.routes.js`):
- **POST** `/api/auth/register` - Registro de nuevos usuarios
- **POST** `/api/auth/login` - Inicio de sesión de usuarios
- **GET** `/api/auth/profile` - Obtención de perfil de usuario (protegido)

**Rutas de Registro** (`backend/src/routes/registro.routes.js`):
- **POST** `/api/registros` - Crear nuevo registro de actividad (protegido)
- **GET** `/api/registros` - Obtener todos los registros del usuario (protegido)
- **GET** `/api/registros/rango` - Obtener registros por rango de fechas (protegido)
- **GET** `/api/registros/fecha/:fecha` - Obtener registros por fecha específica (protegido)
- **GET** `/api/registros/:id` - Obtener registro por ID (protegido)

**Rutas de Diario** (`backend/src/routes/diario.routes.js`):
- **POST** `/api/diario` - Crear entrada de diario (protegido)
- **GET** `/api/diario` - Obtener todas las entradas del usuario (protegido)
- **PUT** `/api/diario/:id` - Actualizar entrada de diario (protegido)
- **DELETE** `/api/diario/:id` - Eliminar entrada de diario (protegido)
- **GET** `/api/diario/:id` - Obtener entrada específica
- **POST** `/api/diario/:id/acceso` - Acceso a entrada protegida con contraseña

**Rutas de Contactos de Emergencia** (`backend/src/routes/contactoEmergencia.routes.js`):
- **POST** `/api/contactos-emergencia` - Crear contacto (protegido)
- **GET** `/api/contactos-emergencia` - Obtener contactos del usuario (protegido)

**Rutas de Formulario Inicial** (`backend/src/routes/formulario.routes.js`):
- **POST** `/api/formulario` - Crear o actualizar formulario inicial (protegido)
- **GET** `/api/formulario` - Obtener formulario del usuario (protegido)

**Ruta de Health Check** (`backend/src/routes/health.routes.js`):
- **GET** `/api/health` - Verificación del estado del servidor

**Operaciones CRUD implementadas:**
- **GET:** Recuperación de información de la base de datos en múltiples endpoints
- **POST:** Creación de nuevos registros (usuarios, entradas de diario, registros, contactos)
- **PUT:** Actualización de datos existentes (entradas de diario, formularios)
- **DELETE:** Eliminación de registros (entradas de diario)

#### Gestión de Errores

**CUMPLIMIENTO: Se implementa gestión de errores robusta en todos los endpoints.**

Características de la gestión de errores:
- Uso de bloques try-catch en todos los controladores
- Códigos de estado HTTP apropiados (200, 201, 400, 401, 403, 404, 500)
- Mensajes de error descriptivos y claros
- Validación de datos de entrada
- Manejo de errores de base de datos
- Logs detallados para debugging

Ejemplo de implementación en `backend/src/controllers/`:
```javascript
// Validación de entrada
if (!campo) {
    return res.status(400).json({ message: 'Campo requerido' });
}

// Manejo de errores de operaciones
try {
    // Operación de base de datos
} catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error del servidor' });
}
```

#### Operaciones Protegidas mediante Autenticación

**CUMPLIMIENTO: Más de 10 endpoints están protegidos mediante el middleware de autenticación JWT.**

El middleware `authMiddleware` (`backend/src/middleware/authMiddleware.js`) protege las siguientes rutas:
- Todas las operaciones de registro (/api/registros/*)
- Todas las operaciones de diario excepto acceso público (/api/diario/*)
- Todas las operaciones de contactos de emergencia (/api/contactos-emergencia/*)
- Operaciones de formulario inicial (/api/formulario/*)
- Obtención de perfil de usuario (/api/auth/profile)

El middleware verifica:
- Presencia del token JWT en el header Authorization
- Validez y firma del token
- Expiración del token
- Existencia del usuario en la base de datos

---

### Base de Datos (MongoDB)

#### Mongoose con Esquemas y Validaciones

**CUMPLIMIENTO: Se utilizan 5 modelos Mongoose con esquemas claros y validaciones básicas.**

**Modelos implementados** (ubicados en `backend/src/models/`):

1. **Usuario** (`usuarios_mongoose.js`):
   - Campos: nombre, email, password, fechaRegistro, ultimoAcceso
   - Validaciones: email único, formato de email, longitud de password
   - Hash automático de contraseñas con bcrypt
   - Método de comparación de contraseñas

2. **Registro** (`registro_mongoose.js`):
   - Campos: userId, fecha, emociones, niveles (sueño, energía, estrés), actividades, notas
   - Validaciones: usuario requerido, arrays de emociones y actividades
   - Relación con modelo Usuario

3. **Diario** (`diario_mongoose.js`):
   - Campos: userId, titulo, contenido, emocionPrincipal, password (opcional), fechaCreacion, fechaActualizacion
   - Validaciones: título y contenido requeridos, longitud máxima
   - Sistema de protección con contraseña opcional
   - Hash de contraseñas con bcrypt

4. **Contacto de Emergencia** (`contactoEmergencia_mongoose.js`):
   - Campos: userId, nombre, telefono, relacion, esPrincipal
   - Validaciones: campos requeridos, formato de teléfono
   - Relación con modelo Usuario

5. **Formulario Inicial** (`formularioInicial_mongoose.js`):
   - Campos: userId, objetivos, experienciaPrevia, frecuenciaRegistro, preferencias
   - Validaciones: arrays de objetivos, usuario único
   - Configuración inicial del usuario

Todos los modelos incluyen:
- Tipos de datos específicos
- Campos requeridos
- Valores por defecto
- Timestamps automáticos
- Validaciones personalizadas
- Índices para optimización de consultas

#### Script de Seeding

**CUMPLIMIENTO: Se proporciona un script para poblar la base de datos con datos iniciales.**

**Ubicación:** `backend/scripts/seed.js`

El script de seeding permite:
- Crear usuarios de prueba con contraseñas hasheadas
- Generar registros de ejemplo con diferentes emociones y actividades
- Crear entradas de diario de muestra
- Poblar contactos de emergencia
- Limpiar la base de datos antes de insertar nuevos datos

**Ejecución:**
```bash
cd backend
node scripts/seed.js
```

---

### Frontend (React)

#### Aplicación SPA con React Router

**CUMPLIMIENTO: Se ha creado una Single Page Application con navegación fluida mediante React Router.**

**Configuración del Router** (`frontend/src/App.js`):
- Implementación de BrowserRouter
- Configuración de múltiples rutas
- Sistema de layouts (MainLayout, AuthLayout)
- Navegación programática con useNavigate
- Enlaces declarativos con Link

**Rutas implementadas:**
- `/` - Landing page
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/home` - Página principal (protegida)
- `/seguimiento` - Registro de actividades (protegida)
- `/diario` - Diario personal (protegida)
- `/articulos` - Recursos y artículos (protegida)
- `/perfil` - Perfil de usuario (protegida)

La navegación es completamente fluida sin recargas de página, proporcionando una experiencia de usuario moderna y ágil.

#### Protección de Rutas en Frontend

**CUMPLIMIENTO: Se implementa un sistema de protección de rutas que verifica la autenticación del usuario.**

**Implementación del ProtectedRoute** (`frontend/src/App.js`):
```javascript
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = user && token;
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};
```

**Rutas protegidas:**
- Home
- Seguimiento
- Diario
- Artículos
- Perfil

Las rutas protegidas verifican:
- Existencia de usuario en el store
- Validez del token JWT
- Redirección automática a login si no está autenticado
- Persistencia de la sesión con Zustand

#### Validaciones en Formularios

**CUMPLIMIENTO: Los formularios implementan validaciones tanto en cliente como en servidor.**

**Validaciones implementadas en el frontend:**

**Formulario de Login** (`frontend/src/pages/Login.js`):
- Campo email con tipo `type="email"` para validación HTML5
- Atributo `required` en todos los campos obligatorios
- Placeholder descriptivos
- Validación de formato de email

**Formulario de Registro** (`frontend/src/pages/Register.js`):
- Validación de email único
- Validación de formato de email
- Campos obligatorios con `required`
- Validación de longitud de contraseña
- Confirmación de contraseña

**Formulario de Seguimiento** (`frontend/src/pages/Seguimiento.jsx`):
- Validación de selección de emociones
- Validación de rangos numéricos (sliders)
- Validación de campos de texto
- Validación de checkboxes

Todas las validaciones proporcionan:
- Feedback visual inmediato
- Mensajes de error descriptivos
- Prevención de envíos inválidos
- UX mejorada con indicadores visuales

#### Variación de Eventos

**CUMPLIMIENTO: Se utilizan múltiples tipos de eventos en diferentes componentes.**

**Eventos implementados** (más de 3 tipos diferentes):

1. **onChange** (más de 20 usos):
   - Inputs de texto (`frontend/src/pages/Login.js`, `Register.js`)
   - Selectores de emociones (`frontend/src/pages/Seguimiento.jsx`)
   - Sliders de nivel (`frontend/src/components/atoms/Slider.jsx`)
   - Checkboxes (`frontend/src/components/atoms/Checkbox.jsx`)
   - Textareas (`frontend/src/components/atoms/Textarea.jsx`)

2. **onSubmit** (múltiples formularios):
   - Formulario de login
   - Formulario de registro
   - Formulario de seguimiento
   - Formulario de diario

3. **onClick** (botones y acciones):
   - Botones de navegación (`frontend/src/components/molecules/Navbar.jsx`)
   - Botones de acción (`frontend/src/components/atoms/Button.jsx`)
   - Cards interactivas (`frontend/src/components/molecules/ActionCard.jsx`)
   - Menú hamburguesa (`frontend/src/components/molecules/StaggeredMenu.jsx`)

4. **onFocus/onBlur** (inputs y campos):
   - Gestión de estado de foco en inputs
   - Validaciones al perder el foco

5. **onMouseEnter/onMouseLeave** (efectos hover):
   - Animaciones en NavLinks
   - Efectos visuales en cards

6. **Eventos personalizados**:
   - Gestión de modal de emergencia
   - Sistema de notificaciones con toast

#### Respuesta Dinámica y Manejo de Estados

**CUMPLIMIENTO: El frontend responde dinámicamente a los eventos y gestiona correctamente los estados.**

**Gestión de estados locales con useState:**
- Estados de formularios (email, password, formData)
- Estados de UI (loading, error, success)
- Estados de modales y overlays
- Estados de selección y navegación

**Gestión de estado global con Zustand** (`frontend/src/store/authStore.js`):
- Estado de autenticación (user, token)
- Persistencia de sesión
- Métodos de login/logout
- Sincronización entre componentes

**Renderizado condicional:**
- Mostrar/ocultar componentes según autenticación
- Renderizado de errores y mensajes
- Estados de carga (loading)
- Contenido basado en datos del usuario

**Actualizaciones dinámicas:**
- Actualización de UI tras operaciones CRUD
- Notificaciones en tiempo real con react-hot-toast
- Navegación programática tras acciones
- Sincronización de datos con el backend

---

### Integración Frontend-Backend

#### Flujo Completo de Datos con Axios

**CUMPLIMIENTO: Se implementa el flujo completo de comunicación entre frontend y backend mediante llamadas API.**

**Configuración de Axios** (`frontend/src/config/api.service.js`):
```javascript
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
```

**Características de la integración:**
- Instancia de Axios configurada con baseURL dinámica
- Interceptores de peticiones para añadir tokens JWT automáticamente
- Interceptores de respuestas para manejo centralizado de errores
- Timeout configurado para prevenir peticiones colgadas
- Headers personalizados según el tipo de operación

**Configuración de endpoints** (`frontend/src/config/api.js`):
```javascript
export const apiConfig = {
    baseURL: API_URL,
    endpoints: {
        register: `${API_URL}/api/auth/register`,
        login: `${API_URL}/api/auth/login`,
        profile: `${API_URL}/api/auth/profile`,
        registros: `${API_URL}/api/registros`,
    }
};
```

**Servicios implementados:**
- `diario.service.js` - Operaciones CRUD del diario
- `contactoEmergencia.service.js` - Gestión de contactos
- `api.service.js` - Configuración base de Axios

Adicionalmente, se utiliza `fetch` nativo en algunos componentes para operaciones específicas como autenticación.

#### Gestión de Estado con Zustand

**CUMPLIMIENTO: Se utiliza Zustand para la gestión del estado global de la aplicación.**

**Store de autenticación** (`frontend/src/store/authStore.js`):
```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null })
        }),
        {
            name: 'auth-storage'
        }
    )
);
```

**Funcionalidades del store:**
- Almacenamiento persistente del estado de autenticación
- Métodos para login y logout
- Sincronización automática entre tabs del navegador
- Acceso global al estado desde cualquier componente
- Middleware de persistencia para mantener sesión tras recargas

**Ventajas de usar Zustand:**
- API más simple que Redux
- Menos boilerplate
- Mejor rendimiento
- TypeScript-friendly
- Middleware de persistencia integrado

---

### Seguridad

#### Protección de Rutas Backend

**CUMPLIMIENTO: Las rutas que manejan información sensible están protegidas mediante middleware de autenticación.**

**Middleware de autenticación** (`backend/src/middleware/authMiddleware.js`):
- Verificación de token JWT en el header Authorization
- Validación de firma del token con JWT_SECRET
- Comprobación de expiración del token
- Verificación de existencia del usuario en la base de datos
- Inyección de datos del usuario en req.user para acceso en controladores

**Rutas protegidas:**
- Todas las operaciones de registro de actividades
- Todas las operaciones de diario personal
- Gestión de contactos de emergencia
- Actualización de formulario inicial
- Obtención de perfil de usuario

**Características de seguridad adicionales:**
- CORS configurado para permitir solo orígenes específicos
- Helmet para headers de seguridad HTTP
- Rate limiting en endpoints sensibles
- Validación de entrada de datos
- Sanitización de datos antes de guardar en base de datos

#### Hash de Contraseñas y Tokens JWT

**CUMPLIMIENTO: Se implementan medidas básicas de seguridad con hash de contraseñas y tokens JWT.**

**Hash de contraseñas con bcrypt:**

Implementado en `backend/src/models/usuarios_mongoose.js` y `diario_mongoose.js`:
```javascript
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// Pre-save hook para hashear contraseña
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
```

**Características de seguridad de contraseñas:**
- Hash automático antes de guardar en base de datos
- Salt único para cada contraseña
- Factor de trabajo configurable (10 rounds)
- Método seguro de comparación
- Las contraseñas nunca se almacenan en texto plano
- Las contraseñas nunca se devuelven en respuestas API

**Tokens JWT:**

Implementado en `backend/src/controllers/auth.controller.js`:
```javascript
const jwt = require('jsonwebtoken');

// Generación de token
const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);
```

**Características de seguridad de JWT:**
- Secret seguro almacenado en variables de entorno
- Validación de longitud mínima del secret (32 caracteres)
- Expiración configurable de tokens
- Payload mínimo (solo ID y email)
- Verificación de firma en cada petición
- Tokens no modificables sin detectar

**Dependencias de seguridad instaladas:**
- `bcryptjs` v2.4.3 - Hash de contraseñas
- `jsonwebtoken` v9.0.2 - Generación y verificación de JWT
- `helmet` v7.1.0 - Headers de seguridad HTTP
- `cors` v2.8.5 - Configuración de CORS
- `dotenv` v17.2.3 - Gestión segura de variables de entorno

---

## Cumplimiento de Requisitos Metodológicos

### Organización y Gestión

#### Uso de Scrum

**CUMPLIMIENTO: El proyecto se ha desarrollado siguiendo el marco de trabajo Scrum.**

**Documentación disponible:**
- [Planificación de Sprints](../planificacion-sprints.md) - Detalle de los 6 sprints realizados
- [Entregables por Sprint](../entregables-sprints.md) - Documentación de entregables de cada sprint
- [Estructura Organizativa](../estructura-organizativa.md) - Roles y responsabilidades del equipo

**Elementos de Scrum implementados:**

1. **Roles definidos:**
   - Product Owner: Equipo completo (decisiones compartidas)
   - Scrum Master: Rotativo entre los miembros
   - Development Team: 3 desarrolladores con especialización

2. **Artefactos:**
   - Product Backlog gestionado en GitHub Issues
   - Sprint Backlog documentado en cada sprint
   - Incrementos funcionales al final de cada sprint

3. **Eventos:**
   - Sprint Planning al inicio de cada sprint
   - Daily Standups (documentados en commit messages)
   - Sprint Review documentada en `docs/sprintreview/`
   - Sprint Retrospective (lecciones aprendidas documentadas)

4. **Sprints realizados:**
   - Sprint 1 (07-13 Nov): Configuración inicial y estructura
   - Sprint 2 (14-20 Nov): Autenticación y modelos de datos
   - Sprint 3 (21-27 Nov): Vistas principales y registro
   - Sprint 4 (28 Nov - 04 Dic): Diario y contactos de emergencia
   - Sprint 5 (05-11 Dic): Integración y testing
   - Sprint 6 (12-18 Dic): Despliegue y documentación final

#### GitHub Projects

**CUMPLIMIENTO: Las tareas se gestionan mediante GitHub Projects reflejando el estado y asignación.**

**Gestión de tareas:**
- Issues etiquetados por tipo (feature, bug, enhancement, documentation)
- Asignación clara de responsables
- Estados definidos (To Do, In Progress, Done)
- Milestones asociados a sprints
- Pull requests vinculados a issues
- Revisiones de código entre miembros del equipo

**Project Board:**
- Columnas: Backlog, To Do, In Progress, Review, Done
- Automatización de movimiento de tarjetas
- Tracking de progreso por sprint
- Estimación de esfuerzo en issues

---

### Documentación

#### Wiki del Repositorio

**CUMPLIMIENTO: Se documenta el proceso de aprendizaje, retos y metodología Scrum en la Wiki.**

**Contenido de la Wiki (disponible en el repositorio GitHub):**

1. **Proceso de Aprendizaje:**
   - Aprendizaje de tecnologías del stack MERN
   - Recursos utilizados (tutoriales, documentación oficial, cursos)
   - Retos superados durante el desarrollo
   - Lecciones aprendidas

2. **Retos Técnicos:**
   - Integración de MongoDB con Mongoose
   - Implementación de autenticación JWT
   - Gestión de estado con Zustand
   - Diseño responsive con CSS puro
   - Despliegue con Docker y Render

3. **Documentación Scrum:**
   - Roles del equipo
   - Planning de cada sprint
   - Daily standups (resumen)
   - Sprint reviews
   - Retrospectivas

4. **Decisiones Técnicas:**
   - Elección del stack tecnológico
   - Arquitectura de la aplicación
   - Patrones de diseño utilizados
   - Estrategias de testing

#### JSDoc

**CUMPLIMIENTO: Se proporciona documentación completa mediante JSDoc en todo el código.**

**Cobertura de JSDoc:**

**Backend:**
- Todos los controladores documentados (`backend/src/controllers/`)
- Todas las rutas documentadas (`backend/src/routes/`)
- Todos los modelos documentados (`backend/src/models/`)
- Middleware documentado (`backend/src/middleware/`)
- Funciones auxiliares documentadas

**Frontend:**
- Todos los componentes React documentados
- Páginas documentadas (`frontend/src/pages/`)
- Hooks personalizados documentados
- Servicios de API documentados (`frontend/src/service/`)
- Store de Zustand documentado

**Estructura de la documentación JSDoc:**
```javascript
/**
 * @file Descripción del archivo
 * @description Descripción detallada
 * @requires dependencias
 */

/**
 * @function nombreFuncion
 * @description Descripción de la función
 * @param {tipo} parametro - Descripción del parámetro
 * @returns {tipo} Descripción del valor devuelto
 * @async
 */
```

**Elementos documentados:**
- Descripción de archivos
- Descripción de funciones y métodos
- Parámetros con tipos y descripciones
- Valores de retorno
- Ejemplos de uso (en casos complejos)
- Dependencias requeridas
- Excepciones y errores

**Generación de documentación:**
La documentación JSDoc se genera automáticamente mediante GitHub Actions y se despliega en GitHub Pages:
- URL: https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/
- Actualización automática con cada push
- Disponible en formato HTML y PDF

#### Documentación de la API

**CUMPLIMIENTO: Se proporciona documentación detallada de todos los endpoints del backend.**

**Ubicación:** [api-documentation.md](./api-documentation.md)

**Contenido de la documentación:**

Para cada endpoint se documenta:
1. **Método HTTP:** GET, POST, PUT, DELETE
2. **URL del endpoint:** Ruta completa
3. **Descripción:** Funcionalidad del endpoint
4. **Autenticación:** Si requiere token JWT
5. **Parámetros:**
   - Headers requeridos
   - Body (con estructura JSON)
   - Query parameters
   - URL parameters
6. **Respuestas:**
   - Respuesta exitosa (con código de estado)
   - Ejemplo de respuesta JSON
   - Posibles errores (con códigos de estado)
   - Ejemplos de errores JSON

**Endpoints documentados:**
- Autenticación (register, login, profile)
- Registros de actividad (CRUD completo)
- Diario personal (CRUD completo)
- Contactos de emergencia (CRUD completo)
- Formulario inicial (crear/actualizar)
- Health check

**Formato de documentación:**
Cada endpoint incluye ejemplos cURL para facilitar el testing:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Usuario","email":"test@example.com","password":"password123"}'
```

#### Otras Áreas Clave

**CUMPLIMIENTO: Se proporciona documentación completa de configuración, dependencias y guía de usuario.**

**Configuraciones Iniciales:**

Documentado en el [README.md principal](../../README.md):
- Requisitos previos (Node.js, MongoDB)
- Clonación del repositorio
- Instalación de dependencias
- Configuración de variables de entorno
- Ejecución en entorno local (backend y frontend)
- Ejecución con Docker Compose

**Variables de entorno necesarias:**
```env
# Backend
MONGODB_URI=mongodb+srv://...
JWT_SECRET=tu-secret-seguro
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
PORT=4000

# Frontend
REACT_APP_API_URL=http://localhost:4000
PORT=3000
```

**Dependencias:**

Documentadas en `package.json` con propósito claro:

**Backend** (`backend/package.json`):
- express - Framework web
- mongoose - ODM para MongoDB
- bcryptjs - Hash de contraseñas
- jsonwebtoken - Autenticación JWT
- cors - Configuración CORS
- helmet - Seguridad HTTP headers
- dotenv - Variables de entorno
- nodemailer - Envío de emails

**Frontend** (`frontend/package.json`):
- react - Librería UI
- react-router-dom - Routing SPA
- axios - Cliente HTTP
- zustand - Gestión de estado
- react-hot-toast - Notificaciones
- prop-types - Validación de props

**Guía de Usuario:**

Documentada en las secciones de uso del README:
1. Registro de nuevo usuario
2. Inicio de sesión
3. Navegación por la aplicación
4. Registro diario de emociones y actividades
5. Uso del diario personal
6. Gestión de contactos de emergencia
7. Cierre de sesión

**Documentación adicional:**
- [Despliegue](../despliegue.md) - Guía completa de despliegue con Docker y Render
- [CORS Configuration](../cors-configuration.md) - Configuración de CORS
- [Postman Guide](../postman-guide.md) - Colección de Postman para testing
- [Viabilidad Técnica](../viabilidad-tecnica.md) - Análisis técnico del proyecto
- [Presupuesto](../presupuesto.md) - Estimación de costes y tiempo
- [Financiación](../financiacion.md) - Plan de financiación del proyecto


---

## Tecnologías Utilizadas

### Backend
- **Node.js** v18.x - Runtime de JavaScript
- **Express** v4.16 - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** v8.0 - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Hash de contraseñas
- **Helmet** - Seguridad HTTP
- **CORS** - Configuración de intercambio de recursos

### Frontend
- **React** v18.2 - Librería de UI
- **React Router** v6.20 - Routing para SPA
- **Axios** v1.6 - Cliente HTTP
- **Zustand** v5.0 - Gestión de estado
- **React Hot Toast** v2.6 - Notificaciones
- **PropTypes** - Validación de tipos

### DevOps y Herramientas
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de contenedores
- **GitHub Actions** - CI/CD
- **Render** - Hosting y despliegue
- **Git** - Control de versiones
- **JSDoc** - Documentación de código

### Desarrollo
- **Visual Studio Code** - IDE principal
- **Postman** - Testing de API
- **MongoDB Compass** - Cliente GUI para MongoDB
- **Git** - Control de versiones
- **npm** - Gestor de paquetes

---

## Enlaces a Documentación

### Documentación Técnica

- [Documentación de la API](./api-documentation.md) - Endpoints y ejemplos
- [Configuración de CORS](../cors-configuration.md) - Política de intercambio de recursos
- [Guía de Postman](../postman-guide.md) - Colección para testing
- [Despliegue](../despliegue.md) - Guía completa de despliegue

### Documentación del Proyecto

- [Planificación de Sprints](../planificacion-sprints.md) - 6 sprints detallados
- [Entregables por Sprint](../entregables-sprints.md) - Documentación de entregables
- [Estructura Organizativa](../estructura-organizativa.md) - Roles y equipo
- [Presupuesto](../presupuesto.md) - Estimación de costes
- [Financiación](../financiacion.md) - Plan de financiación
- [Viabilidad Técnica](../viabilidad-tecnica.md) - Análisis técnico

### Documentación Generada

- [JSDoc - GitHub Pages](https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/) - Documentación de código
- [README Principal](../../README.md) - Guía de inicio rápido

### Repositorio

- [GitHub Repository](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7) - Código fuente
- [GitHub Wiki](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/wiki) - Proceso de aprendizaje y retos
- [GitHub Projects](https://github.com/users/AdrianDiaz24/projects) - Gestión de tareas

---

**Fecha de última actualización:** 11 de diciembre de 2025

**Versión del documento:** 1.0

**Estado del proyecto:** En desarrollo - Sprint 6 (Documentación final y despliegue)
