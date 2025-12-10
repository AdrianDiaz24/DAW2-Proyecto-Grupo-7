# Guía de Documentación con JSDoc

## Introducción

Esta guía explica cómo documentar correctamente el código fuente de MindCare usando JSDoc para mantener una documentación técnica consistente y profesional.

## ¿Por qué documentar con JSDoc?

- ✅ **Autocompletado mejorado** en IDEs (VSCode, WebStorm)
- ✅ **Documentación autogenerada** en HTML navegable
- ✅ **Mejor comprensión del código** para el equipo
- ✅ **Onboarding más rápido** para nuevos desarrolladores
- ✅ **Estándar de la industria** ampliamente reconocido

## Sintaxis Básica

### Estructura de un Comentario JSDoc

```javascript
/**
 * @tag descripción
 */
```

**Importante:**
- Usa `/**` para iniciar (no `/*`)
- Cada línea debe empezar con `*`
- Cierra con `*/`

## Tags Principales

### @function - Definir Función

```javascript
/**
 * @function calculateTotal
 * @description Calcula el total de un carrito de compras
 */
const calculateTotal = (items) => {
  // ...
};
```

### @param - Parámetros

```javascript
/**
 * @param {string} name - Nombre del usuario
 * @param {number} age - Edad del usuario
 * @param {object} [options] - Opciones adicionales (opcional)
 * @param {boolean} [options.verified=false] - Si está verificado
 */
function createUser(name, age, options = {}) {
  // ...
}
```

**Sintaxis:**
- `{tipo}` - Tipo de dato
- `nombre` - Nombre del parámetro
- `[nombre]` - Parámetro opcional
- `[nombre=valor]` - Valor por defecto
- `- Descripción` - Descripción del parámetro

### @returns - Valor de Retorno

```javascript
/**
 * @returns {boolean} True si el usuario es válido
 */
function isValidUser(user) {
  return user.email && user.password;
}

/**
 * @returns {Promise<User>} Usuario encontrado
 */
async function findUser(id) {
  return await User.findById(id);
}
```

### @throws - Excepciones

```javascript
/**
 * @throws {Error} Si el email ya existe
 * @throws {ValidationError} Si los datos son inválidos
 */
async function registerUser(email, password) {
  // ...
}
```

### @example - Ejemplos de Uso

```javascript
/**
 * @example
 * // Uso básico
 * const result = add(2, 3);
 * console.log(result); // 5
 * 
 * @example
 * // Con números negativos
 * add(-5, 10); // 5
 */
function add(a, b) {
  return a + b;
}
```

### @description - Descripción Detallada

```javascript
/**
 * @description
 * Esta función valida un email usando expresiones regulares.
 * Verifica el formato básico (xxx@yyy.zzz) pero no valida
 * la existencia real del dominio.
 */
function validateEmail(email) {
  // ...
}
```

## Documentando Backend (Node.js/Express)

### Controladores

```javascript
/**
 * @file Controlador de autenticación
 * @description Gestiona registro, login y perfil de usuarios
 * @requires jsonwebtoken
 * @requires ../models/usuarios_mongoose
 */

/**
 * @function loginUser
 * @description Autentica a un usuario y genera un token JWT
 * @async
 * @param {object} req - Request de Express
 * @param {object} req.body - Body de la petición
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {object} res - Response de Express
 * @returns {Promise<void>}
 * @throws {Error} Si las credenciales son inválidas
 * @example
 * // POST /api/auth/login
 * // Body: { email: "user@test.com", password: "secret123" }
 * await loginUser(req, res);
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // ... implementación
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Modelos (Mongoose)

```javascript
/**
 * @file Modelo de Usuario
 * @description Define el schema de usuarios en MongoDB
 * @requires mongoose
 */

/**
 * @typedef {object} User
 * @property {string} _id - ID único del usuario
 * @property {string} email - Email único del usuario
 * @property {string} password - Contraseña hasheada
 * @property {string} nombre - Nombre completo
 * @property {Date} createdAt - Fecha de creación
 * @property {Date} updatedAt - Fecha de última actualización
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  // ...
});

/**
 * @function comparePassword
 * @memberof User
 * @description Compara una contraseña en texto plano con la hasheada
 * @param {string} candidatePassword - Contraseña a verificar
 * @returns {Promise<boolean>} True si coinciden
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

### Middleware

```javascript
/**
 * @file Middleware de autenticación
 * @description Verifica tokens JWT en peticiones protegidas
 */

/**
 * @function authMiddleware
 * @description Middleware para proteger rutas que requieren autenticación
 * @param {object} req - Request de Express
 * @param {object} res - Response de Express
 * @param {function} next - Función next de Express
 * @returns {void}
 * @throws {UnauthorizedError} Si el token es inválido o no existe
 * @example
 * router.get('/protected', authMiddleware, controller);
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  // ... implementación
};
```

## Documentando Frontend (React)

### Componentes Funcionales

```javascript
/**
 * @file Componente Button
 * @description Botón reutilizable con múltiples variantes
 * @requires react
 * @requires prop-types
 */

