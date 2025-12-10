# Backend - API de Autenticación

## 📋 Descripción

API RESTful con autenticación JWT y configuración CORS para integración con el frontend.

## 🎯 Características

- ✅ Autenticación JWT (JSON Web Tokens)
- ✅ Registro y login de usuarios
- ✅ Protección de rutas sensibles
- ✅ **CORS configurado** para integración con frontend
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Manejo de errores detallado
- ✅ Compatible con formato Bearer Token

## 🌐 Configuración CORS

El backend está configurado con CORS para permitir peticiones desde el frontend.

**Configuración actual:**
- **Origin permitido:** Configurable via `FRONTEND_URL` en `.env` (por defecto: `http://localhost:3001`)
- **Credentials:** Habilitado (soporta cookies y headers de autenticación)

**Pasos importantes:**
1. Verifica en qué puerto corre tu frontend
2. Actualiza `FRONTEND_URL` en `backend/.env` con ese puerto
3. Reinicia el backend después de cambiar `.env`

**Documentación completa de CORS:** Ver [../docs/cors-configuration.md](../docs/cors-configuration.md)

## 🏗️ Arquitectura

Para comprender en profundidad cómo funciona el sistema de autenticación y la estructura del backend, consulta la documentación de arquitectura:

- **[Arquitectura del Sistema de Autenticación](docs/arquitectura-auth.md)** - Diagramas de flujo detallados del sistema de autenticación, incluyendo registro, login, generación de JWT y protección de rutas
- **[Guía del Middleware de Autenticación](docs/auth-middleware-guide.md)** - Documentación técnica sobre cómo utilizar el middleware de autenticación (`authMiddleware` y `optionalAuthMiddleware`) en las rutas del proyecto

Esta documentación es especialmente útil para:
- Desarrolladores que se incorporen al proyecto
- Entender el flujo completo de autenticación
- Implementar nuevas rutas protegidas
- Debugging de problemas de autenticación

## 📦 Archivos Creados

```
backend/
├── src/
│   ├── middleware/
│   │   └── authMiddleware.js          # Middleware principal
│   ├── controllers/
│   │   └── auth.controller.js         # Actualizado con getProfile
│   └── routes/
│       └── auth.routes.js             # Actualizado con ruta protegida
├── .env.example                       # Variables de entorno de ejemplo
└── package.json                       # Dependencias actualizadas
```

## 🚀 Uso Rápido

### 1. Proteger una ruta

```javascript
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Ruta protegida', user: req.user });
});
```

### 2. Autenticación opcional

```javascript
const { optionalAuthMiddleware } = require('../middleware/authMiddleware');

router.get('/public', optionalAuthMiddleware, (req, res) => {
    if (req.user) {
        res.json({ message: 'Usuario autenticado', user: req.user });
    } else {
        res.json({ message: 'Usuario anónimo' });
    }
});
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en el directorio `backend/` con:

```env
JWT_SECRET=tu_secreto_super_seguro_aqui
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
PORT=3000
NODE_ENV=development
```

### Instalación de Dependencias

```bash
cd backend
npm install
```

Dependencias instaladas:
- `bcrypt`: ^5.1.1 - Para hashear contraseñas
- `jsonwebtoken`: ^9.0.2 - Para generar y verificar JWT
- `mongoose`: ^8.0.3 - ODM para MongoDB
- `cors`: ^2.8.5 - Para CORS
- `helmet`: ^7.1.0 - Para seguridad HTTP
- `dotenv`: ^16.3.1 - Para variables de entorno

## 🧪 Testing

### 1. Registrar un usuario

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
}
```

### 2. Login

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}
```

**Respuesta**: Guardar el token recibido
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Acceder a ruta protegida

```bash
GET http://localhost:3000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 Documentación Completa

Para más información sobre el uso del middleware de autenticación, consulta la [sección de Arquitectura](#-arquitectura) en este documento.

## 🛡️ Seguridad

- Los tokens expiran en 1 hora
- Las contraseñas se hashean con bcrypt (salt rounds: 10)
- Helmet configurado para headers de seguridad
- CORS habilitado

## ⚠️ Notas Importantes

1. **Nunca** compartas tu `JWT_SECRET` en repositorios públicos
2. Usa contraseñas seguras en producción
3. Configura CORS adecuadamente para producción
4. Considera aumentar la seguridad del JWT_SECRET en producción (más caracteres)

## 🐛 Solución de Problemas

### Error: "No token provided"
- Verifica que envías el header `Authorization`
- Formato correcto: `Bearer <token>`

### Error: "Invalid token"
- El token puede estar malformado
- Verifica que copiaste el token completo

### Error: "Token has expired"
- Genera un nuevo token haciendo login nuevamente
- Considera aumentar el tiempo de expiración si es necesario

### Error: MODULE_NOT_FOUND
- Ejecuta `npm install` en el directorio backend
- Verifica que todas las dependencias estén instaladas

## 🔄 Próximos Pasos

- [ ] Implementar refresh tokens
- [ ] Agregar roles y permisos
- [ ] Implementar rate limiting
- [ ] Agregar logs de auditoría
- [ ] Implementar blacklist de tokens

## 📞 Soporte

Para más información, consulta la documentación del proyecto o contacta al equipo de desarrollo.

## ✅ Checklist de Implementación

- [x] Configurar middlewares base (cors, express.json, helmet) en app.js
- [x] Implementar controlador registerUser
- [x] Implementar hasheado de contraseña con bcrypt
- [x] Crear ruta POST /api/auth/register
- [x] Implementar controlador loginUser
- [x] Generar JWT en login
- [x] Crear ruta POST /api/auth/login
- [x] **Crear middleware authMiddleware.js**
- [x] Implementar ruta protegida de ejemplo (GET /api/auth/profile)
- [x] Actualizar package.json con dependencias
- [x] Actualizar server.js para usar Mongoose
- [x] Crear documentación completa

