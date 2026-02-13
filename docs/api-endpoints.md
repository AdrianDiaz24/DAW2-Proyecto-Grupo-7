# API Endpoints - Referencia Rápida MindCare

**Base URL:** `http://localhost:4000/api` (desarrollo)  
**Base URL Producción:** `https://mindcare-backend.onrender.com/api`

---

## 📑 Índice de Endpoints

- [Autenticación](#autenticación) - 3 endpoints
- [Formulario Inicial](#formulario-inicial) - 2 endpoints
- [Registros Diarios](#registros-diarios) - 5 endpoints
- [Diario Personal](#diario-personal) - 6 endpoints
- [Contactos de Emergencia](#contactos-de-emergencia) - 6 endpoints
- [Análisis con IA](#análisis-con-ia) - 1 endpoint
- [Health Check](#health-check) - 1 endpoint

**Total: 24 endpoints**

---

## Autenticación

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/api/auth/register` | ❌ Público | Registra un nuevo usuario |
| `POST` | `/api/auth/login` | ❌ Público | Inicia sesión y devuelve JWT |
| `GET` | `/api/auth/profile` | 🔒 Requerida | Obtiene perfil del usuario autenticado |

### Detalle de Endpoints

#### `POST /api/auth/register`

**Request Body:**
```json
{
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "password": "MiPassword123!",
  "alias": "Mari" (opcional)
}
```

**Response 201:**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "alias": "Mari",
    "formularioCompletado": false,
    "contactoEmergenciaAnadido": false
  }
}
```

**Errores posibles:**
- `400` - Email ya registrado
- `400` - Datos de validación incorrectos (nombre < 2 caracteres, password < 8 caracteres, email inválido)

---

#### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "maria@ejemplo.com",
  "password": "MiPassword123!"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "alias": "Mari"
  }
}
```

**Errores posibles:**
- `400` - Credenciales inválidas
- `404` - Usuario no encontrado

---

#### `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "alias": "Mari",
  "formularioCompletado": true,
  "contactoEmergenciaAnadido": true,
  "createdAt": "2026-02-13T10:00:00.000Z"
}
```

**Errores posibles:**
- `401` - Token inválido o expirado
- `404` - Usuario no encontrado

---

## Formulario Inicial

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/api/formulario` | 🔒 Requerida | Crea o actualiza formulario inicial |
| `GET` | `/api/formulario` | 🔒 Requerida | Obtiene formulario del usuario |

### Detalle de Endpoints

#### `POST /api/formulario`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "factoresDetonantes": {
    "relaciones": [
      { "opcion": "Conflicto con familiares", "intensidad": 4 },
      { "opcion": "Aislamiento social", "intensidad": 3 }
    ],
    "emociones": [
      { "opcion": "Ansiedad", "intensidad": 5 },
      { "opcion": "Estrés", "intensidad": 4 }
    ],
    "trabajoEstudio": [
      { "opcion": "Sobrecarga laboral", "intensidad": 4 }
    ]
  },
  "actividadesPlacenteras": {
    "actividadFisica": [
      { "opcion": "Yoga", "preferencia": 5 },
      { "opcion": "Caminar", "preferencia": 4 }
    ],
    "creatividadHobbies": [
      { "opcion": "Escribir", "preferencia": 5 },
      { "opcion": "Música", "preferencia": 4 }
    ]
  },
  "comentariosDetonantes": "Me siento ansioso en situaciones sociales",
  "comentariosActividades": "Disfruto actividades relajantes al aire libre"
}
```

**Opciones disponibles para factoresDetonantes:**

| Categoría | Opciones |
|-----------|----------|
| `relaciones` | Conflicto con familiares, Conflicto con amigos, Conflicto con pareja, Aislamiento social, Críticas/juicios |
| `trabajoEstudio` | Sobrecarga laboral, Exámenes, Falta de reconocimiento, Cambios en responsabilidades |
| `rutinaHabitos` | Sueño irregular, Alimentación irregular, Falta de ejercicio, Desorganización |
| `emociones` | Ansiedad, Estrés, Irritabilidad, Baja autoestima, Culpa |
| `estimulosExternos` | Noticias negativas, Redes sociales, Ruido / ambiente caótico |
| `saludFisica` | Enfermedad, Dolor, Fatiga |

**Opciones disponibles para actividadesPlacenteras:**

| Categoría | Opciones |
|-----------|----------|
| `actividadFisica` | Caminar, Correr, Yoga, Natación, Pilates, Ciclismo, Entrenamiento de fuerza |
| `social` | Pasar tiempo con amigos, Llamadas familiares, Actividades en grupo, Voluntariado |
| `creatividadHobbies` | Pintar, Dibujar, Escribir, Música, Fotografía, Manualidades |
| `cuidadoPersonal` | Meditación, Baño relajante, Dormir, Alimentación saludable |
| `entretenimiento` | Leer, Ver series/películas, Juegos de mesa, Videojuegos |
| `logroAprendizaje` | Aprender algo nuevo, Estudiar, Proyectos personales, Cursos online |

**Response 201:**
```json
{
  "message": "Formulario guardado exitosamente",
  "formulario": {
    "_id": "65a8f123...",
    "usuarioId": "507f1f77...",
    "factoresDetonantes": { /* ... */ },
    "actividadesPlacenteras": { /* ... */ },
    "createdAt": "2026-02-13T11:00:00.000Z"
  }
}
```

---

#### `GET /api/formulario`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "_id": "65a8f123...",
  "usuarioId": "507f1f77...",
  "factoresDetonantes": { /* ... */ },
  "actividadesPlacenteras": { /* ... */ },
  "comentariosDetonantes": "...",
  "comentariosActividades": "...",
  "createdAt": "2026-02-13T11:00:00.000Z",
  "updatedAt": "2026-02-13T11:00:00.000Z"
}
```

**Errores posibles:**
- `404` - Formulario no encontrado (usuario no lo ha completado)

---

## Registros Diarios

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/api/registro` | 🔒 Requerida | Crea un nuevo registro diario |
| `GET` | `/api/registro` | 🔒 Requerida | Obtiene todos los registros del usuario |
| `GET` | `/api/registro/rango` | 🔒 Requerida | Obtiene registros en un rango de fechas |
| `GET` | `/api/registro/fecha/:fecha` | 🔒 Requerida | Obtiene registro de una fecha específica |
| `GET` | `/api/registro/:id` | 🔒 Requerida | Obtiene un registro por ID |

### Detalle de Endpoints

#### `POST /api/registro`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (ejemplo completo):**
```json
{
  "estadoAnimo": {
    "emociones": [
      { "nombre": "Bien", "intensidad": 4 },
      { "nombre": "Ansiedad", "intensidad": 2 }
    ],
    "comentario": "Día productivo pero con algo de nerviosismo antes de la reunión"
  },
  "sueno": {
    "horaInicioSueno": "23:00",
    "horaDespertar": "07:00",
    "dificultadDormir": false,
    "despertaresNocturnos": false,
    "cansancioDespertar": false,
    "suenoNoReparador": false,
    "suenosVividos": false,
    "notasSueno": "Dormí bien, 8 horas completas"
  },
  "actividadFisica": [
    { "nombre": "Yoga", "duracion": 30, "intensidad": "baja" },
    { "nombre": "Caminar", "duracion": 45, "intensidad": "moderada" }
  ],
  "alimentacion": {
    "regularidadComidas": "regular",
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
    "notasSociales": "Almorcé con amigos, me sentí apoyado"
  },
  "cognicion": [
    { "nombre": "Concentración", "intensidad": 4 },
    { "nombre": "Motivación", "intensidad": 5 }
  ],
  "sintomas": "Ninguno",
  "notasAdicionales": "Día tranquilo y productivo en general"
}
```

**Emociones disponibles:**
```
Cambios de ánimo, Sin control, Bien, Feliz, Triste, Sensible, 
Rabia, Seguridad, Entusiasmo, Irritabilidad, Ansiedad, 
Inseguridad, Gratitud, Indiferencia
```

**Cogniciones disponibles:**
```
Poca memoria, Niebla mental, Tranquilidad, Estrés, Concentración,
Distracción, Motivación, Sin motivación, Creatividad, 
Alto rendimiento, Bajo rendimiento
```

**Intensidades de actividad física:**
```
baja, moderada, alta
```

**Apetito:**
```
disminuido, normal, aumentado
```

**Cantidad de interacciones sociales:**
```
sociable, introvertido
```

**Calidad de interacciones sociales:**
```
apoyo, conflicto
```

**Response 201:**
```json
{
  "message": "Registro creado exitosamente",
  "registro": {
    "_id": "65a9f456...",
    "usuarioId": "507f1f77...",
    "fechaCreacion": "2026-02-13T14:30:00.000Z",
    "estadoAnimo": { /* ... */ },
    "sueno": { /* ... */ },
    "actividadFisica": [ /* ... */ ],
    "alimentacion": { /* ... */ }
  }
}
```

---

#### `GET /api/registro`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters (opcionales):**
- `limit`: Número máximo de registros (default: 50)
- `skip`: Número de registros a saltar para paginación (default: 0)
- `page`: Página actual (alternativa a skip)

**Ejemplo:**
```
GET /api/registro?limit=20&page=2
```

**Response 200:**
```json
{
  "registros": [
    {
      "_id": "65a9f456...",
      "fechaCreacion": "2026-02-13T14:30:00.000Z",
      "estadoAnimo": {
        "emociones": [
          { "nombre": "Bien", "intensidad": 4 }
        ],
        "comentario": "Día productivo"
      },
      "sueno": { /* ... */ }
    },
    // ... más registros
  ],
  "total": 125,
  "page": 2,
  "limit": 20,
  "pages": 7
}
```

---

#### `GET /api/registro/rango`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters (requeridos):**
- `fechaInicio`: Fecha de inicio (formato: YYYY-MM-DD o ISO 8601)
- `fechaFin`: Fecha de fin (formato: YYYY-MM-DD o ISO 8601)

**Ejemplo:**
```
GET /api/registro/rango?fechaInicio=2026-02-01&fechaFin=2026-02-13
```

**Response 200:**
```json
{
  "registros": [
    { /* registro 1 */ },
    { /* registro 2 */ }
  ],
  "total": 12,
  "fechaInicio": "2026-02-01T00:00:00.000Z",
  "fechaFin": "2026-02-13T23:59:59.999Z"
}
```

**Uso típico:** Gráficos semanales, mensuales, comparaciones de períodos.

---

#### `GET /api/registro/fecha/:fecha`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros URL:**
- `fecha`: Fecha en formato YYYY-MM-DD

**Ejemplo:**
```
GET /api/registro/fecha/2026-02-13
```

**Response 200:**
```json
{
  "_id": "65a9f456...",
  "usuarioId": "507f1f77...",
  "fechaCreacion": "2026-02-13T14:30:00.000Z",
  "estadoAnimo": { /* ... */ },
  "sueno": { /* ... */ }
}
```

**Errores posibles:**
- `404` - No hay registro para esa fecha

**Uso típico:** Verificar si el usuario ya registró emociones hoy, cargar registro del día.

---

#### `GET /api/registro/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros URL:**
- `id`: ID del registro (ObjectId de MongoDB)

**Response 200:**
```json
{
  "_id": "65a9f456...",
  "usuarioId": "507f1f77...",
  "fechaCreacion": "2026-02-13T14:30:00.000Z",
  "estadoAnimo": { /* ... */ }
}
```

**Errores posibles:**
- `404` - Registro no encontrado
- `403` - Registro no pertenece al usuario autenticado

---

## Diario Personal

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/api/diario` | 🔒 Requerida | Crea una nueva entrada de diario |
| `GET` | `/api/diario` | 🔒 Requerida | Obtiene todas las entradas del usuario |
| `GET` | `/api/diario/:id` | ⚠️ Opcional | Obtiene una entrada específica |
| `POST` | `/api/diario/:id/acceso` | ❌ Público | Accede a entrada protegida con contraseña |
| `PUT` | `/api/diario/:id` | 🔒 Requerida | Actualiza una entrada |
| `DELETE` | `/api/diario/:id` | 🔒 Requerida | Elimina una entrada |

### Detalle de Endpoints

#### `POST /api/diario`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "titulo": "Un día especial",
  "cuerpo": "Hoy fue un día increíble. Sentí que finalmente estoy progresando en mi terapia. Tuve una conversación profunda con mi terapeuta sobre mis miedos y logré identificar patrones...",
  "password": "miPassword123" // OPCIONAL - para compartir con protección
}
```

**Response 201:**
```json
{
  "message": "Entrada de diario creada exitosamente",
  "entrada": {
    "_id": "65ab1234...",
    "usuarioId": "507f1f77...",
    "titulo": "Un día especial",
    "cuerpo": "Hoy fue un día increíble...",
    "hasPassword": true,
    "createdAt": "2026-02-13T15:00:00.000Z",
    "compartible": true,
    "shareUrl": "/diario/65ab1234..."
  }
}
```

**Nota:** Si se proporciona `password`, la entrada puede compartirse vía URL pública pero requerirá contraseña para acceder.

---

#### `GET /api/diario`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "entradas": [
    {
      "_id": "65ab1234...",
      "titulo": "Un día especial",
      "cuerpo": "Contenido completo...",
      "hasPassword": true,
      "createdAt": "2026-02-13T15:00:00.000Z",
      "updatedAt": "2026-02-13T15:00:00.000Z"
    },
    {
      "_id": "65ab5678...",
      "titulo": "Reflexiones nocturnas",
      "cuerpo": "...",
      "hasPassword": false,
      "createdAt": "2026-02-12T22:00:00.000Z"
    }
  ],
  "total": 15
}
```

---

#### `GET /api/diario/:id`

**Headers (opcional):**
```
Authorization: Bearer <token>
```

**Comportamiento:**
1. **Si el usuario está autenticado Y es el dueño:** Devuelve entrada completa
2. **Si NO está autenticado O no es el dueño:**
   - Sin password: Devuelve entrada completa (pública)
   - Con password: Devuelve solo título y indica que requiere contraseña

**Response 200 (sin password protegido):**
```json
{
  "_id": "65ab1234...",
  "titulo": "Un día especial",
  "cuerpo": "Contenido completo...",
  "createdAt": "2026-02-13T15:00:00.000Z",
  "updatedAt": "2026-02-13T15:00:00.000Z"
}
```

**Response 200 (con password, usuario no autorizado):**
```json
{
  "_id": "65ab1234...",
  "titulo": "Un día especial",
  "requiresPassword": true,
  "message": "Esta entrada está protegida con contraseña",
  "createdAt": "2026-02-13T15:00:00.000Z"
}
```

---

#### `POST /api/diario/:id/acceso`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "password": "miPassword123"
}
```

