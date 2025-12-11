# 📚 Documentación de la API - MindCare

## 🎯 Descripción General
Esta API proporciona endpoints para la gestión de usuarios, autenticación, diarios, registros diarios y contactos de emergencia. Todos los endpoints están protegidos mediante tokens JWT.

---

## 🔐 Autenticación

### Token JWT
- **Formato del header**: `Authorization: Bearer <token>`
- **Duración del token**: 1 hora
- **Ubicación**: Header `Authorization`

### Ejemplo de headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## 📋 Endpoints

### 1️⃣ Autenticación (Auth)

#### 1.1 - Registrar nuevo usuario
- **Método HTTP**: `POST`
- **URL**: `/api/auth/register`
- **Autenticación**: No requiere
- **Descripción**: Crea una nueva cuenta de usuario

**Parámetros requeridos (Body):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "miContraseña123"
}
```

**Validaciones:**
- `name`: Mínimo 2 caracteres
- `email`: Formato válido (xxx@xxx.xxx)
- `password`: Mínimo 8 caracteres

**Respuesta exitosa (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "juan@ejemplo.com",
    "nombre": "Juan Pérez",
    "alias": "",
    "createdAt": "2024-12-10T10:30:00.000Z",
    "updatedAt": "2024-12-10T10:30:00.000Z"
  }
}
```

**Respuesta de error (400):**
```json
{
  "message": "User with this email already exists"
}
```

---

#### 1.2 - Iniciar sesión
- **Método HTTP**: `POST`
- **URL**: `/api/auth/login`
- **Autenticación**: No requiere
- **Descripción**: Autentica un usuario existente

**Parámetros requeridos (Body):**
```json
{
  "email": "juan@ejemplo.com",
  "password": "miContraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "juan@ejemplo.com",
    "nombre": "Juan Pérez",
    "alias": "",
    "createdAt": "2024-12-10T10:30:00.000Z",
    "updatedAt": "2024-12-10T10:30:00.000Z"
  }
}
```

**Respuesta de error (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

#### 1.3 - Obtener perfil del usuario
- **Método HTTP**: `GET`
- **URL**: `/api/auth/profile`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene los datos del usuario autenticado

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "juan@ejemplo.com",
    "nombre": "Juan Pérez",
    "alias": "",
    "createdAt": "2024-12-10T10:30:00.000Z",
    "updatedAt": "2024-12-10T10:30:00.000Z"
  }
}
```

**Respuesta de error (401):**
```json
{
  "message": "Invalid token"
}
```

---

### 2️⃣ Registros Diarios (Seguimiento)

#### 2.1 - Crear nuevo registro diario
- **Método HTTP**: `POST`
- **URL**: `/api/registros`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Crea un nuevo registro diario con datos de estado emocional, sueño, actividad, etc.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros (Body):**
```json
{
  "estadoAnimo": {
    "emociones": [
      {
        "nombre": "Feliz",
        "intensidad": 8
      }
    ],
    "comentario": "Me siento bien hoy"
  },
  "sueno": {
    "horaInicioSueno": "23:00",
    "horaDespertar": "07:30",
    "dificultadDormir": false,
    "despertaresNocturnos": false,
    "cansancioDespertar": false,
    "suenoNoReparador": false,
    "suenosVividos": true,
    "notasSueno": "Dormí bien"
  },
  "actividadFisica": [
    {
      "nombre": "Correr",
      "duracion": 30,
      "intensidad": "moderada"
    }
  ],
  "alimentacion": {
    "regularidadComidas": "3 comidas",
    "calidadDieta": {
      "frutasVerduras": true,
      "ultraprocesados": false,
      "azucar": false,
      "cafeina": true,
      "alcohol": false
    },
    "apetito": "normal"
  },
  "interaccionesSociales": {
    "cantidad": "sociable",
    "calidad": "apoyo",
    "notasSociales": "Pasé tiempo con amigos"
  },
  "cognicion": [
    {
      "nombre": "Concentración",
      "intensidad": 7
    }
  ],
  "actividadesPlacenteras": [
    {
      "opcion": "Leer",
      "preferencia": 8
    }
  ],
  "medicacion": [],
  "energia": {
    "nivel": "ok",
    "intensidad": 6
  }
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Registro diario guardado con éxito",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "usuarioId": "507f1f77bcf86cd799439011",
    "estadoAnimo": { ... },
    "fechaCreacion": "2024-12-10T10:30:00.000Z",
    "createdAt": "2024-12-10T10:30:00.000Z",
    "updatedAt": "2024-12-10T10:30:00.000Z"
  }
}
```

**Respuesta de error (401):**
```json
{
  "message": "Invalid token"
}
```

**Respuesta de error (500):**
```json
{
  "message": "Error al guardar el registro diario",
  "error": "Validation error message"
}
```

---

#### 2.2 - Obtener todos los registros del usuario
- **Método HTTP**: `GET`
- **URL**: `/api/registros`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene todos los registros diarios del usuario autenticado, ordenados por fecha (más recientes primero)

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "usuarioId": "507f1f77bcf86cd799439011",
      "estadoAnimo": { ... },
      "sueno": { ... },
      "fechaCreacion": "2024-12-10T10:30:00.000Z",
      "createdAt": "2024-12-10T10:30:00.000Z"
    }
  ]
}
```

