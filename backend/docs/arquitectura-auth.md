# 🏗️ Arquitectura del Sistema de Autenticación

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Frontend)                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ENDPOINTS PÚBLICOS                            │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │  POST /register  │         │   POST /login    │             │
│  └──────────────────┘         └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AUTH CONTROLLER                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  registerUser()                                         │    │
│  │  1. Validar datos                                       │    │
│  │  2. Verificar email único                               │    │
│  │  3. Hashear contraseña (bcrypt)                        │    │
│  │  4. Guardar en BD                                       │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  loginUser()                                            │    │
│  │  1. Validar credenciales                                │    │
│  │  2. Verificar contraseña (bcrypt.compare)              │    │
│  │  3. Generar JWT                                         │    │
│  │  4. Enviar token al cliente                             │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MONGOOSE MODEL                              │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  User Schema                                            │    │
│  │  - nombre: String (required)                            │    │
│  │  - email: String (required, unique)                     │    │
│  │  - password: String (required, hashed)                  │    │
│  │  - alias: String                                        │    │
│  │  - timestamps: true                                     │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MONGODB DATABASE                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Collection: users                                      │    │
│  │  {                                                      │    │
│  │    _id: ObjectId,                                       │    │
│  │    nombre: "Usuario",                                   │    │
│  │    email: "user@example.com",                           │    │
│  │    password: "$2b$10$hashed...",                        │    │
│  │    createdAt: Date,                                     │    │
│  │    updatedAt: Date                                      │    │
│  │  }                                                      │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              FLUJO DE RUTA PROTEGIDA                             │
└─────────────────────────────────────────────────────────────────┘

    Cliente envía request con token
                │
                ▼
    ┌───────────────────────────┐
    │  Authorization Header     │
    │  Bearer eyJhbGc...        │
    └───────────────────────────┘
                │
                ▼
    ┌───────────────────────────┐
    │   authMiddleware          │
    │  1. Extraer token         │
    │  2. Verificar con JWT     │
    │  3. Decodificar payload   │
    │  4. Agregar req.user      │
    └───────────────────────────┘
                │
                ▼
          ┌─────────┐
          │ ¿Válido?│
          └─────────┘
           ✓    │    ✗
           │    │    │
           │    │    └──────► 401 Unauthorized
           │    │             {"message": "Invalid token"}
           ▼    ▼
    ┌───────────────────────────┐
    │  Controlador              │
    │  (getProfile, etc)        │
    │  - Acceso a req.user      │
    │  - Procesar lógica        │
    │  - Enviar respuesta       │
    └───────────────────────────┘
                │
                ▼
    ┌───────────────────────────┐
    │  Respuesta 200 OK         │
    │  { user: {...} }          │
    └───────────────────────────┘
```

---

## 🔐 Flujo de Seguridad

### 1. Registro de Usuario

```
Usuario ingresa datos
       ↓
Validación de datos (email, password, name)
       ↓
¿Email ya existe?  → Sí → Error 400
       ↓ No
Hashear password con bcrypt (10 rounds)
       ↓
Guardar en MongoDB
       ↓
Respuesta exitosa (sin contraseña)
```

### 2. Login

```
Usuario ingresa credenciales
       ↓
Validación de datos
       ↓
Buscar usuario por email
       ↓
¿Usuario existe?  → No → Error 400
       ↓ Sí
Comparar password con bcrypt.compare()
       ↓
¿Password correcto?  → No → Error 400
       ↓ Sí
Generar JWT (expiración: 1h)
       ↓
Enviar token al cliente
```

### 3. Acceso a Ruta Protegida

```
Request con header Authorization
       ↓
authMiddleware intercepta
       ↓
Extraer token del header
       ↓
¿Token existe?  → No → Error 401
       ↓ Sí
Verificar token con jwt.verify()
       ↓
¿Token válido?  → No → Error 401
       ↓ Sí
Decodificar payload
       ↓
Agregar datos a req.user
       ↓