**Response 200 (contraseña correcta):**
```json
{
  "_id": "65ab1234...",
  "titulo": "Un día especial",
  "cuerpo": "Contenido completo desbloqueado...",
  "createdAt": "2026-02-13T15:00:00.000Z"
}
```

**Errores posibles:**
- `401` - Contraseña incorrecta
- `404` - Entrada no encontrada
- `400` - Entrada no tiene contraseña (es pública)

**Uso típico:** Usuario comparte URL `/diario/65ab1234...` con terapeuta y password por separado.

---

#### `PUT /api/diario/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (campos opcionales):**
```json
{
  "titulo": "Título actualizado",
  "cuerpo": "Contenido actualizado...",
  "password": "nuevaPassword" // Cambiar o añadir password
}
```

**Response 200:**
```json
{
  "message": "Entrada actualizada exitosamente",
  "entrada": {
    "_id": "65ab1234...",
    "titulo": "Título actualizado",
    "cuerpo": "Contenido actualizado...",
    "updatedAt": "2026-02-13T16:00:00.000Z"
  }
}
```

**Errores posibles:**
- `403` - No autorizado (no es el dueño de la entrada)
- `404` - Entrada no encontrada

---

#### `DELETE /api/diario/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "message": "Entrada eliminada exitosamente",
  "deletedId": "65ab1234..."
}
```

**Errores posibles:**
- `403` - No autorizado (no es el dueño)
- `404` - Entrada no encontrada

---

## Contactos de Emergencia

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/api/contactos-emergencia` | 🔒 Requerida | Crea un contacto de emergencia |
| `GET` | `/api/contactos-emergencia` | 🔒 Requerida | Obtiene todos los contactos del usuario |
| `GET` | `/api/contactos-emergencia/:id` | 🔒 Requerida | Obtiene un contacto específico |
| `PUT` | `/api/contactos-emergencia/:id` | 🔒 Requerida | Actualiza un contacto |
| `DELETE` | `/api/contactos-emergencia/:id` | 🔒 Requerida | Elimina un contacto |
| `POST` | `/api/contactos-emergencia/:contactoId/send-email` | 🔒 Requerida | Envía email de emergencia |

