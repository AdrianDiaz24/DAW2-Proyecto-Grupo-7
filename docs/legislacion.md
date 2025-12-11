# Legislación y Cumplimiento Legal - MindCare

## Índice

1. [Introducción](#introducción)
2. [Normativas Aplicables](#normativas-aplicables)
   - [RGPD (Reglamento General de Protección de Datos)](#rgpd)
   - [LOreg 3/2018 (Protección de Datos de Salud)](#loreg-3-2018)
   - [Políticas de Cookies](#políticas-de-cookies)
   - [Términos de Servicio y Condiciones de Uso](#términos-de-servicio-y-condiciones-de-uso)
   - [Accesibilidad Web (WCAG 2.1)](#accesibilidad-web-wcag-21)
   - [Propiedad Intelectual y Licencias](#propiedad-intelectual-y-licencias)
3. [Plan de Implementación Técnica](#plan-de-implementación-técnica)
4. [Políticas Legales](#políticas-legales)
5. [Monitorización y Auditoría](#monitorización-y-auditoría)
6. [Responsables de Cumplimiento](#responsables-de-cumplimiento)

---

## Introducción

**MindCare** es una aplicación web diseñada para apoyar la salud mental de los usuarios, permitiéndoles registrar emociones, mantener un diario y acceder a funcionalidades de bienestar. Como aplicación que recopila datos personales y potencialmente datos de salud de usuarios europeos, debe cumplir con una serie de normativas legales y regulaciones de protección de datos.

Este documento establece:
- Las normativas aplicables al proyecto
- Los requisitos específicos de cada normativa
- El plan de implementación técnica para cumplir con la legislación
- Las políticas legales que deben estar disponibles para los usuarios

**Jurisdicción principal:** España (UE)  
**Categoría de datos:** Datos personales, datos de salud mental  
**Usuarios objetivo:** Residentes de la UE (RGPD aplicable)  
**Sector:** Salud mental y bienestar psicológico

---

## Normativas Aplicables

### RGPD (Reglamento General de Protección de Datos)

#### ¿Qué es?
El Reglamento General de Protección de Datos (RGPD) es la regulación europea que protege los derechos de los ciudadanos sobre el uso de sus datos personales. Es **obligatorio para cualquier servicio que recoja datos de residentes de la UE**, independientemente de dónde esté alojada la aplicación.

#### Requisitos de MindCare

##### 1. **Consentimiento Explícito** (Art. 4 y 7 RGPD)

**Requisito:** Los usuarios deben aceptar explícitamente el tratamiento de sus datos antes del registro.

**Implementación:**
- ✅ Checkbox obligatorio en formulario de registro: *"He leído y acepto la Política de Privacidad"*
- ✅ Checkbox obligatorio: *"Acepto recibir comunicaciones sobre cambios en la política"*
- ✅ Enlace a la política de privacidad en el modal de aceptación
- ✅ Registro de consentimiento con timestamp en la base de datos

**Código de ejemplo (React):**
```jsx
const [privacyAccepted, setPrivacyAccepted] = useState(false);
const [cookiesAccepted, setCookiesAccepted] = useState(false);

// En el formulario de registro
<input 
  type="checkbox" 
  required
  onChange={(e) => setPrivacyAccepted(e.target.checked)}
  label="He leído y acepto la Política de Privacidad"
/>
```

##### 2. **Información Transparente** (Art. 14 RGPD)

**Requisito:** Los usuarios deben ser informados sobre:
- Quién recoge sus datos (identidad del responsable)
- Qué datos se recogen
- Para qué se usan
- Cuánto tiempo se guardan
- Derechos que tienen

**Implementación:**
- ✅ Página `/legal/privacidad` con política clara
- ✅ Aviso de privacidad al registrarse
- ✅ Información en el dashboard del usuario sobre sus datos

**Contenido mínimo:**
```
- Identidad del responsable: MindCare Team (Grupo 7 - DAW2)
- Datos recogidos: email, nombre, emociones, entradas de diario
- Propósito: Permitir que el usuario gestione su bienestar mental
- Plazo de conservación: Mientras el usuario tenga la cuenta activa
- Derechos del usuario: Acceso, rectificación, supresión, portabilidad
```

##### 3. **Derechos de los Usuarios** (Art. 15-22 RGPD)

**Derecho de Acceso:** El usuario puede solicitar todos sus datos en formato legible.

**Derecho de Rectificación:** El usuario puede corregir datos incorrectos.

**Derecho de Supresión (Derecho al Olvido):** El usuario puede solicitar la eliminación de sus datos.

**Derecho de Portabilidad:** El usuario puede descargar sus datos en formato JSON.

**Implementación técnica:**

###### a) **Acceso a Datos**
- Endpoint: `GET /api/usuarios/mis-datos`
- Respuesta: JSON con todos los datos del usuario
- Requiere autenticación

###### b) **Rectificación de Datos**
- Endpoint: `PUT /api/usuarios/:id`
- Permite actualizar nombre, email, etc.
- Requiere autenticación

###### c) **Supresión de Datos**
- Endpoint: `DELETE /api/usuarios/:id`
- Borra el usuario y todos sus registros asociados (diario, emociones, etc.)
- Requiere autenticación + confirmación por email
- Log de auditoría: Registra quién y cuándo se eliminó la cuenta

```javascript
// Ejemplo: Endpoint de supresión con confirmación
router.delete('/api/usuarios/:id', authMiddleware, async (req, res) => {
  const { confirmacion } = req.body; // usuario debe escribir "ELIMINAR"
  
  if (confirmacion !== 'ELIMINAR') {
    return res.status(400).json({ error: 'Confirmación incorrecta' });
  }
  
  // Enviar email de confirmación
  await enviarEmailConfirmacion(req.user.email);
  
  // Usuario tiene 7 días para confirmar
  // Después de 7 días, se elimina la cuenta
  
  res.json({ mensaje: 'Verificación enviada a tu email. Tienes 7 días para confirmar.' });
});
```

###### d) **Portabilidad de Datos**
- Endpoint: `GET /api/usuarios/exportar-datos`
- Formato: JSON con estructura clara
- Incluye: usuario, diario, emociones, registros

```json
{
  "usuario": {
    "id": "...",
    "nombre": "...",
    "email": "...",
    "fechaRegistro": "..."
  },
  "diarios": [...],
  "emociones": [...],
  "registros": [...]
}
```

##### 4. **Seguridad de Datos** (Art. 32 RGPD)

**Requisito:** Los datos deben estar protegidos contra accesos no autorizados.

**Implementación:**

| Medida | Descripción | Estado |
|--------|-------------|--------|
| **Cifrado de Contraseñas** | Usar bcrypt (salt rounds: 10) | ✅ Implementado |
| **HTTPS/TLS** | Todas las comunicaciones cifradas | ✅ Configurado en Docker |
| **JWT con Expiración** | Tokens con tiempo limitado (24h) | ✅ Implementado |
| **Variables de Entorno** | Credenciales en `.env`, no en código | ✅ Implementado |
| **Validación de Entrada** | Protección contra SQL injection, XSS | ✅ Implementado (bcrypt, mongoose) |
| **Logs de Auditoría** | Registro de accesos y cambios de datos | ⚠️ Parcialmente implementado |
| **Copias de Seguridad** | MongoDB Atlas con backups automáticos | ✅ Configurado |

##### 5. **Delegado de Protección de Datos (DPO)**

**¿Es obligatorio?** No, en el caso de MindCare. El DPO es obligatorio si:
- La organización es una autoridad pública
- El tratamiento es a gran escala y de naturaleza sensible
- Se lleva a cabo un control sistemático a gran escala

Como aplicación de estudiantes de DAW sin ánimo de lucro y sin procesamiento a gran escala, **no es obligatorio un DPO formal**.

**Recomendación:** Designar a un miembro del equipo como responsable de privacidad (actualmente: Adrián Díaz).

---

### LOreg 3/2018 (Protección de Datos de Salud en España)

#### ¿Qué es?
La Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) es la implementación española del RGPD. Incluye regulaciones adicionales específicas para datos de salud.

#### Requisitos Específicos para Datos de Salud Mental

**Definición:** MindCare recopila "datos de salud" en el sentido de la LOPDGDD porque:
- Los usuarios registran emociones
- Mantienen diarios de bienestar mental
- Estos datos revelan información sobre su estado de salud mental

**Requisitos adicionales:**

1. **Categoría de Datos Especiales**
   - Los datos de salud mental se consideran datos especiales (Art. 9 RGPD)
   - Requieren protección adicional
   - Se necesita consentimiento explícito y específico

2. **Información sobre Confidencialidad**
   - Deben informar que los datos son confidenciales
   - Deben explicar que no son diagnósticos médicos

3. **Restricción de Compartir Datos**
   - No pueden venderse datos de salud a terceros
   - No pueden usarse para perfilado discriminatorio
   - No pueden usarse con fines publicitarios dirigidos

**Aviso en MindCare:**
```
⚠️ IMPORTANTE: MindCare es una herramienta de apoyo para el bienestar mental.
   No reemplaza la atención médica profesional. Si experimentas crisis mental,
   contacta a un profesional de salud mental o a servicios de emergencia.
```

#### Implementación

- ✅ Banner de aviso en página de registro
- ✅ Aviso en la política de privacidad sobre naturaleza sensible de datos
- ✅ Información clara que no es un servicio médico
- ✅ Enlaces a recursos de ayuda profesional

---

### Políticas de Cookies

#### ¿Qué son?
Las cookies son pequeños archivos que se almacenan en el navegador del usuario. Las regulaciones requieren:

1. **Consentimiento previo** para cookies no esenciales
2. **Banner informativo** sobre qué cookies se usan
3. **Opción de rechazar** cookies de seguimiento

#### Clasificación de Cookies en MindCare

| Tipo | Nombre | Propósito | Consentimiento Requerido |
|------|--------|----------|---------------------------|
| **Técnica** | `session_id`, `jwt_token` | Mantener sesión del usuario | No (esencial) |
| **Técnica** | `csrf_token` | Protección contra CSRF | No (esencial) |
| **Analytics** | `_ga`, `_gid` | Google Analytics (opcional) | Sí |
| **Preferencias** | `theme`, `language` | Guardar preferencias de usuario | No (esencial) |

#### Implementación Técnica

##### 1. **Banner de Cookies**
- Mostrar en primer acceso
- Opciones: Aceptar todo, Rechazar, Personalizar
- Guardar preferencia en localStorage
- Respetar "Do Not Track" del navegador

**Componente React de ejemplo:**
```jsx
// components/CookieConsent.jsx
import React, { useEffect, useState } from 'react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setShowBanner(true);
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieAnalytics', 'true');
    // Inicializar Google Analytics
    initGoogleAnalytics();
    setShowBanner(false);
  };
  
  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieAnalytics', 'false');
    setShowBanner(false);
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="cookie-banner">
      <p>Utilizamos cookies para mejorar tu experiencia. 
         <a href="/legal/cookies">Leer política de cookies</a>
      </p>
      <button onClick={handleReject}>Rechazar</button>
      <button onClick={handleAccept}>Aceptar</button>
    </div>
  );
}
```

##### 2. **Página de Política de Cookies**
- Ubicación: `/legal/cookies`
- Información clara sobre cada cookie
- Cómo cambiar preferencias
- Enlace para ver/eliminar cookies

---

### Términos de Servicio y Condiciones de Uso

#### Contenido Obligatorio

| Sección | Descripción |
|---------|-------------|
| **Identificación** | Quién proporciona el servicio (MindCare Team) |
| **Descripción del Servicio** | Qué es MindCare y qué funcionalidades ofrece |
| **Responsabilidades del Usuario** | Qué puede y no puede hacer el usuario |
| **Limitaciones de Responsabilidad** | Qué no garantiza MindCare (ej: no es diagnóstico médico) |
| **Propiedad Intelectual** | Quién es dueño del contenido (usuario vs. plataforma) |
| **Prohibiciones** | Conductas prohibidas (spam, contenido ilegal, etc.) |
| **Suspensión de Cuenta** | Causas por las que se puede cerrar una cuenta |
| **Leyes Aplicables** | Jurisdicción (España) |

#### Política Específica para MindCare

```
1. ACEPTACIÓN DE TÉRMINOS
   - Al registrarse, el usuario acepta estos términos
   - Si no acepta, no puede usar el servicio

2. NATURALEZA DEL SERVICIO
   - MindCare es una herramienta de apoyo, no diagnóstica
   - No sustituye atención médica profesional
   - El usuario es responsable de buscar ayuda profesional si es necesario

3. CONTENIDO GENERADO POR USUARIOS
   - El usuario retiene la propiedad de sus datos (diarios, emociones)
   - MindCare puede usar datos anonimizados para mejorar el servicio
   - El usuario acepta que sus datos se guarden de forma segura

4. CONDUCTAS PROHIBIDAS
   - No compartir credenciales con otros usuarios
   - No intentar acceder a cuentas de otros usuarios
   - No subir contenido ilegal o que incite a la violencia
   - No usar bots o scripts para automatizar acceso

5. SUSPENSIÓN Y TERMINACIÓN
   - MindCare puede suspender cuentas que violen estos términos
   - El usuario puede eliminar su cuenta en cualquier momento
   - Al eliminar la cuenta, todos los datos se borran (salvo obligación legal)

6. LIMITACIÓN DE RESPONSABILIDAD
   - MindCare no es responsable de diagnósticos incorrectos
   - MindCare no es responsable de pérdida de datos por culpa del usuario
   - MindCare no es responsable de interrupciones del servicio
```

---

### Accesibilidad Web (WCAG 2.1)

#### ¿Por Qué es Importante?
En muchos países europeos, incluida España, los sitios web públicos y de empresas deben cumplir criterios de accesibilidad (WCAG 2.1, nivel AA como mínimo).

#### Requisitos de MindCare (Nivel AA)

| Criterio | Descripción | Estado en MindCare |
|----------|-------------|-------------------|
| **Contraste de Colores** | Ratio 4.5:1 para texto pequeño, 3:1 para texto grande | ✅ Verificado |
| **Navegación por Teclado** | Todas las funciones accesibles sin ratón | ✅ React + HTML semántico |
| **Etiquetas alt en Imágenes** | Descripción de todas las imágenes | ⚠️ En proceso |
| **Estructura Semántica** | Uso correcto de HTML5 (h1, h2, nav, main, etc.) | ✅ Implementado |
| **Compatibilidad con Lectores de Pantalla** | Funciona con NVDA, JAWS, etc. | ✅ ARIA labels |
| **Formularios Accesibles** | Labels asociados a inputs, mensajes de error claros | ✅ Material-UI |
| **Animaciones Respetables** | Respetar preferencia "prefers-reduced-motion" | ⚠️ Framer Motion |
| **Tamaño de Texto** | Permitir zoom hasta 200% sin pérdida funcionalidad | ✅ CSS responsive |

#### Implementación Técnica

##### 1. **HTML Semántico**
```jsx
// ✅ Correcto
<header>
  <nav>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/diario">Diario</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título Principal</h1>
    <p>Contenido...</p>
  </article>
</main>

<footer>
  <p>Pie de página</p>
</footer>
```

##### 2. **Etiquetas alt en Imágenes**
```jsx
// ✅ Correcto
<img 
  src="/emotion-happy.svg" 
  alt="Ícono de cara feliz para seleccionar emoción feliz"
/>

// ❌ Incorrecto
<img src="/emotion-happy.svg" alt="Icono" />
<img src="/emotion-happy.svg" /> {/* Sin alt */}
```

##### 3. **Formularios Accesibles**
```jsx
// ✅ Correcto
<form>
  <label htmlFor="email">Email:</label>
  <input 
    id="email" 
    type="email" 
    required
    aria-invalid={hasError}
    aria-describedby="email-error"
  />
  {hasError && <span id="email-error" role="alert">Email inválido</span>}
</form>
```

##### 4. **Colores de Contraste**
```css
/* ✅ Correcto: Ratio 4.5:1 */
body {
  color: #212121; /* Gris oscuro */
  background: #ffffff; /* Blanco */
  /* Ratio: 12.6:1 */
}

/* ❌ Incorrecto: Ratio bajo */
body {
  color: #757575; /* Gris claro */
  background: #f5f5f5; /* Gris muy claro */
  /* Ratio: 1.5:1 - Insuficiente */
}
```

##### 5. **Respetar Preferencia de Movimiento Reducido**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

### Propiedad Intelectual y Licencias

#### Recursos Utilizados en MindCare

| Recurso | Fuente | Licencia | Verificación |
|---------|--------|---------|--------------|
| **React** | facebook/react | MIT | ✅ Libre |
| **Material-UI** | mui/material-ui | MIT | ✅ Libre |
| **Axios** | axios/axios | MIT | ✅ Libre |
| **Express.js** | expressjs/express | MIT | ✅ Libre |
| **MongoDB** | mongodb | SSPL | ✅ Libre para desarrollo |
| **Framer Motion** | framer/motion | MIT | ✅ Libre |
| **Iconos** | Font Awesome / Material Icons | Free (CC) | ✅ Libre |
| **Fuentes** | Google Fonts | OFL | ✅ Libre |
| **Grok AI API** | xAI | Comercial | ⚠️ Verificar términos |

#### Declaración de Propiedad Intelectual

```
**MindCare** es un proyecto desarrollado por el Grupo 7 de DAW2 
para propósitos educativos.

- El código fuente es propiedad del Grupo 7
- Disponible bajo licencia MIT (código abierto)
- Los usuarios retienen la propiedad de sus datos (diarios, emociones)
- MindCare retiene derechos sobre la interfaz, logo y marca
- El contenido generado por usuarios no puede ser comercializado 
  sin consentimiento del usuario

Dependencias:
- Todas las librerías utilizadas tienen licencias de software libre (MIT, Apache 2.0, etc.)
- No hay conflictos de licencias conocidos
```

#### Verificación de Licencias

```bash
# Verificar licencias de dependencias en package.json
npm list --depth=0 | grep -i license

# O usar herramienta especializada
npm install -g license-checker
license-checker --markdown
```

---

## Plan de Implementación Técnica

### Fase 1: Páginas Legales (Sprint 6)

#### 1.1 Crear Ruta `/legal/privacidad`

**Archivo:** `frontend/src/pages/Legal/Privacy.jsx`

Contenido:
- Política de Privacidad completa
- Datos que se recogen
- Cómo se usan
- Derechos de usuarios
- Contacto para solicitudes

#### 1.2 Crear Ruta `/legal/cookies`

**Archivo:** `frontend/src/pages/Legal/Cookies.jsx`

Contenido:
- Explicación de cookies
- Tabla de cookies usadas
- Cómo cambiar preferencias
- Gestión técnica

#### 1.3 Crear Ruta `/legal/terminos`

**Archivo:** `frontend/src/pages/Legal/Terms.jsx`

Contenido:
- Términos de servicio
- Prohibiciones
- Responsabilidades
- Derecho a suspensión

#### 1.4 Implementar Banner de Cookies

**Archivo:** `frontend/src/components/molecules/CookieConsent.jsx`

Funcionalidad:
- Mostrar en primer acceso
- Guardar decisión en localStorage
- Permitir cambiar preferencias
- No mostrar de nuevo si ya decidió

### Fase 2: Endpoints de Gestión de Datos (Sprint 5/6)

#### 2.1 Endpoint: Ver Mis Datos

```
GET /api/usuarios/mis-datos
Authorization: Bearer <token>

Respuesta:
{
  "usuario": { ... },
  "registros": [ ... ],
  "diarios": [ ... ]
}
```

**Archivo:** `backend/src/controllers/usuarios.controller.js`

#### 2.2 Endpoint: Exportar Datos (JSON)

```
GET /api/usuarios/exportar-datos
Authorization: Bearer <token>

Respuesta: Archivo JSON descargable
```

#### 2.3 Endpoint: Solicitar Supresión de Cuenta

```
DELETE /api/usuarios/:id
Authorization: Bearer <token>
Body: { confirmacion: "ELIMINAR" }

Respuesta:
{
  "mensaje": "Verificación enviada a tu email. Tienes 7 días para confirmar."
}
```

**Lógica:**
1. Usuario solicita supresión
2. Se envía email de confirmación
3. Usuario tiene 7 días para confirmar
4. Pasados 7 días, se borra la cuenta
5. Se registra en log de auditoría

### Fase 3: Configuración de Seguridad

#### 3.1 Variables de Entorno Críticas

```
# .env
JWT_SECRET=<secreto_largo_aleatorio>
BCRYPT_ROUNDS=10
MONGODB_URI=<uri_mongoDB>
NODE_ENV=production
HTTPS=true
SECURE_COOKIES=true
SAME_SITE_COOKIES=Strict
```

#### 3.2 Headers de Seguridad

```javascript
// backend/src/app.js
app.use(helmet()); // Añade headers de seguridad
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

#### 3.3 Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});

app.use('/api/', limiter);
```

---

## Políticas Legales

### Política de Privacidad (Borrador)

**Ubicación:** `/legal/privacidad`

```markdown
# Política de Privacidad - MindCare

## 1. Responsable del Tratamiento
Grupo 7 - DAW2
Proyecto educativo

## 2. Datos que Recogemos
- Email y nombre de usuario (registro)
- Emociones diarias (entrada de diario)
- Entradas de diario personal
- Fecha y hora de acceso

## 3. Base Legal
Artículo 6.1.a RGPD: Consentimiento del usuario
Artículo 9.2.a RGPD: Consentimiento explícito para datos de salud

## 4. Derechos de los Usuarios
- Derecho de acceso
- Derecho de rectificación
- Derecho de supresión
- Derecho de portabilidad
- Derecho a no ser perfilado

## 5. Plazo de Conservación
Los datos se conservan mientras el usuario tenga la cuenta activa.
Tras solicitar eliminación: 30 días para confirmación, luego eliminación completa.

## 6. Contacto
Para ejercer derechos: grupo7@mindcare.es
```

### Política de Cookies (Borrador)

**Ubicación:** `/legal/cookies`

```markdown
# Política de Cookies - MindCare

## Cookies Técnicas (Esenciales)
- session_id: Mantiene la sesión activa
- jwt_token: Autenticación del usuario

## Cookies Opcionales
- _ga: Google Analytics (si el usuario acepta)
- theme: Preferencia de tema oscuro/claro

## Cómo Cambiar Preferencias
El usuario puede cambiar sus preferencias en: Menú > Configuración > Privacidad
```

### Términos de Servicio (Borrador)

**Ubicación:** `/legal/terminos`

```markdown
# Términos de Servicio - MindCare

## 1. Aceptación
Al usar MindCare, aceptas estos términos...

## 2. Naturaleza del Servicio
MindCare es una herramienta de apoyo para la salud mental.
NO es un servicio médico. En caso de crisis, contacta a emergencias.

## 3. Prohibiciones
- No compartir credenciales
- No intentar acceder a otras cuentas
- No subir contenido ilegal

## 4. Responsabilidad
MindCare no es responsable de diagnósticos incorrectos.
Úsalo como complemento, no como sustituto de atención profesional.
```

---

## Monitorización y Auditoría

### Logs de Auditoría

Registrar y revisar regularmente:

```javascript
// backend/src/utils/auditLog.js
const auditLog = async (userId, action, details) => {
  const log = {
    timestamp: new Date(),
    userId,
    action, // 'LOGIN', 'DELETE_ACCOUNT', 'VIEW_DATA', etc.
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    details
  };
  
  // Guardar en MongoDB
  await AuditLog.create(log);
};

// Ejemplo de uso
auditLog(user.id, 'DELETE_ACCOUNT', { razon: 'Usuario solicitó eliminación' });
```

### Revisión Periódica

- **Mensual:** Revisar logs de accesos anómalos
- **Trimestral:** Auditoría de permisos y accesos
- **Anual:** Evaluación de Impacto de Privacidad (EIPD)

---

## Responsables de Cumplimiento

| Rol | Responsable | Tareas |
|-----|-------------|--------|
| **Responsable de Privacidad** | Adrián Díaz | Velar por cumplimiento RGPD, gestionar solicitudes de datos |
| **Responsable de Seguridad** | Adrián Díaz | Mantener seguridad de datos, cifrado, auditoría |
| **Responsable de Accesibilidad** | Rocío Luque | Verificar WCAG 2.1, testing con herramientas de accesibilidad |
| **Responsable de Propiedad Intelectual** | José Antonio Díaz | Verificar licencias de dependencias, documentación |

---

## Checklist de Cumplimiento

Antes de publicar MindCare en producción:

- [ ] Política de Privacidad publicada en `/legal/privacidad`
- [ ] Política de Cookies publicada en `/legal/cookies`
- [ ] Términos de Servicio publicados en `/legal/terminos`
- [ ] Banner de cookies funcional en página principal
- [ ] Checkbox de aceptación de privacidad en registro obligatorio
- [ ] Endpoints de gestión de datos implementados:
  - [ ] GET /api/usuarios/mis-datos
  - [ ] GET /api/usuarios/exportar-datos
  - [ ] DELETE /api/usuarios/:id (con confirmación por email)
- [ ] HTTPS configurado en servidor
- [ ] JWT con expiración implementado
- [ ] bcrypt en contraseñas (10 rounds)
- [ ] Validación de entrada en todos los formularios
- [ ] Rate limiting configurado
- [ ] Logs de auditoría implementados
- [ ] WCAG 2.1 Level AA verificado
- [ ] Contraste de colores revisado (4.5:1)
- [ ] Etiquetas alt en todas las imágenes
- [ ] Formularios con labels y aria-describedby
- [ ] Test con lector de pantalla (NVDA/JAWS)
- [ ] Dependencias con licencias compatibles

---

## Referencias y Recursos

### Documentos Legales Oficiales

- [RGPD Oficial](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679)
- [LOreg 3/2018](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)
- [Autoridad de Protección de Datos - España](https://www.aepd.es/)

### Estándares de Accesibilidad

- [WCAG 2.1 Oficial](https://www.w3.org/WAI/WCAG21/quickref/)
- [Guía de Accesibilidad Web](https://www.w3.org/WAI/)

### Herramientas de Verificación

- **Accesibilidad:** axe DevTools, Lighthouse, WAVE
- **Contraste:** WebAIM Contrast Checker
- **Seguridad:** OWASP ZAP, SonarQube
- **Licencias:** license-checker, FOSSA

---

## Conclusiones

MindCare debe cumplir con regulaciones rigurosas de protección de datos debido a la naturaleza sensible de los datos que recopila (información de salud mental). Este documento establece un marco completo para:

1. **Proteger los derechos** de los usuarios sobre sus datos
2. **Cumplir con la ley** española y europea
3. **Asegurar la accesibilidad** para todos los usuarios
4. **Mantener la transparencia** sobre cómo se usan los datos
5. **Garantizar la seguridad** técnica de la información

La implementación de estas medidas no es solo un requisito legal, sino también una práctica ética esencial para construir confianza con los usuarios.

---

**Última actualización:** Diciembre 2025  
**Responsable del documento:** Adrián Díaz Angulo (Responsable de Privacidad)  
**Próxima revisión:** Junio 2026