**Respuesta de error (401):**
```json
{
  "message": "Invalid token"
}
```

---

#### 2.3 - Obtener registro por ID
- **Método HTTP**: `GET`
- **URL**: `/api/registros/:id`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene un registro específico por su ID

**Parámetros URL:**
- `id` (string): ID de MongoDB del registro

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:**
```
GET /api/registros/507f1f77bcf86cd799439012
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "usuarioId": "507f1f77bcf86cd799439011",
    "estadoAnimo": { ... },
    "sueno": { ... },
    "fechaCreacion": "2024-12-10T10:30:00.000Z"
  }
}
```

**Respuesta de error (404):**
```json
{
  "message": "No se encontró el registro o no pertenece al usuario."
}
```

**Respuesta de error (401):**
```json
{
  "message": "Invalid token"
}
```

---

#### 2.4 - Obtener registros por fecha específica
- **Método HTTP**: `GET`
- **URL**: `/api/registros/fecha/:fecha`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene todos los registros de un día específico

**Parámetros URL:**
- `fecha` (string): Fecha en formato YYYY-MM-DD (ej: 2024-12-10)

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:**
```
GET /api/registros/fecha/2024-12-10
```

**Respuesta exitosa (200):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "usuarioId": "507f1f77bcf86cd799439011",
      "estadoAnimo": { ... },
      "fechaCreacion": "2024-12-10T10:30:00.000Z"
    }
  ]
}
```

**Respuesta de error (404):**
```json
{
  "message": "No se encontraron registros para esta fecha."
}
```

---

#### 2.5 - Obtener registros por rango de fechas
- **Método HTTP**: `GET`
- **URL**: `/api/registros/rango`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene registros dentro de un rango de fechas

**Parámetros Query:**
- `fechaInicio` (string): Fecha inicial en formato YYYY-MM-DD
- `fechaFin` (string): Fecha final en formato YYYY-MM-DD

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:**
```
GET /api/registros/rango?fechaInicio=2024-12-01&fechaFin=2024-12-10
```

**Respuesta exitosa (200):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "usuarioId": "507f1f77bcf86cd799439011",
      "estadoAnimo": { ... },
      "fechaCreacion": "2024-12-10T10:30:00.000Z"
    }
  ]
}
```

---

### 3️⃣ Diario (Diary Entries)

#### 3.1 - Crear entrada de diario
- **Método HTTP**: `POST`
- **URL**: `/api/diario`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Crea una nueva entrada de diario

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros (Body):**
```json
{
  "titulo": "Mi primer día",
  "contenido": "Hoy fue un día especial..."
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Entrada de diario creada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "usuarioId": "507f1f77bcf86cd799439011",
    "titulo": "Mi primer día",
    "contenido": "Hoy fue un día especial...",
    "fechaCreacion": "2024-12-10T10:30:00.000Z"
  }
}
```

---

#### 3.2 - Obtener todas las entradas de diario del usuario
- **Método HTTP**: `GET`
- **URL**: `/api/diario`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene todas las entradas de diario del usuario

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "usuarioId": "507f1f77bcf86cd799439011",
      "titulo": "Mi primer día",
      "contenido": "Hoy fue un día especial...",
      "fechaCreacion": "2024-12-10T10:30:00.000Z"
    }
  ]
}
```

---

#### 3.3 - Obtener entrada de diario por ID
- **Método HTTP**: `GET`
- **URL**: `/api/diario/:id`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene una entrada específica de diario

**Parámetros URL:**
- `id` (string): ID de MongoDB de la entrada

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:**
```
GET /api/diario/507f1f77bcf86cd799439013
```

**Respuesta exitosa (200):**
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "usuarioId": "507f1f77bcf86cd799439011",
    "titulo": "Mi primer día",
    "contenido": "Hoy fue un día especial...",
    "fechaCreacion": "2024-12-10T10:30:00.000Z"
  }
}
```