### Detalle de Endpoints

#### `POST /api/contactos-emergencia`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nombre": "Dr. Juan Pérez",
  "relacion": "Terapeuta",
  "telefono": "+34 123 456 789",
  "email": "juan.perez@terapia.com",
  "notificarEmergencia": true
}
```

**Campos:**
- `nombre` (requerido): Nombre completo del contacto
- `relacion` (opcional): Relación con el usuario (Terapeuta, Familiar, Amigo, etc.)
- `telefono` (requerido): Número de teléfono
- `email` (opcional): Email para notificaciones
- `notificarEmergencia` (opcional, default: true): Si se envían emails automáticos

**Response 201:**
```json
{
  "message": "Contacto creado exitosamente",
  "contacto": {
    "_id": "65ac5678...",
    "usuarioId": "507f1f77...",
    "nombre": "Dr. Juan Pérez",
    "relacion": "Terapeuta",
    "telefono": "+34 123 456 789",
    "email": "juan.perez@terapia.com",
    "notificarEmergencia": true,
    "createdAt": "2026-02-13T16:30:00.000Z"
  }
}
```

---

#### `GET /api/contactos-emergencia`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "contactos": [
    {
      "_id": "65ac5678...",
      "nombre": "Dr. Juan Pérez",
      "relacion": "Terapeuta",
      "telefono": "+34 123 456 789",
      "email": "juan.perez@terapia.com",
      "notificarEmergencia": true,
      "createdAt": "2026-02-13T16:30:00.000Z"
    },
    {
      "_id": "65ac9abc...",
      "nombre": "Ana García",
      "relacion": "Familiar",
      "telefono": "+34 987 654 321",
      "createdAt": "2026-02-10T10:00:00.000Z"
    }
  ],
  "total": 2
}
```

