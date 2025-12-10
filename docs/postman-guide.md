# Colección de Postman - MindCare API

## Introducción

Esta carpeta contiene la colección de Postman para testing y documentación de los endpoints de la API REST de MindCare. Postman es una herramienta esencial para desarrolladores, permitiendo realizar requests HTTP, validar respuestas y documentar la API de forma interactiva.

## Contenidos de la Carpeta

La colección de Postman está ubicada en el directorio del backend junto con el código fuente:

- **Colección principal:** `backend/postman/mindcare-api.postman_collection.json`
- **Colección legacy (mantener para compatibilidad):** `backend/postman-collection.json`

## ¿Qué es Postman?

Postman es una plataforma de desarrollo de APIs que permite:
- **Testing de endpoints**: Realizar peticiones HTTP (GET, POST, PUT, DELETE, etc.)
- **Automatización**: Crear tests automatizados y validar respuestas
- **Documentación**: Generar documentación interactiva de la API
- **Colaboración**: Compartir colecciones entre miembros del equipo
- **Monitoreo**: Ejecutar tests programados para monitorear la salud de la API

## Instalación y Setup

### Paso 1: Descargar Postman

Descargar la aplicación desde: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

O usar la versión web en: [https://web.postman.co/](https://web.postman.co/)

### Paso 2: Importar la Colección

1. Abrir Postman
2. Hacer clic en el botón **"Import"** (parte superior izquierda)
3. Seleccionar la opción **"Upload Files"**
4. Navegar a `backend/postman/mindcare-api.postman_collection.json` y seleccionar el archivo
5. Hacer clic en **"Import"**

La colección aparecerá en el panel izquierdo bajo "Collections".

### Paso 3: Configurar Variables de Entorno

La colección utiliza variables de entorno para mayor flexibilidad. Debes crear un entorno local:

1. Hacer clic en el icono de engranaje (⚙️) en la esquina superior derecha
2. Seleccionar **"Environments"**
3. Hacer clic en **"Create New"**
4. Nombrar el entorno como `MindCare-Local`
5. Agregar las siguientes variables:

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `base_url` | URL base del backend | `http://localhost:5000/api` |
| `frontend_url` | URL del frontend | `http://localhost:3000` |
| `jwt_token` | Token JWT del usuario autenticado | Se genera automáticamente tras login |
| `user_email` | Email de usuario de prueba | `usuario@test.com` |
| `user_password` | Contraseña de usuario de prueba | `Password123!` |

6. Hacer clic en **"Save"** (Ctrl+S)

### Paso 4: Seleccionar el Entorno

En la esquina superior derecha de Postman, seleccionar el entorno `MindCare-Local` del dropdown.

## Estructura de la Colección

La colección está organizada por módulos/funcionalidades:

### 1. Authentication (Autenticación)
Endpoints para registro, login y gestión de sesiones.

**Requests incluidos:**
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/me` - Obtener datos del usuario autenticado

**Variables necesarias**: `user_email`, `user_password`

### 2. Formulario Inicial (Initial Form)
Endpoints para completar el formulario inicial del usuario.

**Requests incluidos:**
- `POST /formulario` - Enviar formulario inicial con factores detonantes
- `GET /formulario/:userId` - Obtener formulario del usuario

**Autenticación requerida**: Sí (JWT Token)

### 3. Registro Diario (Daily Tracker)
Endpoints para el seguimiento diario de estado emocional y hábitos.

**Requests incluidos:**
- `POST /registros` - Crear nuevo registro diario
- `GET /registros/:userId` - Obtener registros del usuario
- `GET /registros/:userId/:date` - Obtener registros de fecha específica
- `PUT /registros/:id` - Actualizar registro existente
- `DELETE /registros/:id` - Eliminar registro

**Autenticación requerida**: Sí (JWT Token)

### 4. Diario Personal (Diary)
Endpoints para crear y gestionar entradas del diario personal.

**Requests incluidos:**
- `POST /diario` - Crear entrada en el diario
- `GET /diario/:userId` - Obtener todas las entradas del usuario
- `GET /diario/:id` - Obtener una entrada específica
- `PUT /diario/:id` - Actualizar entrada del diario
- `DELETE /diario/:id` - Eliminar entrada del diario

**Autenticación requerida**: Sí (JWT Token)

### 5. Contactos de Emergencia
Endpoints para gestionar contactos de emergencia.

**Requests incluidos:**
- `POST /contactos-emergencia` - Crear contacto de emergencia
- `GET /contactos-emergencia/:userId` - Obtener contactos del usuario
- `PUT /contactos-emergencia/:id` - Actualizar contacto
- `DELETE /contactos-emergencia/:id` - Eliminar contacto

**Autenticación requerida**: Sí (JWT Token)

## Flujo de Testing Típico

### Escenario 1: Crear un Usuario y Hacer Login

1. Ejecutar `POST /auth/register` con datos de un nuevo usuario
2. Ejecutar `POST /auth/login` con las credenciales
3. **Importante**: El token JWT se guarda automáticamente en la variable `jwt_token` gracias al script de post-request

### Escenario 2: Crear un Registro Diario

1. Asegurarse de estar autenticado (ejecutar login si es necesario)
2. Ejecutar `POST /registros` con datos del seguimiento diario
3. Verificar que la respuesta incluye el ID del registro creado

### Escenario 3: Escribir en el Diario Personal

1. Estar autenticado
2. Ejecutar `POST /diario` con el contenido del diario
3. Ejecutar `GET /diario/:userId` para recuperar todas las entradas

## Scripts de Post-Request Automáticos

La colección incluye scripts de JavaScript que se ejecutan automáticamente después de cada request:

### Extracción de JWT Token

Después de un login exitoso, el token se guarda automáticamente:

```javascript
if (pm.response.code === 200) {
    const responseData = pm.response.json();
    if (responseData.token) {
        pm.environment.set('jwt_token', responseData.token);
        console.log('Token guardado:', responseData.token.substring(0, 20) + '...');
    }
}
```

Esto permite que los requests posteriores usen automáticamente el token sin copiarlo manualmente.

## Validación de Respuestas

Cada request incluye validaciones (tests) para verificar que las respuestas son correctas:

- Código de estado HTTP esperado (200, 201, 400, etc.)
- Presencia de campos requeridos en la respuesta
- Tipos de datos correctos
- Valores dentro de rangos esperados

**Para ejecutar todos los tests:**

1. Seleccionar la colección "MindCare API"
2. Hacer clic en el botón "Run" o "Runner"
3. Seleccionar el entorno
4. Hacer clic en "Run MindCare API"

## Troubleshooting Común

### Error: "Could not get any response"

**Causas posibles:**
- El backend no está corriendo en el puerto 5000
- La URL base (`base_url`) no es correcta
- El firewall está bloqueando las conexiones

**Soluciones:**
```bash
# Verificar que el backend está corriendo
cd backend
npm run dev

# Verificar que está en puerto 5000
# La consola debería mostrar: "Server running on port 5000"
```

### Error: "Unauthorized" (401) en requests que requieren autenticación

**Causas posibles:**
- El token JWT ha expirado
- El token no está siendo enviado en el header `Authorization`
- El usuario no está autenticado

**Soluciones:**
1. Ejecutar de nuevo `POST /auth/login`
2. Verificar que la variable `jwt_token` está configurada
3. Verificar que el header `Authorization: Bearer {{jwt_token}}` está presente en la request

### Error: "Bad Request" (400) al enviar datos

**Causa**: Los datos enviados no cumplen la validación del backend

**Soluciones:**
1. Revisar el mensaje de error en la respuesta
2. Verificar que todos los campos requeridos están presentes
3. Verificar que los tipos de datos son correctos

### Error: "Forbidden" (403) en peticiones de datos de otros usuarios

**Causa**: No tienes permiso para acceder a recursos de otro usuario

**Solución**: Verificar que estás accediendo a tus propios recursos usando tu `userId`

## Buenas Prácticas

### ✅ Hacer

- ✅ Usar variables de entorno para URLs y tokens
- ✅ Cambiar de entorno (Local, Staging, Producción) según necesidad
- ✅ Usar nombres descriptivos en requests
- ✅ Documentar el propósito de cada request
- ✅ Ejecutar tests regularmente
- ✅ Mantener la colección actualizada cuando cambien los endpoints

### ❌ No Hacer

- ❌ Hardcodear URLs en los requests
- ❌ Guardar credenciales reales en la colección
- ❌ Usar cuentas de producción para testing
- ❌ Dejar tokens expirados sin actualizar
- ❌ Compartir la colección con credenciales incluidas

## Exportar Requests como Código

Postman permite generar código en varios lenguajes:

1. Abrir un request
2. Hacer clic en el botón **"Code"** (esquina derecha)
3. Seleccionar el lenguaje (JavaScript, Python, cURL, etc.)
4. Copiar el código generado

Útil para integrar requests en scripts automatizados o testing.

## Sincronización en Equipo

Para compartir la colección con otros miembros del equipo:

1. Exportar la colección: Click derecho en la colección → "Export"
2. Compartir el archivo `.json` a través de Git o email
3. Otros miembros importan la colección siguiendo el "Paso 2" anterior

## Referencias Adicionales

- [Documentación oficial de Postman](https://learning.postman.com/)
- [Postman Learning Center](https://learning.postman.com/docs/)
- [REST API Best Practices](https://restfulapi.net/)

## Contacto y Soporte

Para preguntas sobre la colección de Postman de MindCare:

- **Backend Lead**: Adrián Díaz Angulo ([@AdrianDiaz24](https://github.com/AdrianDiaz24))
- **Documentación**: Disponible en `API_DOCUMENTATION.md`

