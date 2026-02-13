# 🤝 Guía de Contribución - MindCare

<div align="center">

**Gracias por tu interés en contribuir a MindCare** 💙

*Tu código puede marcar la diferencia en la vida de personas que enfrentan desafíos de salud mental.*

</div>

---

## 📑 Tabla de Contenidos

- [Bienvenida](#-bienvenida)
- [Código de Conducta](#-código-de-conducta)
- [Flujo de Desarrollo](#-flujo-de-desarrollo)
- [Estándares de Código](#-estándares-de-código)
- [Convención de Commits](#-convención-de-commits)
- [Proceso de Pull Request](#-proceso-de-pull-request)
- [Consideraciones Éticas y Legales](#%EF%B8%8F-consideraciones-éticas-y-legales)
- [Reportar Bugs y Solicitar Features](#-reportar-bugs-y-solicitar-features)
- [Recursos Útiles](#-recursos-útiles)

---

## 👋 Bienvenida

MindCare es más que un proyecto de software — es una herramienta diseñada para **democratizar el acceso al seguimiento emocional** y acompañar a personas en situación de vulnerabilidad que enfrentan síntomas depresivos.

Cada línea de código que contribuyes tiene el potencial de:

- 🧠 Ayudar a alguien a comprender mejor sus patrones emocionales
- 🆘 Facilitar que una persona en crisis contacte con su red de apoyo
- 📊 Proporcionar datos que permitan a profesionales de salud mental dar mejor seguimiento

**Tu contribución importa.** Ya sea corrigiendo un bug, mejorando la documentación o proponiendo nuevas funcionalidades, eres parte de un proyecto con propósito social.

---

## 📜 Código de Conducta

Este proyecto se compromete a proporcionar un ambiente **seguro, inclusivo y respetuoso** para todos los colaboradores, independientemente de su experiencia, identidad de género, orientación sexual, discapacidad, apariencia física, raza, religión o nacionalidad.

### Comportamientos Esperados

- ✅ Comunicación respetuosa y constructiva
- ✅ Aceptar críticas con profesionalismo
- ✅ Enfocarse en lo mejor para la comunidad y los usuarios
- ✅ Mostrar empatía hacia otros colaboradores
- ✅ Reconocer el trabajo de otros (atribución adecuada)

### Comportamientos Inaceptables

- ❌ Comentarios despectivos, insultos o ataques personales
- ❌ Acoso público o privado
- ❌ Publicación de información privada sin consentimiento
- ❌ Conducta que pueda considerarse inapropiada en un entorno profesional

**Reportar violaciones:** Contacta a los maintainers a través de los Issues del repositorio o directamente vía GitHub.

---

## 🔀 Flujo de Desarrollo

### Estrategia de Ramas (Git Flow)

```
main ─────────────────────────────────────────────────► Producción (estable)
  │
  └── dev ────────────────────────────────────────────► Integración (staging)
        │
        ├── feature/nueva-funcionalidad ──────────────► Desarrollo de features
        │
        ├── bugfix/correccion-error ──────────────────► Corrección de bugs
        │
        ├── hotfix/parche-urgente ────────────────────► Parches críticos en prod
        │
        └── docs/mejora-documentacion ────────────────► Cambios de documentación
```

| Rama | Propósito | Merge Target |
|------|-----------|--------------|
| `main` | Código estable en producción | - |
| `dev` | Rama de integración para testing | `main` |
| `feature/*` | Nuevas funcionalidades | `dev` |
| `bugfix/*` | Corrección de bugs no críticos | `dev` |
| `hotfix/*` | Parches urgentes para producción | `main` + `dev` |
| `docs/*` | Mejoras de documentación | `dev` |

### Pasos para Empezar a Contribuir

#### 1️⃣ Fork del Repositorio

```bash
# Haz click en "Fork" en la esquina superior derecha de GitHub
# Esto crea una copia del repositorio en tu cuenta
```

#### 2️⃣ Clonar tu Fork

```bash
git clone https://github.com/TU_USUARIO/DAW2-Proyecto-Grupo-7.git
cd DAW2-Proyecto-Grupo-7
```

#### 3️⃣ Configurar Upstream

```bash
# Añadir el repositorio original como "upstream"
git remote add upstream https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git

# Verificar remotes
git remote -v
# origin    https://github.com/TU_USUARIO/DAW2-Proyecto-Grupo-7.git (fetch)
# origin    https://github.com/TU_USUARIO/DAW2-Proyecto-Grupo-7.git (push)
# upstream  https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git (fetch)
# upstream  https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7.git (push)
```

#### 4️⃣ Crear una Rama de Trabajo

```bash
# Asegúrate de estar actualizado con dev
git checkout dev
git pull upstream dev

# Crear tu rama de trabajo
git checkout -b feature/mi-nueva-funcionalidad

# Ejemplos de nombres de rama:
# feature/add-dark-mode
# bugfix/fix-login-validation
# docs/update-api-reference
# hotfix/security-patch-jwt
```

#### 5️⃣ Configurar el Entorno de Desarrollo

```bash
# Opción A: Docker (recomendado)
cp .env.docker.example .env
docker-compose up -d

# Opción B: Setup manual
cd backend && npm install
cd ../frontend && npm install
```

#### 6️⃣ Desarrollar y Testear

```bash
# Backend
cd backend
npm run dev

# Frontend (en otra terminal)
cd frontend
npm start

# Verificar health check
curl http://localhost:4000/api/health
```

---

## 📏 Estándares de Código

### 🔧 Backend (Node.js/Express)

#### JSDoc Obligatorio

Todas las funciones, controladores y middlewares **deben** estar documentados con JSDoc:

```javascript
/**
 * @function createRegistro
 * @description Crea un nuevo registro emocional diario del usuario
 * @param {object} req - Objeto de petición de Express
 * @param {object} req.body - Datos del registro emocional
 * @param {number} req.body.estadoAnimo - Estado de ánimo (1-10)
 * @param {number} req.body.horasSueno - Horas de sueño
 * @param {object} res - Objeto de respuesta de Express
 * @returns {Promise<void>} Respuesta JSON con el registro creado
 * @throws {401} Si el usuario no está autenticado
 * @throws {500} Si hay error en el servidor
 */
const createRegistro = async (req, res) => {
  // Implementación...
};
```

#### Patrón MVC

Respetar la arquitectura existente:

```
backend/src/
├── controllers/    # Lógica de negocio (handlers de rutas)
├── models/         # Esquemas de Mongoose
├── routes/         # Definición de endpoints
├── middleware/     # Middlewares personalizados
├── services/       # Lógica de servicios externos (email, IA)
└── utils/          # Funciones auxiliares
```

#### Convenciones de Nomenclatura

```javascript
// ✅ Correcto
const getUserById = async (req, res) => { ... };
const authMiddleware = (req, res, next) => { ... };
const ContactoEmergencia = mongoose.model('ContactoEmergencia', schema);

// ❌ Incorrecto
const get_user_by_id = async (req, res) => { ... };  // No usar snake_case
const Auth = (req, res, next) => { ... };            // Middleware en camelCase
```

### 🎨 Frontend (React)

#### Componentes Funcionales con Hooks

```jsx
// ✅ Correcto - Componente funcional
const EmotionTracker = ({ userId }) => {
  const [emotions, setEmotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchEmotions();
  }, [userId]);
  
  return (
    <div className="emotion-tracker">
      {/* ... */}
    </div>
  );
};

// ❌ Incorrecto - Componentes de clase (legacy)
class EmotionTracker extends React.Component {
  // No usar componentes de clase
}
```

#### Atomic Design

Seguir la estructura de componentes existente:

```
frontend/src/components/
├── atoms/          # Componentes básicos (Button, Input, Text)
├── molecules/      # Combinaciones de átomos (FormField, Card)
├── organisms/      # Secciones complejas (Header, DiaryEditor)
├── templates/      # Layouts de página
└── pages/          # Páginas completas
```

#### Nomenclatura de Componentes

```jsx
// ✅ Correcto
const DiaryEntry = () => { ... };           // PascalCase
const useAuthStore = () => { ... };         // Hooks con "use" prefix
const handleSubmit = () => { ... };         // Handlers con "handle" prefix

// ❌ Incorrecto
const diary_entry = () => { ... };          // No usar snake_case
const AuthStore = () => { ... };            // Hooks deben empezar con "use"
```

### 🔍 Linting y Formateo

#### ESLint

```bash
# Verificar errores de linting
npm run lint

# Corregir automáticamente
npm run lint:fix
```

#### Prettier (Recomendado)

Configuración `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## 📝 Convención de Commits

Este proyecto utiliza **Conventional Commits** para mantener un historial de cambios limpio y generar changelogs automáticos.

### Formato

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(auth): añadir login con Google` |
| `fix` | Corrección de bug | `fix(diario): corregir validación de contraseña` |
| `docs` | Cambios en documentación | `docs(readme): actualizar instrucciones de instalación` |
| `style` | Formateo, sin cambios de lógica | `style(api): aplicar prettier a controladores` |
| `refactor` | Refactorización de código | `refactor(auth): extraer lógica JWT a servicio` |
| `test` | Añadir o modificar tests | `test(registro): añadir tests de validación` |
| `chore` | Tareas de mantenimiento | `chore(deps): actualizar dependencias` |
| `perf` | Mejoras de rendimiento | `perf(db): optimizar queries de registros` |
| `ci` | Cambios en CI/CD | `ci(docker): añadir cache de capas` |

### Ejemplos Completos

```bash
# Feature simple
git commit -m "feat(registro): añadir campo de nivel de energía"

# Fix con referencia a Issue
git commit -m "fix(emergencia): corregir envío de email duplicado

Closes #42"

# Breaking change
git commit -m "feat(api)!: cambiar estructura de respuesta de /registros

BREAKING CHANGE: La respuesta ahora devuelve { data: [...] } en lugar de array directo"

# Commit con cuerpo descriptivo
git commit -m "refactor(auth): migrar de bcrypt a bcryptjs

- bcryptjs es JavaScript puro, elimina dependencia de compilación nativa
- Mantiene compatibilidad con hashes existentes
- Mejora tiempo de instalación en CI/CD"
```

### Validación de Commits

Considera usar `commitlint` para validar automáticamente:

```bash
# Instalar (opcional)
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

---

## 🔃 Proceso de Pull Request

### Checklist Antes de Crear PR

- [ ] ✅ Mi código sigue los estándares de este proyecto
- [ ] ✅ He añadido JSDoc a todas las funciones nuevas
- [ ] ✅ He actualizado la documentación si es necesario
- [ ] ✅ La build de Docker pasa correctamente
- [ ] ✅ He testeado manualmente los cambios
- [ ] ✅ Mi rama está actualizada con `dev`
- [ ] ✅ Los commits siguen Conventional Commits

### Verificar Build de Docker

```bash
# Backend
cd backend
docker build -t mindcare-backend:test .

# Frontend
cd frontend
docker build -t mindcare-frontend:test .

# O usar docker-compose
docker-compose build
docker-compose up -d
# Verificar que todo funciona
curl http://localhost:4000/api/health
```

### Crear el Pull Request

1. **Push tu rama a tu fork:**
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

2. **Ir a GitHub** y crear Pull Request hacia `dev` (no hacia `main`)

3. **Completar la plantilla del PR:**

```markdown
## 📋 Descripción

Breve descripción de los cambios realizados.

## 🔗 Issue Relacionado

Closes #XX (o "Relacionado con #XX" si no cierra el issue)

## 🧪 Tipo de Cambio

- [ ] 🐛 Bug fix (cambio que corrige un issue)
- [ ] ✨ Nueva feature (cambio que añade funcionalidad)
- [ ] 💥 Breaking change (cambio que rompe compatibilidad)
- [ ] 📖 Documentación (cambios solo en docs)
- [ ] 🔧 Refactor (cambio que no añade feature ni corrige bug)

## 📸 Screenshots (si aplica)

Añadir capturas si hay cambios visuales.

## ✅ Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He añadido JSDoc donde es necesario
- [ ] La build de Docker pasa
- [ ] He actualizado la documentación
```

### Proceso de Review

1. **Asignación automática:** Un maintainer revisará tu PR
2. **CI/CD:** GitHub Actions ejecutará builds automáticos
3. **Feedback:** Responde a los comentarios de review
4. **Merge:** Una vez aprobado, se hace merge a `dev`
5. **Release:** Periódicamente, `dev` se mergea a `main`

---

## ⚖️ Consideraciones Éticas y Legales

> **⚠️ IMPORTANTE: MindCare es una aplicación de Salud Mental**

Este proyecto maneja datos sensibles relacionados con el bienestar emocional de las personas. Como colaborador, debes comprometerte con los siguientes principios:

### 🔒 Protección de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│  ❌ PROHIBIDO TERMINANTEMENTE                                    │
│                                                                  │
│  • Subir datos reales de usuarios a entornos de prueba          │
│  • Usar información personal identificable en tests             │
│  • Exponer logs con datos sensibles en commits                  │
│  • Compartir capturas de pantalla con datos reales              │
│  • Almacenar tokens o credenciales en el código                 │
└─────────────────────────────────────────────────────────────────┘
```

**Para testing, usar SIEMPRE datos ficticios:**

```javascript
// ✅ Correcto - Datos ficticios para tests
const mockUser = {
  nombre: 'Usuario Test',
  email: 'test@ejemplo.com',
  registros: [
    { estadoAnimo: 7, fecha: '2026-01-01' }
  ]
};

// ❌ Incorrecto - Nunca usar datos reales
const realUser = {
  nombre: 'Juan Pérez García',  // Nombre real
  email: 'juan.perez@gmail.com' // Email real
};
```

### 🏥 Rigor Clínico

El sistema de tracking emocional está basado en:
- **DSM-5** (Diagnostic and Statistical Manual of Mental Disorders)
- **Behavioral Activation** (Técnicas de activación conductual)
- **Guías NICE y APA** para tratamiento de depresión

**Al modificar funcionalidades de seguimiento emocional:**

- ✅ Mantener la escala de medición existente (1-10)
- ✅ Respetar los campos clínicos definidos
- ✅ No añadir "gamificación" que trivialice la salud mental
- ✅ Consultar la documentación en `docs/investigación-tracker.md`
- ❌ No modificar las preguntas del formulario sin revisión clínica

### 📜 Cumplimiento Legal

Este proyecto cumple con:
- **RGPD** (Reglamento General de Protección de Datos)
- **LOPD-GDD** (Ley Orgánica de Protección de Datos)

Al contribuir, aceptas que tu código:
- Respetará los principios de minimización de datos
- Implementará consentimiento explícito cuando sea necesario
- No introducirá tracking o analytics sin consentimiento

> 📖 Ver documentación completa: [docs/legislacion.md](docs/legislacion.md)

---

## 🐛 Reportar Bugs y Solicitar Features

### Reportar un Bug

**Antes de reportar:**
1. Busca en [Issues existentes](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/issues) si ya fue reportado
2. Verifica que puedes reproducir el bug en la última versión

**Crear Issue de Bug:**

```markdown
## 🐛 Descripción del Bug

Descripción clara y concisa del problema.

## 📋 Pasos para Reproducir

1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

## ✅ Comportamiento Esperado

Qué debería pasar.

## ❌ Comportamiento Actual

Qué pasa actualmente.

## 📸 Screenshots

Si aplica, añadir capturas.

## 🖥️ Entorno

- **OS:** [ej. Windows 11, macOS 14, Ubuntu 22.04]
- **Browser:** [ej. Chrome 120, Firefox 121]
- **Node.js:** [ej. 18.19.0]
- **Docker:** [ej. 24.0.7]

## 📝 Información Adicional

Cualquier contexto adicional relevante.
```

### Solicitar una Feature

```markdown
## ✨ Descripción de la Feature

Descripción clara de la funcionalidad propuesta.

## 🎯 Problema que Resuelve

¿Qué problema del usuario resuelve esta feature?

## 💡 Solución Propuesta

Descripción de cómo debería funcionar.

## 🔄 Alternativas Consideradas

Otras soluciones que hayas considerado.

## 📊 Impacto

- **Usuarios afectados:** [todos / específicos]
- **Complejidad estimada:** [baja / media / alta]
- **Prioridad sugerida:** [baja / media / alta]

## 📝 Información Adicional

Mockups, ejemplos de otras apps, etc.
```

---

## 📚 Recursos Útiles

### Documentación del Proyecto

| Recurso | Descripción |
|---------|-------------|
| [README.md](README.md) | Visión general del proyecto |
| [Backend README](backend/README.md) | Documentación técnica del backend |
| [API Reference](backend/docs/API_REFERENCE.md) | Especificación de endpoints |
| [Auth Architecture](backend/docs/arquitectura-auth.md) | Sistema de autenticación |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| [Postman Collection](backend/postman/) | Testing de API |
| [JSDoc](https://adriandiaz24.github.io/DAW2-Proyecto-Grupo-7/) | Documentación autogenerada |
| [Docker Compose](docker-compose.yml) | Orquestación local |

### Enlaces Externos

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

---

<div align="center">

## 💙 ¡Gracias por Contribuir!

**Cada contribución nos acerca a una herramienta más completa para el bienestar emocional.**

*"El código que escribimos hoy puede ser el apoyo que alguien necesita mañana."*

<br/>

[![GitHub Issues](https://img.shields.io/github/issues/AdrianDiaz24/DAW2-Proyecto-Grupo-7?style=flat-square)](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/issues)
[![GitHub PRs](https://img.shields.io/github/issues-pr/AdrianDiaz24/DAW2-Proyecto-Grupo-7?style=flat-square)](https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/pulls)

</div>