---

#### `GET /api/contactos-emergencia/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "_id": "65ac5678...",
  "usuarioId": "507f1f77...",
  "nombre": "Dr. Juan Pérez",
  "relacion": "Terapeuta",
  "telefono": "+34 123 456 789",
  "email": "juan.perez@terapia.com",
  "notificarEmergencia": true,
  "createdAt": "2026-02-13T16:30:00.000Z",
  "updatedAt": "2026-02-13T16:30:00.000Z"
}
```

---

#### `PUT /api/contactos-emergencia/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (campos opcionales):**
```json
{
  "nombre": "Dr. Juan Pérez Gómez",
  "telefono": "+34 999 888 777",
  "email": "juan.nuevo@terapia.com"
}
```

**Response 200:**
```json
{
  "message": "Contacto actualizado exitosamente",
  "contacto": {
    "_id": "65ac5678...",
    "nombre": "Dr. Juan Pérez Gómez",
    "telefono": "+34 999 888 777",
    "email": "juan.nuevo@terapia.com",
    "updatedAt": "2026-02-13T17:00:00.000Z"
  }
}
```

---

#### `DELETE /api/contactos-emergencia/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "message": "Contacto eliminado exitosamente",
  "deletedId": "65ac5678..."
}
```

---

#### `POST /api/contactos-emergencia/:contactoId/send-email`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "mensaje": "Necesito ayuda urgente. Por favor, contáctame lo antes posible. He estado sintiéndome muy mal y necesito hablar con alguien."
}
```

