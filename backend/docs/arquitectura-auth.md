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

