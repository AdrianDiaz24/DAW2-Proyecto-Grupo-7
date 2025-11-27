# 🚀 Guía de Inicio Rápido - Sistema de Autenticación

## ⚡ Inicio Rápido (3 pasos)

### 1. Configurar Variables de Entorno
```bash
cd backend
cp .env.example .env
```

Edita `.env` con tus valores:
```env
JWT_SECRET=tu_secreto_super_seguro_aqui
MONGODB_URI=mongodb://localhost:27017/daw2_proyecto
PORT=3000
NODE_ENV=development
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Iniciar el Servidor
```bash
npm start
```

¡Listo! El servidor debería estar corriendo en `http://localhost:3000`

---

## 🧪 Probar el Sistema

### Opción 1: Script de Prueba Automático
```bash
node scripts/test-auth.js
```

Este script probará automáticamente:
- ✅ Conexión a MongoDB
- ✅ Creación de usuario
- ✅ Hashing de contraseña
- ✅ Generación y verificación de JWT
- ✅ Búsqueda de usuario

### Opción 2: Postman/Thunder Client

1. Importa la colección: `backend/postman-collection.json`
2. Sigue este orden:

#### A. Registrar usuario
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Usuario Test"
}
```

#### B. Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Respuesta:** Guarda el token
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### C. Acceder a ruta protegida
```http
GET http://localhost:3000/api/auth/profile
Authorization: Bearer <tu_token_aqui>
```

### Opción 3: cURL (Terminal)

```bash
# 1. Registrar
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\"}"

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"

# 3. Perfil (reemplaza TOKEN con el token obtenido)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

---

## 📁 Archivos Importantes

```
backend/
├── .env                          # ⚙️ Configuración (crear desde .env.example)
├── .env.example                  # 📋 Plantilla de configuración
├── postman-collection.json       # 📮 Colección de Postman
├── scripts/
│   └── test-auth.js              # 🧪 Script de prueba automático
├── src/
│   ├── app.js                    # 🎯 Aplicación Express
│   ├── server.js                 # 🚀 Servidor principal
│   ├── middleware/
│   │   └── authMiddleware.js     # 🛡️ Middleware de autenticación
│   ├── controllers/
│   │   └── auth.controller.js    # 🎮 Controladores de auth
│   ├── routes/
│   │   └── auth.routes.js        # 🛣️ Rutas de auth
│   └── models/
│       └── usuarios_mongoose.js  # 📊 Modelo de usuario
└── README.md                     # 📖 Documentación completa
```

---

## 🔧 Comandos Útiles

```bash
# Iniciar servidor en modo desarrollo
npm run dev

# Iniciar servidor en producción
npm start

# Ejecutar pruebas del sistema de auth
node scripts/test-auth.js

# Ver logs en tiempo real (si usas PM2)
pm2 logs

# Reiniciar servidor (si usas PM2)
pm2 restart backend
```

---

## 🛡️ Endpoints Disponibles

### Públicos (sin autenticación)
- `GET /` - Página de bienvenida
- `GET /api/health` - Health check
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Protegidos (requieren token JWT)
- `GET /api/auth/profile` - Obtener perfil del usuario

---

## 🐛 Solución de Problemas

### ❌ Error: "Cannot find module"
```bash
cd backend
npm install
```

### ❌ Error: "MONGODB_URI not defined"
```bash
# Verifica que existe el archivo .env
ls .env

# Si no existe, créalo desde el ejemplo
cp .env.example .env

# Edita .env con tu conexión a MongoDB
```

### ❌ Error: "MongoDB connection failed"
```bash
# Verifica que MongoDB está corriendo
# En Windows:
services.msc  # Buscar "MongoDB"

# O inicia MongoDB manualmente
mongod
```

### ❌ Error: "JWT_SECRET not defined"
```bash
# Verifica que JWT_SECRET está en .env
cat .env | grep JWT_SECRET

# Si no está, agrégalo
echo "JWT_SECRET=tu_secreto_aqui" >> .env
```

### ❌ Error: "Invalid token"
- El token puede estar expirado (duración: 1 hora)
- Haz login nuevamente para obtener un nuevo token
- Verifica que copiaste el token completo

---

## 📚 Más Información

- **Documentación completa**: Ver `backend/README.md`
- **Guía del middleware**: Ver `docs/auth-middleware-guide.md`
- **Implementación completada**: Ver `IMPLEMENTACION-COMPLETADA.md`

---

## ✅ Checklist de Verificación

Antes de empezar, asegúrate de tener:
- [ ] MongoDB instalado y corriendo
- [ ] Node.js instalado (v14 o superior)
- [ ] Archivo `.env` configurado
- [ ] Dependencias instaladas (`npm install`)

---

## 🎉 ¡Todo Listo!

Si llegaste hasta aquí, tu sistema de autenticación está completamente configurado y listo para usar.

**Próximos pasos sugeridos:**
1. Integrar con el frontend
2. Agregar más rutas protegidas
3. Implementar roles y permisos
4. Agregar refresh tokens
5. Implementar verificación de email

---

**¿Necesitas ayuda?** Consulta la documentación o revisa los ejemplos en los controladores.

**✨ ¡Feliz desarrollo! ✨**

