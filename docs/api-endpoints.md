# API Endpoints - MindCare Quick Reference

**Base URL:** `http://localhost:4000/api` (development)  
**Production Base URL:** `https://mindcare-backend.onrender.com/api`

---

## 📑 Endpoints Index

- [Authentication](#authentication) - 3 endpoints
- [Initial Form](#initial-form) - 2 endpoints
- [Daily Records](#daily-records) - 5 endpoints
- [Personal Diary](#personal-diary) - 6 endpoints
- [Emergency Contacts](#emergency-contacts) - 6 endpoints
- [AI Analysis](#ai-analysis) - 1 endpoint
- [Health Check](#health-check) - 1 endpoint

**Total: 24 endpoints**

---

## Authentication

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/auth/register` | ❌ Public | Registers a new user |
| `POST` | `/api/auth/login` | ❌ Public | Logs in and returns JWT |
| `GET` | `/api/auth/profile` | 🔒 Required | Gets authenticated user profile |

### Endpoint Details

#### `POST /api/auth/register`

**Request Body:**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "password": "MyPassword123!",
  "alias": "Mari" (optional)
}
```

**Response 201:**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "María García",
    "email": "maria@example.com",
    "alias": "Mari",
    "formularioCompletado": false,
    "contactoEmergenciaAnadido": false
  }
}
```

**Possible Errors:**
- `400` - Email already registered
- `400` - Incorrect validation data (name < 2 characters, password < 8 characters, invalid email)

---

#### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "maria@example.com",
  "password": "MyPassword123!"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "María García",
    "email": "maria@example.com",
    "alias": "Mari"
  }
}
```

**Possible Errors:**
- `400` - Invalid credentials
- `404` - User not found

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
  "email": "maria@example.com",
  "alias": "Mari",
  "formularioCompletado": true,
  "contactoEmergenciaAnadido": true,
  "createdAt": "2026-02-13T10:00:00.000Z"
}
```

**Possible Errors:**
- `401` - Invalid or expired token
- `404` - User not found

---

## Initial Form

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/formulario` | 🔒 Required | Creates or updates initial form |
| `GET` | `/api/formulario` | 🔒 Required | Gets user's form |

### Endpoint Details

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
  "comentariosDetonantes": "I feel anxious in social situations",
  "comentariosActividades": "I enjoy relaxing outdoor activities"
}
```

**Available Options for factoresDetonantes:**

| Category | Options |
|-----------|----------|
| `relaciones` | Conflict with family, Conflict with friends, Conflict with partner, Social isolation, Criticism/judgments |
| `trabajoEstudio` | Work overload, Exams, Lack of recognition, Changes in responsibilities |
| `rutinaHabitos` | Irregular sleep, Irregular eating, Lack of exercise, Disorganization |
| `emociones` | Anxiety, Stress, Irritability, Low self-esteem, Guilt |
| `estimulosExternos` | Negative news, Social media, Noise / chaotic environment |
| `saludFisica` | Illness, Pain, Fatigue |

**Available Options for actividadesPlacenteras:**

| Category | Options |
|-----------|----------|
| `actividadFisica` | Walking, Running, Yoga, Swimming, Pilates, Cycling, Strength training |
| `social` | Spending time with friends, Family calls, Group activities, Volunteering |
| `creatividadHobbies` | Painting, Drawing, Writing, Music, Photography, Crafts |
| `cuidadoPersonal` | Meditation, Relaxing bath, Sleep, Healthy eating |
| `entretenimiento` | Reading, Watching series/movies, Board games, Video games |
| `logroAprendizaje` | Learning something new, Studying, Personal projects, Online courses |

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

**Possible Errors:**
- `404` - Form not found (user hasn't completed it)

---

## Daily Records

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/registro` | 🔒 Required | Creates a new daily record |
| `GET` | `/api/registro` | 🔒 Required | Gets all user records |
| `GET` | `/api/registro/rango` | 🔒 Required | Gets records in a date range |
| `GET` | `/api/registro/fecha/:fecha` | 🔒 Required | Gets record for a specific date |
| `GET` | `/api/registro/:id` | 🔒 Required | Gets a record by ID |

### Endpoint Details

#### `POST /api/registro`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (complete example):**
```json
{
  "estadoAnimo": {
    "emociones": [
      { "nombre": "Bien", "intensidad": 4 },
      { "nombre": "Ansiedad", "intensidad": 2 }
    ],
    "comentario": "Productive day but with some nervousness before the meeting"
  },
  "sueno": {
    "horaInicioSueno": "23:00",
    "horaDespertar": "07:00",
    "dificultadDormir": false,
    "despertaresNocturnos": false,
    "cansancioDespertar": false,
    "suenoNoReparador": false,
    "suenosVividos": false,
    "notasSueno": "Slept well, 8 full hours"
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
    "notasSociales": "Had lunch with friends, felt supported"
  },
  "cognicion": [
    { "nombre": "Concentración", "intensidad": 4 },
    { "nombre": "Motivación", "intensidad": 5 }
  ],
  "sintomas": "None",
  "notasAdicionales": "Quiet and productive day overall"
}
```

**Available Emotions:**
```
Mood swings, Out of control, Good, Happy, Sad, Sensitive, 
Anger, Security, Enthusiasm, Irritability, Anxiety, 
Insecurity, Gratitude, Indifference
```

**Available Cognitions:**
```
Poor memory, Brain fog, Tranquility, Stress, Concentration,
Distraction, Motivation, Lack of motivation, Creativity, 
High performance, Low performance
```

**Physical Activity Intensities:**
```
baja (low), moderada (moderate), alta (high)
```

**Appetite:**
```
disminuido (decreased), normal, aumentado (increased)
```

**Social Interactions Quantity:**
```
sociable, introvertido (introverted)
```

**Social Interactions Quality:**
```
apoyo (support), conflicto (conflict)
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

**Query Parameters (optional):**
- `limit`: Maximum number of records (default: 50)
- `skip`: Number of records to skip for pagination (default: 0)
- `page`: Current page (alternative to skip)

**Example:**
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
        "comentario": "Productive day"
      },
      "sueno": { /* ... */ }
    }
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

**Query Parameters (required):**
- `fechaInicio`: Start date (format: YYYY-MM-DD or ISO 8601)
- `fechaFin`: End date (format: YYYY-MM-DD or ISO 8601)

**Example:**
```
GET /api/registro/rango?fechaInicio=2026-02-01&fechaFin=2026-02-13
```

**Response 200:**
```json
{
  "registros": [
    { /* record 1 */ },
    { /* record 2 */ }
  ],
  "total": 12,
  "fechaInicio": "2026-02-01T00:00:00.000Z",
  "fechaFin": "2026-02-13T23:59:59.999Z"
}
```

**Typical Use:** Weekly, monthly charts, period comparisons.

---

#### `GET /api/registro/fecha/:fecha`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `fecha`: Date in YYYY-MM-DD format

**Example:**
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

**Possible Errors:**
- `404` - No record for that date

**Typical Use:** Check if user already recorded emotions today, load today's record.

---

#### `GET /api/registro/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Record ID (MongoDB ObjectId)

**Response 200:**
```json
{
  "_id": "65a9f456...",
  "usuarioId": "507f1f77...",
  "fechaCreacion": "2026-02-13T14:30:00.000Z",
  "estadoAnimo": { /* ... */ }
}
```

**Possible Errors:**
- `404` - Record not found
- `403` - Record doesn't belong to authenticated user

---

## Personal Diary

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/diario` | 🔒 Required | Creates a new diary entry |
| `GET` | `/api/diario` | 🔒 Required | Gets all user entries |
| `GET` | `/api/diario/:id` | ⚠️ Optional | Gets a specific entry |
| `POST` | `/api/diario/:id/acceso` | ❌ Public | Accesses password-protected entry |
| `PUT` | `/api/diario/:id` | 🔒 Required | Updates an entry |
| `DELETE` | `/api/diario/:id` | 🔒 Required | Deletes an entry |

### Endpoint Details

#### `POST /api/diario`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "titulo": "A special day",
  "cuerpo": "Today was an amazing day. I felt that I'm finally making progress in my therapy. I had a deep conversation with my therapist about my fears and managed to identify patterns...",
  "password": "myPassword123" // OPTIONAL - for protected sharing
}
```

**Response 201:**
```json
{
  "message": "Entrada de diario creada exitosamente",
  "entrada": {
    "_id": "65ab1234...",
    "usuarioId": "507f1f77...",
    "titulo": "A special day",
    "cuerpo": "Today was an amazing day...",
    "hasPassword": true,
    "createdAt": "2026-02-13T15:00:00.000Z",
    "compartible": true,
    "shareUrl": "/diario/65ab1234..."
  }
}
```

**Note:** If `password` is provided, the entry can be shared via public URL but will require password to access.

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
      "titulo": "A special day",
      "cuerpo": "Full content...",
      "hasPassword": true,
      "createdAt": "2026-02-13T15:00:00.000Z",
      "updatedAt": "2026-02-13T15:00:00.000Z"
    },
    {
      "_id": "65ab5678...",
      "titulo": "Night reflections",
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

**Headers (optional):**
```
Authorization: Bearer <token>
```

**Behavior:**
1. **If user is authenticated AND is the owner:** Returns complete entry
2. **If NOT authenticated OR not the owner:**
   - Without password: Returns complete entry (public)
   - With password: Returns only title and indicates password required

**Response 200 (without password protection):**
```json
{
  "_id": "65ab1234...",
  "titulo": "A special day",
  "cuerpo": "Full content...",
  "createdAt": "2026-02-13T15:00:00.000Z",
  "updatedAt": "2026-02-13T15:00:00.000Z"
}
```

**Response 200 (with password, unauthorized user):**
```json
{
  "_id": "65ab1234...",
  "titulo": "A special day",
  "requiresPassword": true,
  "message": "This entry is password protected",
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
  "password": "myPassword123"
}
```

**Response 200 (correct password):**
```json
{
  "_id": "65ab1234...",
  "titulo": "A special day",
  "cuerpo": "Full unlocked content...",
  "createdAt": "2026-02-13T15:00:00.000Z"
}
```

**Possible Errors:**
- `401` - Incorrect password
- `404` - Entry not found
- `400` - Entry has no password (is public)

**Typical Use:** User shares URL `/diario/65ab1234...` with therapist and password separately.

---

#### `PUT /api/diario/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (optional fields):**
```json
{
  "titulo": "Updated title",
  "cuerpo": "Updated content...",
  "password": "newPassword" // Change or add password
}
```

**Response 200:**
```json
{
  "message": "Entrada actualizada exitosamente",
  "entrada": {
    "_id": "65ab1234...",
    "titulo": "Updated title",
    "cuerpo": "Updated content...",
    "updatedAt": "2026-02-13T16:00:00.000Z"
  }
}
```

**Possible Errors:**
- `403` - Unauthorized (not the entry owner)
- `404` - Entry not found

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

**Possible Errors:**
- `403` - Unauthorized (not the owner)
- `404` - Entry not found

---

## Emergency Contacts

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/contactos-emergencia` | 🔒 Required | Creates an emergency contact |
| `GET` | `/api/contactos-emergencia` | 🔒 Required | Gets all user contacts |
| `GET` | `/api/contactos-emergencia/:id` | 🔒 Required | Gets a specific contact |
| `PUT` | `/api/contactos-emergencia/:id` | 🔒 Required | Updates a contact |
| `DELETE` | `/api/contactos-emergencia/:id` | 🔒 Required | Deletes a contact |
| `POST` | `/api/contactos-emergencia/:contactoId/send-email` | 🔒 Required | Sends emergency email |

### Endpoint Details

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
  "relacion": "Therapist",
  "telefono": "+34 123 456 789",
  "email": "juan.perez@therapy.com",
  "notificarEmergencia": true
}
```

**Fields:**
- `nombre` (required): Contact's full name
- `relacion` (optional): Relationship with user (Therapist, Family, Friend, etc.)
- `telefono` (required): Phone number
- `email` (optional): Email for notifications
- `notificarEmergencia` (optional, default: true): If automatic emails are sent

**Response 201:**
```json
{
  "message": "Contacto creado exitosamente",
  "contacto": {
    "_id": "65ac5678...",
    "usuarioId": "507f1f77...",
    "nombre": "Dr. Juan Pérez",
    "relacion": "Therapist",
    "telefono": "+34 123 456 789",
    "email": "juan.perez@therapy.com",
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
      "relacion": "Therapist",
      "telefono": "+34 123 456 789",
      "email": "juan.perez@therapy.com",
      "notificarEmergencia": true,
      "createdAt": "2026-02-13T16:30:00.000Z"
    },
    {
      "_id": "65ac9abc...",
      "nombre": "Ana García",
      "relacion": "Family",
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
  "relacion": "Therapist",
  "telefono": "+34 123 456 789",
  "email": "juan.perez@therapy.com",
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

**Request Body (optional fields):**
```json
{
  "nombre": "Dr. Juan Pérez Gómez",
  "telefono": "+34 999 888 777",
  "email": "juan.new@therapy.com"
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
    "email": "juan.new@therapy.com",
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
  "mensaje": "I need urgent help. Please contact me as soon as possible. I've been feeling very bad and need to talk to someone."
}
```

**Response 200:**
```json
{
  "message": "Email enviado exitosamente",
  "destinatario": {
    "nombre": "Dr. Juan Pérez",
    "email": "juan.perez@therapy.com"
  },
  "enviadoEn": "2026-02-13T18:00:00.000Z"
}
```

**Possible Errors:**
- `400` - Contact has no configured email
- `404` - Contact not found
- `500` - Error sending email (SMTP server problem)

**Sent Email Content:**
```
From: noreply@mindcare.com
To: juan.perez@therapy.com
Subject: Emergency Alert - MindCare

Hello Dr. Juan Pérez,

User María García (maria@example.com) has marked this as an emergency 
and needs urgent contact.

User's message:
"I need urgent help. Please contact me as soon as possible..."

Please contact the user as soon as possible.

User's phone: [if configured]

---
This message was sent automatically from MindCare.
```

---

## AI Analysis

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/ai/analyze` | ⚠️ Optional | Analyzes user data with AI (Grok) |

### Endpoint Details

#### `POST /api/ai/analyze`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
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
    // ... more records (minimum 3-5 for meaningful analysis)
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
    "resumen": "Based on your recent records, we detect an irregular sleep pattern that may be affecting your mood. The predominant emotions are sadness and anxiety, with consistently high intensities.",
    
    "patrones": [
      {
        "tipo": "sueño",
        "descripcion": "Irregular sleep: going to bed after 1:00 AM for the last 7 nights",
        "severidad": "alta"
      },
      {
        "tipo": "emociones",
        "descripcion": "Predominant emotions: Sadness (average 4.5/5), Anxiety (average 4.8/5)",
        "severidad": "alta"
      },
      {
        "tipo": "actividad",
        "descripcion": "Low physical activity: only 2 sessions in the last week",
        "severidad": "media"
      }
    ],
    
    "recomendaciones": [
      {
        "categoria": "sueño",
        "titulo": "Establish a consistent sleep routine",
        "descripcion": "Try to go to bed and wake up at the same time every day, ideally before 11:00 PM",
        "prioridad": "alta"
      },
      {
        "categoria": "actividad",
        "titulo": "Practice Yoga regularly",
        "descripcion": "You indicated that Yoga is pleasant for you. Try practicing it 3-4 times a week, preferably in the morning",
        "prioridad": "alta"
      },
      {
        "categoria": "habitos",
        "titulo": "Reduce caffeine consumption after 4:00 PM",
        "descripcion": "Caffeine can affect sleep quality. Avoid coffee, tea and energy drinks in the afternoon",
        "prioridad": "media"
      },
      {
        "categoria": "profesional",
        "titulo": "Consider seeking professional support",
        "descripcion": "High and persistent levels of sadness and anxiety can benefit from professional therapy",
        "prioridad": "alta"
      }
    ],
    
    "alertas": [
      {
        "tipo": "warning",
        "mensaje": "Worrying sleep pattern detected: less than 6 hours on 3 of the last 7 days"
      },
      {
        "tipo": "warning",
        "mensaje": "Sustained negative emotions for more than 5 consecutive days"
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

**Possible Errors:**
- `400` - Insufficient data for analysis (less than 3 records)
- `400` - Invalid data format
- `503` - AI service temporarily unavailable
- `500` - Internal AI server error

**Important Notes:**
- At least 5-7 records recommended for meaningful analysis
- AI is a complementary tool, does NOT replace professional care
- Data is sent encrypted to Grok service (xAI)
- No data stored on external servers beyond the analysis session

---

## Health Check

| Method | Endpoint | Authentication | Description |
|--------|----------|---------------|-------------|
| `GET` | `/api/health` | ❌ Public | Checks API service status |

### Endpoint Details

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

**Typical Use:**
- Service monitoring (UptimeRobot, Pingdom)
- Docker healthchecks
- Load balancer health checks
- Status page

---

## HTTP Status Codes

| Code | Meaning | When Used |
|--------|-------------|---------------|
| `200` | OK | Successful request (GET, PUT, DELETE) |
| `201` | Created | Resource created successfully (POST) |
| `400` | Bad Request | Invalid or missing input data |
| `401` | Unauthorized | Invalid, expired or missing token |
| `403` | Forbidden | Authenticated user but without permissions |
| `404` | Not Found | Resource not found |
| `500` | Internal Server Error | Internal server error |
| `503` | Service Unavailable | Service temporarily unavailable |

---

## JWT Authentication

### Getting Token

1. **Register user:**
   ```
   POST /api/auth/register
   ```

2. **Login:**
   ```
   POST /api/auth/login
   → Returns token
   ```

### Using Token

Include in `Authorization` header of all protected requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Format

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": "507f1f77bcf86cd799439011",
    "email": "maria@example.com",
    "nombre": "María García",
    "iat": 1707822300,
    "exp": 1708427100
  },
  "signature": "..."
}
```

### Expiration

- **Default duration:** 7 days
- **Configurable via:** Environment variable `JWT_EXPIRES_IN`
- **Behavior on expiration:** Error 401, user must login again

---

## Rate Limiting (Future)

**Planned for v1.1:**

| Endpoint | Limit | Window |
|----------|--------|---------|
| `POST /api/auth/login` | 5 attempts | 15 minutes |
| `POST /api/auth/register` | 3 registrations | 1 hour |
| General API | 100 requests | 15 minutes |
| `POST /api/ai/analyze` | 10 analyses | 1 hour |

---

## cURL Examples

### Register User

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@example.com",
    "password": "MyPassword123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "MyPassword123!"
  }'
```

### Create Record (requires token)

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

### Get Records

```bash
curl -X GET http://localhost:4000/api/registro \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Postman Collection

**Available File:** `backend/postman/mindcare-api.postman_collection.json`

**Import into Postman:**
1. Open Postman
2. File → Import
3. Select the JSON file
4. Configure environment variables:
   - `base_url`: `http://localhost:4000/api`
   - `token`: (will be filled automatically after login)

**Included Folders:**
- 📁 Authentication
- 📁 Initial Form
- 📁 Daily Records
- 📁 Personal Diary
- 📁 Emergency Contacts
- 📁 AI
- 📁 Health Check

---

**Last updated:** February 13, 2026  
**API Version:** 1.0  
**Complete documentation:** [backend/docs/API_REFERENCE.md](../backend/docs/API_REFERENCE.md)