**Response 200:**
```json
{
  "message": "Email enviado exitosamente",
  "destinatario": {
    "nombre": "Dr. Juan Pérez",
    "email": "juan.perez@terapia.com"
  },
  "enviadoEn": "2026-02-13T18:00:00.000Z"
}
```

**Errores posibles:**
- `400` - Contacto no tiene email configurado
- `404` - Contacto no encontrado
- `500` - Error al enviar email (problema con servidor SMTP)

**Contenido del email enviado:**
```
De: noreply@mindcare.com
Para: juan.perez@terapia.com
Asunto: Alerta de Emergencia - MindCare

Hola Dr. Juan Pérez,

El usuario María García (maria@ejemplo.com) ha marcado esto como una emergencia 
y necesita contacto urgente.

Mensaje del usuario:
"Necesito ayuda urgente. Por favor, contáctame lo antes posible..."

Por favor, contácta al usuario lo antes posible.

Teléfono del usuario: [si está configurado]

---
Este mensaje fue enviado automáticamente desde MindCare.
```

---

## Análisis con IA

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/api/ai/analyze` | ⚠️ Opcional | Analiza datos del usuario con IA (Grok) |

### Detalle de Endpoints

#### `POST /api/ai/analyze`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (opcional)
```

**Request Body:**
```json
{
  "registros": [
    {
      "fecha": "2026-02-13",
      "estadoAnimo": {
        "emociones": [
          { "nombre": "Triste", "intensidad": 4 },
          { "nombre": "Ansiedad", "intensidad": 5 }
        ]
      },
      "sueno": {
        "horaInicioSueno": "02:00",
        "horaDespertar": "08:00",
        "cansancioDespertar": true,
        "dificultadDormir": true
      }
    },
    {
      "fecha": "2026-02-12",
      "estadoAnimo": {
        "emociones": [{ "nombre": "Triste", "intensidad": 5 }]
      },
      "sueno": {
        "horaInicioSueno": "01:30",
        "horaDespertar": "09:00"
      }
    }
    // ... más registros (mínimo 3-5 para análisis significativo)
  ],
  "formulario": {
    "factoresDetonantes": {
      "emociones": [
        { "opcion": "Ansiedad", "intensidad": 5 },
        { "opcion": "Estrés", "intensidad": 4 }
      ]
    },
    "actividadesPlacenteras": {
      "actividadFisica": [
        { "opcion": "Yoga", "preferencia": 5 }
      ]
    }
  }
}
```

