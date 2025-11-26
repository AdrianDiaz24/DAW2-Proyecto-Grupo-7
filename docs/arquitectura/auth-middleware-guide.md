# Middleware de Autenticación

Este documento explica cómo usar el middleware de autenticación (`authMiddleware.js`) en el proyecto.

## Descripción

El `authMiddleware` es un middleware de protección que verifica la validez de los tokens JWT antes de permitir el acceso a rutas protegidas.

## Funcionalidades

### 1. authMiddleware (Requerido)
- **Propósito**: Proteger rutas que requieren autenticación obligatoria
- **Comportamiento**: 
  - Verifica que exista un token en el header `Authorization`
  - Valida que el token sea válido y no haya expirado
  - Rechaza la petición si no hay token o es inválido (401 Unauthorized)
  - Agrega los datos del usuario a `req.user` si el token es válido

### 2. optionalAuthMiddleware (Opcional)
- **Propósito**: Para rutas que pueden funcionar con o sin autenticación
- **Comportamiento**:
  - Si hay token válido, agrega los datos a `req.user`
  - Si no hay token o es inválido, continúa con `req.user = null`
  - No rechaza la petición

## Uso en Rutas

### Ejemplo 1: Ruta protegida (requiere autenticación)

```javascript
const { Router } = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/user.controller');

const router = Router();

// Ruta protegida - solo usuarios autenticados
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
```

### Ejemplo 2: Ruta con autenticación opcional

```javascript
const { Router } = require('express');
const { optionalAuthMiddleware } = require('../middleware/authMiddleware');
const { getPosts } = require('../controllers/posts.controller');

const router = Router();

// Ruta que puede funcionar con o sin autenticación
// Si el usuario está autenticado, puede ver posts privados
router.get('/posts', optionalAuthMiddleware, getPosts);

module.exports = router;
```

### Ejemplo 3: Proteger múltiples rutas

```javascript
const { Router } = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

// Todas las rutas después de esta línea requieren autenticación
router.use(authMiddleware);

router.get('/dashboard', getDashboard);
router.post('/data', createData);
router.put('/settings', updateSettings);

module.exports = router;
```

## Formato del Token

El token debe enviarse en el header `Authorization` con uno de estos formatos:

### Formato 1: Bearer Token (Recomendado)
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Formato 2: Token directo
```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Ejemplo de Uso desde el Frontend

### Con Fetch API
```javascript
// Obtener el token (ejemplo: desde localStorage)
const token = localStorage.getItem('token');

// Hacer petición a ruta protegida
fetch('http://localhost:3000/api/auth/profile', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Con Axios
```javascript
import axios from 'axios';

// Configurar axios con el token
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Hacer petición
axios.get('http://localhost:3000/api/auth/profile')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
```

## Respuestas de Error

### Sin token (401)
```json
{
    "message": "No token provided, authorization denied"
}
```

### Token inválido (401)
```json
{
    "message": "Invalid token"
}
```

### Token expirado (401)
```json
{
    "message": "Token has expired"
}
```

### Error del servidor (500)
```json
{
    "message": "Server error during authentication",
    "error": "detalles del error"
}
```

## Datos Disponibles en req.user

Cuando el middleware valida exitosamente el token, agrega los siguientes datos a `req.user`:

```javascript
req.user = {
    id: "userId",
    email: "user@example.com",
    name: "User Name"
}
```

Estos datos pueden ser utilizados en los controladores:

```javascript
const getProfile = async (req, res) => {
    // Acceder a los datos del usuario autenticado
    const userId = req.user.id;
    const userEmail = req.user.email;
    
    // Usar los datos...
    const user = await User.findById(userId);
    res.json({ user });
};
```

## Configuración Requerida

Asegúrate de tener la variable de entorno `JWT_SECRET` configurada en tu archivo `.env`:

```env
JWT_SECRET=tu_secreto_super_seguro_aqui
```

## Ejemplo de Implementación Completa

Archivo: `src/routes/auth.routes.js`
```javascript
const { Router } = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas protegidas
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
```

## Testing con Postman/Thunder Client

### 1. Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

**Respuesta**: Recibirás un token
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Acceder a ruta protegida
```
GET http://localhost:3000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa**:
```json
{
    "user": {
        "_id": "userId",
        "nombre": "User Name",
        "email": "user@example.com",
        "alias": "",
        "createdAt": "2025-11-26T...",
        "updatedAt": "2025-11-26T..."
    }
}
```