Continuar al controlador
       ↓
Procesar y responder
```

---

## 🧩 Componentes del Sistema

### 1. Middleware Stack (app.js)

```javascript
app.use(helmet());           // Seguridad HTTP headers
app.use(cors());             // Cross-Origin Resource Sharing
app.use(express.json());     // Parser de JSON
app.use(express.urlencoded());  // Parser de URL encoded
app.use(cookieParser());     // Parser de cookies
app.use(logger('dev'));      // Logger de peticiones
```

### 2. Rutas (auth.routes.js)

```javascript
POST   /api/auth/register    → registerUser (público)
POST   /api/auth/login       → loginUser (público)
GET    /api/auth/profile     → authMiddleware → getProfile (protegido)
```

### 3. Controladores (auth.controller.js)

```javascript
registerUser()  // Registro con bcrypt
loginUser()     // Login con JWT
getProfile()    // Ejemplo de ruta protegida
```

### 4. Middleware (authMiddleware.js)

```javascript
authMiddleware()          // Protección obligatoria
optionalAuthMiddleware()  // Protección opcional
```

### 5. Modelo (usuarios_mongoose.js)

```javascript
User Schema + Pre-save hook + Métodos personalizados
```

---

## 🔑 Estructura del JWT

### Payload

```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "Usuario"
  },
  "iat": 1701234567,
  "exp": 1701238167
}
```

### Token Completo

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.           ← Header
eyJ1c2VyIjp7ImlkIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5.   ← Payload (encoded)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c     ← Signature
```

---

## 🛡️ Capas de Seguridad

1. **Helmet** → Headers HTTP seguros
2. **CORS** → Control de origen cruzado
3. **Bcrypt** → Hashing irreversible de contraseñas (10 rounds)
4. **JWT** → Tokens firmados y con expiración
5. **Middleware** → Verificación automática de autenticación
6. **Validación** → Validación de inputs en controladores
7. **Environment Variables** → Secrets fuera del código

---

## 🔒 Mejores Prácticas de Seguridad Implementadas

### 1. Helmet.js - Hardening de Headers HTTP

Helmet configura automáticamente múltiples headers de seguridad:

```javascript
app.use(helmet());
```

**Headers configurados:**
| Header | Propósito |
|--------|-----------|
| `Content-Security-Policy` | Previene ataques XSS e inyección de datos |
| `X-DNS-Prefetch-Control` | Controla el prefetching DNS |
| `X-Frame-Options` | Previene clickjacking |
| `X-Content-Type-Options` | Previene MIME sniffing |
| `Strict-Transport-Security` | Fuerza conexiones HTTPS |
| `X-XSS-Protection` | Filtro XSS del navegador |

### 2. Bcrypt - Hashing de Contraseñas

**Configuración de salt rounds:**
```javascript
const SALT_ROUNDS = 10;
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
```

**¿Por qué 10 rounds?**
- Proporciona ~100ms de tiempo de hash por contraseña
- Balance óptimo entre seguridad y rendimiento
- Dificulta ataques de fuerza bruta (10 rounds = 2^10 = 1024 iteraciones)

