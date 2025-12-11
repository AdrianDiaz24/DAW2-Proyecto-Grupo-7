# Documentación Automática del Código (JSDoc)

## ¿Qué es esta carpeta?

Esta carpeta contiene la **documentación técnica autogenerada** del código fuente de MindCare, creada con [JSDoc](https://jsdoc.app/), una herramienta estándar de la industria para documentar código JavaScript y React.

## 📖 Cómo Visualizar la Documentación

### Opción 1: Abrir Localmente
1. Navega a la carpeta `code-docs/`
2. Abre el archivo `index.html` en tu navegador web
3. Explora la documentación usando el menú lateral

### Opción 2: Desde la Terminal
```bash
# En Windows
start code-docs/index.html

# En macOS
open code-docs/index.html

# En Linux
xdg-open code-docs/index.html
```

## 🔄 Cómo Regenerar la Documentación

Si has hecho cambios en el código y quieres actualizar la documentación:

```bash
# Desde la raíz del proyecto
npm run docs:code
```

Este comando:
1. Escanea todos los archivos en `backend/src/` y `frontend/src/`
2. Lee los comentarios JSDoc (`/** */`)
3. Genera archivos HTML actualizados en esta carpeta

## 📦 Contenido Documentado

La documentación incluye:

### Backend
- **Controladores** (auth, diario, contactos de emergencia)
- **Modelos** (Mongoose schemas)
- **Rutas** (Express routes)
- **Middleware** (autenticación, validación)
- **Configuración** (servidor, app)

### Frontend
- **Componentes React** (Atomic Design: Atoms, Molecules, Organisms)
- **Páginas** (Home, Login, Register, Diario, Seguimiento)
- **Servicios** (API calls)
- **Hooks personalizados** (useToast, etc.)
- **Store** (Zustand state management)
- **Utils** (funciones auxiliares)

## 🔍 Navegación

### Menú Lateral
- **Classes**: Clases y constructores
- **Modules**: Módulos y exports
- **Global**: Funciones y variables globales

### Búsqueda
Usa la barra de búsqueda (si disponible) para encontrar funciones o componentes específicos.

### Enlaces Internos
Haz clic en cualquier referencia (parámetro, tipo, función) para navegar a su documentación.

## 📝 Cómo Documentar Código Nuevo

Para que tu código aparezca en esta documentación, usa comentarios JSDoc:

### Ejemplo Backend (Node.js/Express)
```javascript
/**
 * @function createUser
 * @description Crea un nuevo usuario en la base de datos
 * @param {object} req - Objeto request de Express
 * @param {object} req.body - Datos del usuario
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña (será hasheada)
 * @param {object} res - Objeto response de Express
 * @returns {Promise<void>}
 * @throws {Error} Si el email ya existe
 * @example
 * // POST /api/users
 * // Body: { email: "user@example.com", password: "secret123" }
 * await createUser(req, res);
 */
const createUser = async (req, res) => {
  // ... implementación
};
```

### Ejemplo Frontend (React)
```javascript
/**
 * @function Button
 * @description Componente de botón reutilizable con múltiples variantes
 * @param {object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {function} [props.onClick] - Callback al hacer clic
 * @param {string} [props.variant='primary'] - Variante visual del botón
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @returns {JSX.Element}
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  // ... implementación
};
```

## 🏷️ Tags JSDoc Comunes

| Tag | Descripción | Ejemplo |
|-----|-------------|---------|
| `@function` | Define una función | `@function myFunction` |
| `@description` | Describe qué hace | `@description Valida el email` |
| `@param` | Parámetro de la función | `@param {string} email - Email del usuario` |
| `@returns` | Valor de retorno | `@returns {boolean}` |
| `@throws` | Excepciones que lanza | `@throws {Error} Si falla validación` |
| `@example` | Ejemplo de uso | `@example const x = myFunc();` |
| `@since` | Versión en que se añadió | `@since 1.0.0` |
| `@author` | Autor del código | `@author John Doe` |

## ⚠️ Notas Importantes

### ❌ NO Editar Manualmente
- Los archivos HTML en esta carpeta son **autogenerados**
- Cualquier cambio manual se perderá al regenerar
- Edita los comentarios JSDoc en el código fuente, no los HTML

### 📦 Versionamiento (Git)
- Esta carpeta está en `.gitignore`
- NO se sube al repositorio
- Cada desarrollador debe regenerarla localmente con `npm run docs:code`

### 🔄 Cuándo Regenerar
- Después de añadir nuevos archivos
- Después de modificar comentarios JSDoc
- Después de cambiar firmas de funciones
- Antes de hacer un code review

## 🔗 Integración con el Proyecto

Esta documentación es complementaria a:

- **[API Documentation](../docs/optativa/api-documentation.md)** - Documentación de endpoints REST
- **[Arquitectura del Backend](../backend/docs/)** - Diagramas y guías técnicas
- **[Guía de Postman](../docs/postman-guide.md)** - Testing de API
- **[CORS Configuration](../docs/cors-configuration.md)** - Configuración de seguridad

## 🎯 Para Nuevos Desarrolladores

Si eres nuevo en el proyecto:

1. **Lee la documentación generada** - Abre `index.html` y explora
2. **Familiarízate con la estructura** - Ve cómo están organizados los archivos
3. **Sigue los patrones** - Documenta tu código de forma similar
4. **Regenera después de cambios** - `npm run docs:code`

## 📚 Recursos Adicionales

- [JSDoc Official Documentation](https://jsdoc.app/)
- [JSDoc Cheatsheet](https://devhints.io/jsdoc)
- [Google JavaScript Style Guide - Comments](https://google.github.io/styleguide/jsguide.html#jsdoc)

## 🆘 Solución de Problemas

### La documentación no se genera
```bash
# Verifica que JSDoc está instalado
npm list jsdoc

# Si no está, instala las dependencias
npm install
```

### Faltan archivos en la documentación
- Asegúrate de que los archivos tienen extensión `.js` o `.jsx`
- Verifica que están en `backend/src/` o `frontend/src/`
- Comprueba que tienen comentarios JSDoc válidos

### Los cambios no aparecen
```bash
# Limpia la carpeta y regenera
rm -rf code-docs/
npm run docs:code
```

---

**Última actualización:** Diciembre 2024  
**Versión del proyecto:** 1.0.0  
**Herramienta:** JSDoc 3.x

