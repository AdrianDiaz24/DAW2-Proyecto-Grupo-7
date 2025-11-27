# Documentación Wiki: Endpoints de Autenticación (Auth API)

## Registro de usuario

- **Método:** POST
- **URL:** `/api/auth/register`
- **Descripción:** Registra un nuevo usuario con nombre, email, contraseña y alias opcional para modo anónimo.
- **Body (JSON) ejemplo:**

```json
{
"nombre": "Juan Pérez",
"email": "juan@example.com",
"password": "contraseñaSegura",
"alias": "Anónimo123"
}
```

- **Respuestas:**
    - `201 Created`: Usuario creado correctamente, devuelve datos del usuario sin contraseña.
    - `400 Bad Request`: Datos inválidos o email ya registrado.

---

## Login

- **Método:** POST
- **URL:** `/api/auth/login`
- **Descripción:** Autentica al usuario y devuelve un token JWT para proteger futuras peticiones.
- **Body (JSON) ejemplo:**

```json
{
"email": "juan@example.com",
"password": "contraseñaSegura"
}
```

- **Respuestas:**
    - `200 OK`: Devuelve `accessToken` y datos del usuario sin contraseña.

```json
{
"accessToken": "<jwt_token>",
"user": {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "alias": "Anónimo123"
    }
}
```

- `401 Unauthorized`: Credenciales incorrectas.



---

## Logout

- **Método:** POST
- **URL:** `/api/auth/logout`
- **Descripción:** Finaliza la sesión del usuario invalidando el token.
- **Headers:**  
  `Authorization: Bearer <accessToken>`

- **Respuestas:**
    - `200 OK`: Logout exitoso.
    - `401 Unauthorized`: Token inválido o ausente.

---

## Obtener perfil del usuario autenticado

- **Método:** GET
- **URL:** `/api/auth/me`
- **Descripción:** Devuelve los datos del usuario autenticado sin la contraseña.
- **Headers:**  
  `Authorization: Bearer <accessToken>`

- **Respuestas:**

```json
{
"nombre": "Juan Pérez",
"email": "juan@example.com",
"alias": "Anónimo123",
"roles": ["user"]
}
```

- `401 Unauthorized`: Token inválido o ausente.

---

## Notas importantes

- Las contraseñas se almacenan hasheadas con bcrypt antes de guardarse en la base de datos.
- El campo `alias` es opcional para permitir modo anónimo.
- Los tokens JWT se deben enviar en el header `Authorization` para acceder a rutas protegidas.

---