**Response 200:**
```json
{
  "analisis": {
    "resumen": "Basado en tus registros de los últimos días, detectamos un patrón de sueño irregular que puede estar afectando tu estado de ánimo. Las emociones predominantes son tristeza y ansiedad, con intensidades consistentemente altas.",
    
    "patrones": [
      {
        "tipo": "sueño",
        "descripcion": "Sueño irregular: acostándote después de la 1:00 AM en las últimas 7 noches",
        "severidad": "alta"
      },
      {
        "tipo": "emociones",
        "descripcion": "Emociones predominantes: Tristeza (promedio 4.5/5), Ansiedad (promedio 4.8/5)",
        "severidad": "alta"
      },
      {
        "tipo": "actividad",
        "descripcion": "Baja actividad física: solo 2 sesiones en la última semana",
        "severidad": "media"
      }
    ],
    
    "recomendaciones": [
      {
        "categoria": "sueño",
        "titulo": "Establece una rutina de sueño constante",
        "descripcion": "Intenta acostarte y despertarte a la misma hora todos los días, idealmente antes de las 23:00",
        "prioridad": "alta"
      },
      {
        "categoria": "actividad",
        "titulo": "Practica Yoga regularmente",
        "descripcion": "Indicaste que el Yoga te resulta placentero. Intenta practicarlo 3-4 veces por semana, preferiblemente por la mañana",
        "prioridad": "alta"
      },
      {
        "categoria": "habitos",
        "titulo": "Reduce consumo de cafeína después de las 16:00",
        "descripcion": "La cafeína puede afectar la calidad del sueño. Evita café, té y bebidas energéticas por la tarde",
        "prioridad": "media"
      },
      {
        "categoria": "profesional",
        "titulo": "Considera buscar apoyo profesional",
        "descripcion": "Los niveles altos y persistentes de tristeza y ansiedad pueden beneficiarse de terapia profesional",
        "prioridad": "alta"
      }
    ],
    
    "alertas": [
      {
        "tipo": "warning",
        "mensaje": "Patrón de sueño preocupante detectado: menos de 6 horas en 3 de los últimos 7 días"
      },
      {
        "tipo": "warning",
        "mensaje": "Emociones negativas sostenidas por más de 5 días consecutivos"
      }
    ],
    
    "estadisticas": {
      "diasAnalizados": 7,
      "promedioSueno": 6.2,
      "emocionMasFrecuente": "Ansiedad",
      "tendencia": "decreciente"
    }
  },
  
  "metadata": {
    "generatedAt": "2026-02-13T18:00:00.000Z",
    "modelUsed": "grok-beta",
    "confidence": 0.85
  }
}
```