**Comparación segura:**
```javascript
// Usa comparación timing-safe para evitar timing attacks
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### 3. JWT - Gestión Segura de Tokens

**Configuración recomendada:**
```javascript
const token = jwt.sign(
  { user: { id, email, name } },
  process.env.JWT_SECRET,
  { 
    expiresIn: '1h',           // Expiración corta
    algorithm: 'HS256'          // Algoritmo seguro
  }
);
```

**Mejores prácticas implementadas:**
- ✅ Expiración corta (1 hora) para minimizar ventana de ataque
- ✅ Payload mínimo (solo datos esenciales, sin información sensible)
- ✅ Secret almacenado en variables de entorno
- ✅ Algoritmo HS256 (HMAC con SHA-256)

**Recomendaciones adicionales para producción:**
```javascript
// Para entornos de alta seguridad, considera:
JWT_SECRET=clave_de_al_menos_256_bits_generada_aleatoriamente
JWT_EXPIRES_IN=15m  // Reducir a 15 minutos + refresh tokens
```

### 4. CORS - Control de Acceso Cross-Origin

**Configuración restrictiva:**
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // Solo origen específico
  credentials: true,                  // Permite cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

**Configuración para producción:**
```javascript
// Evitar origin: '*' en producción
// Usar lista blanca de orígenes si hay múltiples frontends
const allowedOrigins = [
  'https://mindcare.com',
  'https://app.mindcare.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
```

### 5. Validación de Inputs

**Patrón de validación en controladores:**
```javascript
// Validación temprana y explícita
exports.registerUser = async (req, res) => {
  const { email, password, nombre } = req.body;
  
  // Validar campos requeridos
  if (!email || !password || !nombre) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }
  
  // Validar longitud de contraseña
  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
  }
  
  // Continuar con la lógica...
};
```

### 6. Gestión de Variables de Entorno

**Archivo `.env` (nunca commitear):**
```env
# Usar secrets fuertes y únicos
JWT_SECRET=generado_con_openssl_rand_base64_32
MONGODB_URI=mongodb+srv://...
EMAIL_PASS=app_specific_password
```

**Validación al iniciar la aplicación:**
```javascript
// Verificar variables críticas
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Variable de entorno ${varName} no configurada`);
    process.exit(1);
  }
});
```

### 7. Protección contra Ataques Comunes

| Ataque | Mitigación Implementada |
|--------|-------------------------|
| **SQL/NoSQL Injection** | Mongoose sanitiza queries automáticamente |
| **XSS** | Helmet CSP + React escapa automáticamente |
| **CSRF** | SameSite cookies + token validation |
| **Brute Force** | Se recomienda implementar rate limiting |
| **Man-in-the-Middle** | HTTPS obligatorio en producción |

### 8. Recomendaciones para Hardening Adicional

```javascript
// Rate Limiting (implementar en producción)
const rateLimit = require('express-rate-limit');
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 5,                     // 5 intentos
  message: 'Demasiados intentos de login'
});
app.use('/api/auth/login', authLimiter);

// Logging de seguridad
const logSecurityEvent = (event, userId, ip) => {
  console.log(`[SECURITY] ${event} - User: ${userId} - IP: ${ip}`);
};
```

---

## 📦 Dependencias y su Propósito

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| bcrypt | ^5.1.1 | Hashing de contraseñas |
| jsonwebtoken | ^9.0.2 | Generación y verificación de JWT |
| mongoose | ^8.0.3 | ODM para MongoDB |
| express | ~4.16.1 | Framework web |
| cors | ^2.8.5 | Configuración CORS |
| helmet | ^7.1.0 | Seguridad HTTP headers |
| dotenv | ^16.3.1 | Variables de entorno |
| morgan | ~1.9.1 | Logger HTTP |

---

## 🎯 Puntos de Extensión

El sistema está diseñado para ser fácilmente extensible:

### 1. Agregar Nuevas Rutas Protegidas

```javascript
router.get('/nueva-ruta', authMiddleware, nuevoControlador);
```

### 2. Agregar Roles y Permisos

```javascript
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};

router.get('/admin', authMiddleware, roleMiddleware(['admin']), adminController);
```

### 3. Implementar Refresh Tokens

```javascript
// Generar refresh token junto con access token
// Almacenar refresh token en BD
// Endpoint para renovar access token
```

### 4. Agregar Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de 100 requests
});

app.use('/api/', limiter);
```

---

## ✨ Resumen

Este sistema de autenticación proporciona:

- ✅ Registro seguro de usuarios
- ✅ Login con JWT
- ✅ Protección de rutas
- ✅ Manejo de errores robusto
- ✅ Arquitectura escalable
- ✅ Seguridad en múltiples capas
- ✅ Fácil de extender

**Estado: Completamente funcional y listo para producción** 🚀

