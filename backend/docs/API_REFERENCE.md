# MindCare API Reference

<p align="center">
  <strong>Especificación completa de endpoints REST</strong><br>
  <code>Base URL: /api</code>
</p>

---

## 📑 Índice

- [Autenticación](#-autenticación)
  - [Registro de Usuario](#post-apiauthregister)
  - [Login](#post-apiauthlogin)
  - [Obtener Perfil](#get-apiauthprofile)
- [Diario Personal](#-diario-personal)
  - [Crear Entrada](#post-apidiario)
  - [Obtener Entradas](#get-apidiario)
  - [Obtener Entrada por ID](#get-apidiarioid)
  - [Acceso con Contraseña](#post-apidiarioidacceso)
  - [Actualizar Entrada](#put-apidiarioid)
  - [Eliminar Entrada](#delete-apidiarioid)
- [Registros Diarios](#-registros-diarios)
  - [Crear Registro](#post-apiregistro)
  - [Obtener Registros](#get-apiregistro)
  - [Obtener por ID](#get-apiregistroid)
  - [Obtener por Fecha](#get-apiregistrofechafecha)
  - [Obtener por Rango](#get-apiregistrorango)
- [Formulario Inicial](#-formulario-inicial)
  - [Crear/Actualizar Formulario](#post-apiformulario)
  - [Obtener Formulario](#get-apiformulario)
- [Contactos de Emergencia](#-contactos-de-emergencia)
  - [Crear Contacto](#post-apicontactos-emergencia)
  - [Obtener Contactos](#get-apicontactos-emergencia)
  - [Obtener por ID](#get-apicontactos-emergenciaid)
  - [Actualizar Contacto](#put-apicontactos-emergenciaid)
  - [Eliminar Contacto](#delete-apicontactos-emergenciaid)
  - [Enviar Email de Emergencia](#post-apicontactos-emergenciacontactoidsend-email)
- [Análisis con IA (Grok)](#-análisis-con-ia-grok)
  - [Analizar Datos](#post-apiaianalyze)
- [Health Check](#-health-check)
  - [Estado del Servicio](#get-apihealth)
- [Códigos de Error](#-códigos-de-error)
- [Autenticación JWT](#-autenticación-jwt)

---

## 🔑 Autenticación

Endpoints para gestión de usuarios y sesiones.

### `POST /api/auth/register`

Registra un nuevo usuario en el sistema.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ❌ No | Endpoint público |

**Request Body:**

```json
{
  "nombre": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 6 chars)",
  "alias": "string (optional)"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

**Response 201 - Created:**

```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "alias": "",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

**Response 400 - Bad Request:**

```json
{
  "message": "El email ya está registrado"
}
```

---

### `POST /api/auth/login`

Autentica un usuario y devuelve un token JWT.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ❌ No | Endpoint público |

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

**Response 200 - OK:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIiwiZW1haWwiOiJtYXJpYUBlamVtcGxvLmNvbSIsIm5hbWUiOiJNYXLDrWEgR2FyY8OtYSJ9LCJpYXQiOjE3MDc4MjMyMDAsImV4cCI6MTcwNzgyNjgwMH0.signature"
}
```

**Response 400 - Bad Request:**

```json
{
  "message": "Credenciales inválidas"
}
```

---

### `GET /api/auth/profile`

Obtiene el perfil del usuario autenticado.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Headers:**

```
Authorization: Bearer <token>
```

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response 200 - OK:**

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "alias": "",
    "contactoEmergenciaAnadido": true,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

**Response 401 - Unauthorized:**

```json
{
  "message": "No token provided, authorization denied"
}
```

---

## 📝 Diario Personal

Gestión del diario personal del usuario con sistema de protección por contraseña para compartir entradas.

### `POST /api/diario`

Crea una nueva entrada en el diario.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Request Body:**

```json
{
  "titulo": "string (required)",
  "cuerpo": "string (required)",
  "password": "string (optional) - Para compartir la entrada de forma protegida"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/diario \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi día en el parque",
    "cuerpo": "Hoy fue un día tranquilo, fui al parque y disfruté del sol...",
    "password": "miClaveParaCompartir123"
  }'
```

**Response 201 - Created:**

```json
{
  "message": "Entrada del diario creada con éxito",
  "entrada": {
    "_id": "507f1f77bcf86cd799439012",
    "usuarioId": "507f1f77bcf86cd799439011",
    "titulo": "Mi día en el parque",
    "cuerpo": "Hoy fue un día tranquilo, fui al parque y disfruté del sol...",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

> ⚠️ **Nota**: El campo `password` no se devuelve en la respuesta por seguridad.

---

### `GET /api/diario`

Obtiene todas las entradas del diario del usuario autenticado.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/diario \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "usuarioId": "507f1f77bcf86cd799439011",
    "titulo": "Mi día en el parque",
    "cuerpo": "Hoy fue un día tranquilo...",
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "usuarioId": "507f1f77bcf86cd799439011",
    "titulo": "Reflexiones nocturnas",
    "cuerpo": "Esta noche pensé en...",
    "createdAt": "2026-02-12T22:00:00.000Z",
    "updatedAt": "2026-02-12T22:00:00.000Z"
  }
]
```

---

### `GET /api/diario/:id`

Obtiene una entrada específica del diario. El acceso depende de:
- Si el solicitante es el propietario → acceso directo
- Si la entrada tiene contraseña → requiere verificación vía POST
- Si la entrada es privada (sin contraseña) y no es el propietario → acceso denegado

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ⚠️ Opcional | Bearer Token (requerido para entradas propias) |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID de la entrada del diario |

**Ejemplo de Request (propietario):**

```bash
curl -X GET http://localhost:4000/api/diario/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "usuarioId": "507f1f77bcf86cd799439011",
  "titulo": "Mi día en el parque",
  "cuerpo": "Hoy fue un día tranquilo...",
  "createdAt": "2026-02-13T10:00:00.000Z"
}
```

**Response 403 - Forbidden (entrada privada, no propietario):**

```json
{
  "message": "Acceso denegado. Esta entrada es privada."
}
```

**Response 401 - Unauthorized (entrada con contraseña):**

```json
{
  "message": "Se requiere contraseña para acceder a esta entrada."
}
```

---

### `POST /api/diario/:id/acceso`

Permite acceder a una entrada de diario protegida con contraseña (para compartir).

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ❌ No | Endpoint público |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID de la entrada del diario |

**Request Body:**

```json
{
  "password": "string (required)"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/diario/507f1f77bcf86cd799439012/acceso \
  -H "Content-Type: application/json" \
  -d '{
    "password": "miClaveParaCompartir123"
  }'
```

**Response 200 - OK:**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "usuarioId": "507f1f77bcf86cd799439011",
  "titulo": "Mi día en el parque",
  "cuerpo": "Hoy fue un día tranquilo...",
  "createdAt": "2026-02-13T10:00:00.000Z"
}
```

**Response 403 - Forbidden:**

```json
{
  "message": "Contraseña incorrecta."
}
```

---

### `PUT /api/diario/:id`

Actualiza una entrada del diario existente.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID de la entrada del diario |

**Request Body:**

```json
{
  "titulo": "string (optional)",
  "cuerpo": "string (optional)",
  "password": "string (optional) - Vacío para eliminar protección"
}
```

**Ejemplo de Request:**

```bash
curl -X PUT http://localhost:4000/api/diario/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi día actualizado",
    "password": ""
  }'
```

**Response 200 - OK:**

```json
{
  "message": "Entrada del diario actualizada con éxito",
  "entrada": {
    "_id": "507f1f77bcf86cd799439012",
    "titulo": "Mi día actualizado",
    "cuerpo": "Hoy fue un día tranquilo..."
  }
}
```

---

### `DELETE /api/diario/:id`

Elimina una entrada del diario.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID de la entrada del diario |

**Ejemplo de Request:**

```bash
curl -X DELETE http://localhost:4000/api/diario/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "message": "Entrada del diario eliminada con éxito"
}
```

---

## 📊 Registros Diarios

Gestión de registros emocionales diarios del usuario (estado de ánimo, sueño, actividades, cogniciones).

### `POST /api/registro`

Crea un nuevo registro diario.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Request Body:**

```json
{
  "estadoAnimo": "number (1-10)",
  "horasSueno": "number",
  "calidadSueno": "number (1-10)",
  "nivelEnergia": "number (1-10)",
  "nivelAnsiedad": "number (1-10)",
  "actividadesRealizadas": ["string"],
  "cogniciones": ["string"],
  "notasAdicionales": "string (optional)",
  "fechaCreacion": "Date (optional, default: now)"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/registro \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "estadoAnimo": 7,
    "horasSueno": 7.5,
    "calidadSueno": 8,
    "nivelEnergia": 6,
    "nivelAnsiedad": 3,
    "actividadesRealizadas": ["ejercicio", "lectura", "meditación"],
    "cogniciones": ["pensamientos positivos", "gratitud"],
    "notasAdicionales": "Día productivo en general"
  }'
```

**Response 201 - Created:**

```json
{
  "message": "Registro diario guardado con éxito",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "usuarioId": "507f1f77bcf86cd799439011",
    "estadoAnimo": 7,
    "horasSueno": 7.5,
    "calidadSueno": 8,
    "nivelEnergia": 6,
    "nivelAnsiedad": 3,
    "actividadesRealizadas": ["ejercicio", "lectura", "meditación"],
    "cogniciones": ["pensamientos positivos", "gratitud"],
    "notasAdicionales": "Día productivo en general",
    "fechaCreacion": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### `GET /api/registro`

Obtiene todos los registros del usuario autenticado, ordenados por fecha descendente.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/registro \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "usuarioId": "507f1f77bcf86cd799439011",
      "estadoAnimo": 7,
      "horasSueno": 7.5,
      "fechaCreacion": "2026-02-13T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "usuarioId": "507f1f77bcf86cd799439011",
      "estadoAnimo": 5,
      "horasSueno": 6,
      "fechaCreacion": "2026-02-12T10:00:00.000Z"
    }
  ]
}
```

---

### `GET /api/registro/:id`

Obtiene un registro específico por su ID.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID del registro |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/registro/507f1f77bcf86cd799439014 \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "usuarioId": "507f1f77bcf86cd799439011",
    "estadoAnimo": 7,
    "horasSueno": 7.5,
    "calidadSueno": 8,
    "nivelEnergia": 6,
    "nivelAnsiedad": 3,
    "actividadesRealizadas": ["ejercicio", "lectura"],
    "fechaCreacion": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### `GET /api/registro/fecha/:fecha`

Obtiene registros de una fecha específica.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Formato | Descripción |
|-----------|------|---------|-------------|
| `fecha` | string | `YYYY-MM-DD` | Fecha a consultar |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/registro/fecha/2026-02-13 \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "estadoAnimo": 7,
      "fechaCreacion": "2026-02-13T10:00:00.000Z"
    }
  ]
}
```

**Response 404 - Not Found:**

```json
{
  "message": "No se encontraron registros para esta fecha."
}
```

---

### `GET /api/registro/rango`

Obtiene registros en un rango de fechas.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Query Parameters:**

| Parámetro | Tipo | Formato | Requerido | Descripción |
|-----------|------|---------|-----------|-------------|
| `fechaInicio` | string | `YYYY-MM-DD` | ✅ | Fecha de inicio |
| `fechaFin` | string | `YYYY-MM-DD` | ✅ | Fecha de fin |

**Ejemplo de Request:**

```bash
curl -X GET "http://localhost:4000/api/registro/rango?fechaInicio=2026-02-01&fechaFin=2026-02-13" \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "estadoAnimo": 7,
      "fechaCreacion": "2026-02-13T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "estadoAnimo": 5,
      "fechaCreacion": "2026-02-10T10:00:00.000Z"
    }
  ]
}
```

---

## 📋 Formulario Inicial

Gestión del formulario inicial de configuración del usuario para personalizar el seguimiento.

### `POST /api/formulario`

Crea o actualiza el formulario inicial del usuario. Usa upsert, por lo que si ya existe, lo actualiza.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Request Body:**

```json
{
  "factoresDetonantes": ["string"],
  "actividadesPlacenteras": ["string"],
  "objetivosPersonales": ["string"],
  "medicacion": {
    "toma": "boolean",
    "detalles": "string (optional)"
  },
  "terapia": {
    "asiste": "boolean",
    "frecuencia": "string (optional)"
  },
  "horariosPreferidos": {
    "despertar": "string",
    "dormir": "string"
  }
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/formulario \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "factoresDetonantes": ["estrés laboral", "falta de sueño", "conflictos familiares"],
    "actividadesPlacenteras": ["leer", "caminar", "escuchar música"],
    "objetivosPersonales": ["mejorar sueño", "reducir ansiedad"],
    "medicacion": {
      "toma": false
    },
    "terapia": {
      "asiste": true,
      "frecuencia": "semanal"
    },
    "horariosPreferidos": {
      "despertar": "07:00",
      "dormir": "23:00"
    }
  }'
```

**Response 201 - Created:**

```json
{
  "message": "Formulario guardado con éxito",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "usuarioId": "507f1f77bcf86cd799439011",
    "factoresDetonantes": ["estrés laboral", "falta de sueño"],
    "actividadesPlacenteras": ["leer", "caminar"],
    "createdAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### `GET /api/formulario`

Obtiene el formulario inicial del usuario autenticado.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/formulario \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "usuarioId": "507f1f77bcf86cd799439011",
    "factoresDetonantes": ["estrés laboral", "falta de sueño"],
    "actividadesPlacenteras": ["leer", "caminar"],
    "objetivosPersonales": ["mejorar sueño"],
    "medicacion": {
      "toma": false
    },
    "terapia": {
      "asiste": true,
      "frecuencia": "semanal"
    }
  }
}
```

**Response 404 - Not Found:**

```json
{
  "message": "No se encontró un formulario para este usuario."
}
```

---

## 🆘 Contactos de Emergencia

Gestión de contactos de emergencia con funcionalidad de envío de emails automáticos.

### `POST /api/contactos-emergencia`

Crea un nuevo contacto de emergencia.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Request Body:**

```json
{
  "nombre": "string (required)",
  "telefono": "string (optional)",
  "email": "string (optional) - Requerido para envío de emails",
  "relacion": "string (optional)"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/contactos-emergencia \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "telefono": "+34 666 123 456",
    "email": "juan@ejemplo.com",
    "relacion": "Hermano"
  }'
```

**Response 201 - Created:**

```json
{
  "message": "Contacto de emergencia creado con éxito",
  "contacto": {
    "_id": "507f1f77bcf86cd799439017",
    "usuario": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "telefono": "+34 666 123 456",
    "email": "juan@ejemplo.com",
    "relacion": "Hermano",
    "createdAt": "2026-02-13T10:00:00.000Z"
  }
}
```

---

### `GET /api/contactos-emergencia`

Obtiene todos los contactos de emergencia del usuario.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/contactos-emergencia \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439017",
    "usuario": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "telefono": "+34 666 123 456",
    "email": "juan@ejemplo.com",
    "relacion": "Hermano"
  },
  {
    "_id": "507f1f77bcf86cd799439018",
    "usuario": "507f1f77bcf86cd799439011",
    "nombre": "Ana López",
    "email": "ana@ejemplo.com",
    "relacion": "Amiga"
  }
]
```

---

### `GET /api/contactos-emergencia/:id`

Obtiene un contacto de emergencia específico.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID del contacto |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/contactos-emergencia/507f1f77bcf86cd799439017 \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "_id": "507f1f77bcf86cd799439017",
  "usuario": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "telefono": "+34 666 123 456",
  "email": "juan@ejemplo.com",
  "relacion": "Hermano"
}
```

---

### `PUT /api/contactos-emergencia/:id`

Actualiza un contacto de emergencia existente.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID del contacto |

**Request Body:**

```json
{
  "nombre": "string (optional)",
  "telefono": "string (optional)",
  "email": "string (optional)",
  "relacion": "string (optional)"
}
```

**Ejemplo de Request:**

```bash
curl -X PUT http://localhost:4000/api/contactos-emergencia/507f1f77bcf86cd799439017 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "telefono": "+34 666 999 888"
  }'
```

**Response 200 - OK:**

```json
{
  "message": "Contacto de emergencia actualizado con éxito",
  "contacto": {
    "_id": "507f1f77bcf86cd799439017",
    "nombre": "Juan Pérez",
    "telefono": "+34 666 999 888",
    "email": "juan@ejemplo.com"
  }
}
```

---

### `DELETE /api/contactos-emergencia/:id`

Elimina un contacto de emergencia.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | string | ID del contacto |

**Ejemplo de Request:**

```bash
curl -X DELETE http://localhost:4000/api/contactos-emergencia/507f1f77bcf86cd799439017 \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "message": "Contacto de emergencia eliminado con éxito"
}
```

---

### `POST /api/contactos-emergencia/:contactoId/send-email`

Envía un email de emergencia a un contacto. El email incluye una plantilla HTML profesional con mensaje de urgencia.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ✅ Sí | Bearer Token |

**Path Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `contactoId` | string | ID del contacto de emergencia |

**Requisitos:**
- El contacto debe tener un email registrado
- Las variables de entorno `EMAIL_USER` y `EMAIL_PASS` deben estar configuradas

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/contactos-emergencia/507f1f77bcf86cd799439017/send-email \
  -H "Authorization: Bearer <token>"
```

**Response 200 - OK:**

```json
{
  "message": "Email de emergencia enviado con éxito a juan@ejemplo.com"
}
```

**Response 400 - Bad Request:**

```json
{
  "message": "El contacto no tiene email registrado"
}
```

**Response 404 - Not Found:**

```json
{
  "message": "Contacto de emergencia no encontrado"
}
```

---

## 🤖 Análisis con IA (Grok)

Endpoint para análisis inteligente de datos del usuario mediante Grok AI (OpenRoute).

### `POST /api/ai/analyze`

Envía datos del usuario para análisis con IA.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ❌ No | Endpoint público |

**Request Body:**

```json
{
  "registros": [
    {
      "estadoAnimo": "number",
      "horasSueno": "number",
      "nivelAnsiedad": "number",
      "actividadesRealizadas": ["string"],
      "fechaCreacion": "Date"
    }
  ],
  "formulario": {
    "factoresDetonantes": ["string"],
    "actividadesPlacenteras": ["string"]
  },
  "periodo": "string (e.g., '7d', '30d')"
}
```

**Ejemplo de Request:**

```bash
curl -X POST http://localhost:4000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "registros": [
      {
        "estadoAnimo": 7,
        "horasSueno": 7.5,
        "nivelAnsiedad": 3,
        "actividadesRealizadas": ["ejercicio", "lectura"],
        "fechaCreacion": "2026-02-13T10:00:00.000Z"
      },
      {
        "estadoAnimo": 5,
        "horasSueno": 5,
        "nivelAnsiedad": 6,
        "actividadesRealizadas": [],
        "fechaCreacion": "2026-02-12T10:00:00.000Z"
      }
    ],
    "formulario": {
      "factoresDetonantes": ["falta de sueño"],
      "actividadesPlacenteras": ["ejercicio", "lectura"]
    },
    "periodo": "7d"
  }'
```

**Response 200 - OK:**

```json
{
  "resultado": {
    "analisis": "Basado en los datos proporcionados...",
    "patrones": [
      "Correlación positiva entre ejercicio y estado de ánimo",
      "Las noches con menos de 6 horas de sueño se asocian con mayor ansiedad"
    ],
    "recomendaciones": [
      "Mantener rutina de ejercicio",
      "Priorizar un mínimo de 7 horas de sueño"
    ],
    "alertas": []
  }
}
```

**Response 500 - Internal Server Error:**

```json
{
  "error": "Error procesando análisis IA"
}
```

> ⚠️ **Nota**: Este endpoint requiere la variable de entorno `OPENROUTE_API_KEY` configurada.

---

## 💚 Health Check

Endpoint para verificar el estado del servicio.

### `GET /api/health`

Verifica que la API está funcionando correctamente.

| Parámetro | Requerido | Descripción |
|-----------|-----------|-------------|
| Auth | ❌ No | Endpoint público |

**Ejemplo de Request:**

```bash
curl -X GET http://localhost:4000/api/health
```

**Response 200 - OK:**

```json
{
  "status": "ok",
  "message": "API is up and running",
  "timestamp": "2026-02-13T10:00:00.000Z"
}
```

---

## ❌ Códigos de Error

### Códigos HTTP Estándar

| Código | Nombre | Descripción |
|--------|--------|-------------|
| `200` | OK | Petición exitosa |
| `201` | Created | Recurso creado exitosamente |
| `400` | Bad Request | Datos de entrada inválidos |
| `401` | Unauthorized | Token no proporcionado o inválido |
| `403` | Forbidden | Sin permisos para acceder al recurso |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error interno del servidor |

### Respuestas de Error de Autenticación

**Sin token:**
```json
{
  "message": "No token provided, authorization denied"
}
```

**Token inválido:**
```json
{
  "message": "Invalid token"
}
```

**Token expirado:**
```json
{
  "message": "Token has expired"
}
```

**Error del servidor:**
```json
{
  "message": "Server error during authentication",
  "error": "detalles del error"
}
```

---

## 🔐 Autenticación JWT

### Flujo de Autenticación

```
1. Cliente → POST /api/auth/login (email, password)
2. Servidor → Valida credenciales
3. Servidor → Genera JWT con payload {user: {id, email, name}}
4. Servidor → Devuelve token al cliente
5. Cliente → Almacena token (localStorage, sessionStorage)
6. Cliente → Envía token en header Authorization para rutas protegidas
```

### Estructura del Token

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VyIjp7ImlkIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIn0sImlhdCI6MTcwNzgyMzIwMCwiZXhwIjoxNzA3ODI2ODAwfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Payload Decodificado

```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario"
  },
  "iat": 1707823200,
  "exp": 1707826800
}
```

### Uso del Token

**Header HTTP:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Ejemplo con cURL:**
```bash
curl -X GET http://localhost:4000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Ejemplo con JavaScript (Axios):**
```javascript
import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Todas las peticiones incluirán el token automáticamente
const response = await axios.get('/api/auth/profile');
```

### Expiración

- **Tiempo de vida**: 1 hora (configurable via `JWT_EXPIRES_IN`)
- **Renovación**: Realizar nuevo login cuando expire
- **Verificación**: El middleware rechaza tokens expirados con error 401

---

## 📚 Recursos Adicionales

- [README del Backend](../README.md) - Documentación general
- [Arquitectura de Autenticación](arquitectura-auth.md) - Diagramas de flujo detallados
- [Guía del Middleware](auth-middleware-guide.md) - Uso de authMiddleware

---

<p align="center">
  <strong>MindCare API Reference v1.0</strong><br>
  Última actualización: Febrero 2026
</p>