**Errores posibles:**
- `400` - Datos insuficientes para análisis (menos de 3 registros)
- `400` - Formato de datos inválido
- `503` - Servicio de IA no disponible temporalmente
- `500` - Error interno del servidor de IA

**Notas importantes:**
- Se recomienda al menos 5-7 registros para análisis significativo
- La IA es una herramienta complementaria, NO sustituye atención profesional
- Los datos se envían encriptados al servicio de Grok (xAI)
- No se almacenan datos en servidores externos más allá de la sesión de análisis

---

## Health Check

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `GET` | `/api/health` | ❌ Público | Verifica estado del servicio API |

### Detalle de Endpoints

#### `GET /api/health`

**Response 200:**
```json
{
  "status": "ok",
  "message": "API is up and running",
  "timestamp": "2026-02-13T18:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "database": "connected",
  "services": {
    "mongodb": "healthy",
    "ai": "available"
  }
}
```

**Response 503 (Service Unavailable):**
```json
{
  "status": "error",
  "message": "Service temporarily unavailable",
  "timestamp": "2026-02-13T18:30:00.000Z",
  "database": "disconnected",
  "services": {
    "mongodb": "unhealthy",
    "ai": "unavailable"
  }
}
```

**Uso típico:**
- Monitoring de servicios (UptimeRobot, Pingdom)
- Docker healthchecks
- Load balancer health checks
- Status page

---

## Códigos de Estado HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| `200` | OK | Request exitoso (GET, PUT, DELETE) |
| `201` | Created | Recurso creado exitosamente (POST) |
| `400` | Bad Request | Datos de entrada inválidos o faltantes |
| `401` | Unauthorized | Token inválido, expirado o faltante |
| `403` | Forbidden | Usuario autenticado pero sin permisos |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error interno del servidor |
| `503` | Service Unavailable | Servicio temporalmente no disponible |

---

## Autenticación JWT

### Obtener Token

1. **Registrar usuario:**
   ```
   POST /api/auth/register
   ```

2. **Iniciar sesión:**
   ```
   POST /api/auth/login
   → Devuelve token
   ```

### Usar Token

Incluir en header `Authorization` de todas las requests protegidas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Formato del Token

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": "507f1f77bcf86cd799439011",
    "email": "maria@ejemplo.com",
    "nombre": "María García",
    "iat": 1707822300,
    "exp": 1708427100
  },
  "signature": "..."
}
```

### Expiración

- **Duración por defecto:** 7 días
- **Configurable vía:** Variable de entorno `JWT_EXPIRES_IN`
- **Comportamiento al expirar:** Error 401, usuario debe hacer login nuevamente

---

## Rate Limiting (Futuro)

**Planeado para v1.1:**

| Endpoint | Límite | Ventana |
|----------|--------|---------|
| `POST /api/auth/login` | 5 intentos | 15 minutos |
| `POST /api/auth/register` | 3 registros | 1 hora |
| API general | 100 requests | 15 minutos |
| `POST /api/ai/analyze` | 10 análisis | 1 hora |

---

## Ejemplos de Uso con cURL

### Registrar usuario

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

### Crear registro (requiere token)

```bash
curl -X POST http://localhost:4000/api/registro \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "estadoAnimo": {
      "emociones": [{"nombre": "Bien", "intensidad": 4}]
    },
    "sueno": {
      "horaInicioSueno": "23:00",
      "horaDespertar": "07:00"
    }
  }'
```

### Obtener registros

```bash
curl -X GET http://localhost:4000/api/registro \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Colección de Postman

**Archivo disponible:** `backend/postman/mindcare-api.postman_collection.json`

**Importar en Postman:**
1. Abrir Postman
2. File → Import
3. Seleccionar el archivo JSON
4. Configurar variables de entorno:
   - `base_url`: `http://localhost:4000/api`
   - `token`: (se llenará automáticamente después de login)

**Carpetas incluidas:**
- 📁 Autenticación
- 📁 Formulario Inicial
- 📁 Registros Diarios
- 📁 Diario Personal
- 📁 Contactos de Emergencia
- 📁 IA
- 📁 Health Check

---

**Última actualización:** 13 de febrero de 2026  
**Versión API:** 1.0  
**Documentación completa:** [backend/docs/API_REFERENCE.md](../backend/docs/API_REFERENCE.md)