---

#### 3.4 - Actualizar entrada de diario
- **Método HTTP**: `PUT`
- **URL**: `/api/diario/:id`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Actualiza una entrada existente de diario

**Parámetros URL:**
- `id` (string): ID de MongoDB de la entrada

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros (Body):**
```json
{
  "titulo": "Mi primer día (actualizado)",
  "contenido": "Hoy fue un día especial... con actualizaciones"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Entrada actualizada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "usuarioId": "507f1f77bcf86cd799439011",
    "titulo": "Mi primer día (actualizado)",
    "contenido": "Hoy fue un día especial... con actualizaciones",
    "fechaCreacion": "2024-12-10T10:30:00.000Z",
    "updatedAt": "2024-12-10T11:00:00.000Z"
  }
}
```

---

#### 3.5 - Eliminar entrada de diario
- **Método HTTP**: `DELETE`
- **URL**: `/api/diario/:id`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Elimina una entrada de diario

**Parámetros URL:**
- `id` (string): ID de MongoDB de la entrada

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:**
```
DELETE /api/diario/507f1f77bcf86cd799439013
```

**Respuesta exitosa (200):**
```json
{
  "message": "Entrada eliminada exitosamente"
}
```

**Respuesta de error (404):**
```json
{
  "message": "Entrada no encontrada"
}
```

---

### 4️⃣ Contactos de Emergencia

#### 4.1 - Crear contacto de emergencia
- **Método HTTP**: `POST`
- **URL**: `/api/contactos-emergencia`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Añade un nuevo contacto de emergencia

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros (Body):**
```json
{
  "nombre": "María González",
  "relacion": "Hermana",
  "telefono": "+34612345678",
  "email": "maria@ejemplo.com"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Contacto de emergencia creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "usuarioId": "507f1f77bcf86cd799439011",
    "nombre": "María González",
    "relacion": "Hermana",
    "telefono": "+34612345678",
    "email": "maria@ejemplo.com",
    "createdAt": "2024-12-10T10:30:00.000Z"
  }
}
```

---

#### 4.2 - Obtener contactos de emergencia
- **Método HTTP**: `GET`
- **URL**: `/api/contactos-emergencia`
- **Autenticación**: ✅ Requiere token JWT
- **Descripción**: Obtiene todos los contactos de emergencia del usuario

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "usuarioId": "507f1f77bcf86cd799439011",
      "nombre": "María González",
      "relacion": "Hermana",
      "telefono": "+34612345678",
      "email": "maria@ejemplo.com",
      "createdAt": "2024-12-10T10:30:00.000Z"
    }
  ]
}
```

---

## 🧪 Ejemplos de uso con cURL

### Registrarse:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "miContraseña123"
  }'
```

### Iniciar sesión:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "miContraseña123"
  }'
```

### Crear registro diario:
```bash
curl -X POST http://localhost:4000/api/registros \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_aqui>" \
  -d '{
    "estadoAnimo": {
      "emociones": [{"nombre": "Feliz", "intensidad": 8}],
      "comentario": "Me siento bien"
    },
    "sueno": {...}
  }'
```

### Obtener registros:
```bash
curl -X GET http://localhost:4000/api/registros \
  -H "Authorization: Bearer <token_aqui>"
```

---

## ⚠️ Códigos de estado HTTP

| Código | Significado |
|--------|------------|
| **200** | OK - La solicitud fue exitosa |
| **201** | Created - El recurso fue creado exitosamente |
| **400** | Bad Request - Parámetros inválidos |
| **401** | Unauthorized - Token inválido o no proporcionado |
| **403** | Forbidden - No tiene permisos para acceder |
| **404** | Not Found - El recurso no existe |
| **500** | Server Error - Error en el servidor |

---

## 🔒 Seguridad

- ✅ Todos los endpoints sensibles están protegidos con JWT
- ✅ Las contraseñas se hashean con bcryptjs
- ✅ CORS está configurado para permitir solo el frontend
- ✅ Validación de datos en todos los endpoints
- ✅ Los usuarios solo pueden acceder a sus propios datos

---

## 📅 Última actualización
Diciembre 10, 2024