/**
 * @function Button
 * @description Renderiza un botón con estilos personalizables
 * @param {object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {function} [props.onClick] - Handler del evento click
 * @param {('primary'|'secondary'|'outline')} [props.variant='primary'] - Variante visual
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Tamaño del botón
 * @param {boolean} [props.disabled=false] - Si está deshabilitado
 * @param {boolean} [props.loading=false] - Si muestra estado de carga
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Tipo de botón HTML
 * @returns {JSX.Element}
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Guardar
 * </Button>
 * 
 * @example
 * <Button variant="outline" size="small" loading={isLoading}>
 *   Cargando...
 * </Button>
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  type = 'button'
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};
```

### Hooks Personalizados

```javascript
/**
 * @file Hook useToast
 * @description Hook para mostrar notificaciones toast
 */

/**
 * @function useToast
 * @description Hook que proporciona métodos para mostrar notificaciones
 * @returns {object} Objeto con métodos de toast
 * @returns {function} returns.success - Muestra toast de éxito
 * @returns {function} returns.error - Muestra toast de error
 * @returns {function} returns.info - Muestra toast informativo
 * @example
 * const { success, error } = useToast();
 * 
 * // En un handler
 * const handleSave = async () => {
 *   try {
 *     await saveData();
 *     success('Datos guardados correctamente');
 *   } catch (err) {
 *     error('Error al guardar');
 *   }
 * };
 */
const useToast = () => {
  const success = (message) => {
    toast.success(message);
  };

  const error = (message) => {
    toast.error(message);
  };

  return { success, error };
};
```

### Servicios/API

```javascript
/**
 * @file Servicio de Diario
 * @description Funciones para interactuar con la API de diario
 */

/**
 * @function getDiaryEntries
 * @async
 * @description Obtiene todas las entradas del diario del usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array<DiaryEntry>>} Array de entradas
 * @throws {ApiError} Si falla la petición
 * @example
 * const entries = await getDiaryEntries('user123');
 * console.log(entries); // [{ id: '1', title: '...', ... }]
 */
export const getDiaryEntries = async (userId) => {
  const response = await api.get(`/diario/${userId}`);
  return response.data;
};
```

## Tipos Complejos

### @typedef - Definir Tipos Personalizados

```javascript
/**
 * @typedef {object} UserData
 * @property {string} id - ID único
 * @property {string} email - Email del usuario
 * @property {string} nombre - Nombre completo
 * @property {string[]} roles - Roles asignados
 * @property {UserProfile} profile - Perfil del usuario
 */

/**
 * @typedef {object} UserProfile
 * @property {string} avatar - URL del avatar
 * @property {string} bio - Biografía
 * @property {Date} birthDate - Fecha de nacimiento
 */

/**
 * @function processUser
 * @param {UserData} user - Datos del usuario
 * @returns {void}
 */
function processUser(user) {
  console.log(user.profile.avatar);
}
```

## Buenas Prácticas

### ✅ Hacer

1. **Documenta todas las funciones públicas**
   ```javascript
   /**
    * @function publicFunction
    * @description Esta función es accesible desde fuera
    */
   export const publicFunction = () => {};
   ```

2. **Especifica tipos precisos**
   ```javascript
   // ✅ Bien
   @param {string} email - Email del usuario
   @param {number} age - Edad en años
   
   // ❌ Mal
   @param email
   @param age
   ```

3. **Usa ejemplos para casos complejos**
   ```javascript
   /**
    * @example
    * // Caso complejo con múltiples opciones
    * processData({
    *   items: [...],
    *   options: { sort: true, filter: 'active' }
    * });
    */
   ```

4. **Documenta valores de retorno específicos**
   ```javascript
   // ✅ Bien
   @returns {Promise<User>} Usuario autenticado
   
   // ❌ Mal
   @returns Retorna algo
   ```

### ❌ Evitar

1. **Comentarios obvios**
   ```javascript
   // ❌ Mal
   /**
    * @function add
    * @description Suma dos números
    * @param {number} a - Primer número
    * @param {number} b - Segundo número
    * @returns {number} La suma
    */
   const add = (a, b) => a + b;
   ```

2. **Documentación desactualizada**
   - Actualiza JSDoc cuando cambies la firma de funciones
   - Revisa que los parámetros coincidan con el código

3. **Sobre-documentar**
   - No documentes funciones privadas triviales
   - No repitas lo que el código ya dice claramente

## Regenerar Documentación

Después de añadir o modificar comentarios JSDoc:

```bash
npm run docs:code
```

Esto regenera toda la carpeta `code-docs/` con la documentación actualizada.

## Recursos

- [JSDoc Official Documentation](https://jsdoc.app/)
- [JSDoc Cheatsheet](https://devhints.io/jsdoc)
- [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html#jsdoc)

## Soporte

Si tienes dudas sobre cómo documentar algo específico:
1. Consulta esta guía
2. Mira ejemplos en el código existente
3. Pregunta al equipo de desarrollo

---

**Última actualización:** Diciembre 2024

