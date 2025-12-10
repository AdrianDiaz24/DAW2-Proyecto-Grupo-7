# Configuración CORS (Cross-Origin Resource Sharing)

## Introducción

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad implementado en los navegadores web que controla cómo los recursos de una aplicación pueden ser accedidos desde dominios diferentes. En MindCare, la configuración de CORS es crítica para permitir que el frontend (ejecutándose en un dominio diferente) pueda comunicarse con el backend sin restricciones de seguridad.

## ¿Por qué es necesario CORS en MindCare?

En desarrollo local y en producción, el frontend y el backend se ejecutan en dominios/puertos diferentes:

- **Frontend**: `http://localhost:3000` (desarrollo) o dominio de producción
- **Backend**: `http://localhost:5000` (desarrollo) o dominio de producción

Sin CORS configurado correctamente, el navegador bloquearía todas las peticiones (preflight requests, POST requests, etc.) del frontend al backend, resultando en errores de seguridad.

## Configuración Actual en MindCare

### Ubicación del Código

El archivo de configuración se encuentra en: `backend/src/app.js`

```javascript
/**
 * @name CORS_Configuration
 * @description Configuración de CORS para permitir peticiones desde el frontend.
 * @property {string} origin - El origen permitido para las peticiones.
 * @property {boolean} credentials - Indica si se permiten credenciales.
 * @property {number} optionsSuccessStatus - Código de estado para peticiones OPTIONS.
 */
// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

### Parámetros Configurados

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| `origin` | Variable de entorno `FRONTEND_URL` o `http://localhost:3000` | Define qué origen(es) pueden hacer peticiones al backend |
| `credentials` | `true` | Permite el envío de cookies y headers de autenticación (necesario para JWT) |
| `optionsSuccessStatus` | `200` | Código de estado HTTP para respuestas a peticiones preflight (OPTIONS) |

## Peticiones Preflight (OPTIONS)

Cuando el navegador detecta que se va a realizar una petición "compleja" (ej: POST, PUT, DELETE con headers personalizados), envía automáticamente una petición OPTIONS para verificar que CORS está correctamente configurado.

**Ejemplo de flujo:**

1. Frontend intenta hacer POST a `/api/auth/login`
2. Navegador envía automáticamente: `OPTIONS /api/auth/login`
3. Backend responde con headers CORS indicando que el origen está permitido
4. Navegador permite realizar el POST original

## Testing de Configuración CORS

### Script de Prueba Disponible

Se proporciona un script de testing automatizado para verificar la configuración de CORS:

```bash
npm run test:cors
```

**Ubicación del script**: `backend/scripts/test-cors.js`

Este script realiza tres tipos de pruebas:

1. **Test 1: Simple GET Request** - Verifica peticiones GET básicas
2. **Test 2: POST Request con JSON** - Verifica peticiones POST con body
3. **Test 3: Preflight OPTIONS** - Verifica peticiones OPTIONS (preflight)

### Ejecución del Test

```bash
cd backend
npm run test:cors
```

**Salida esperada en caso de éxito:**

```
✅ Headers CORS detectados
✅ CORS simple está configurado correctamente
✅ CORS Preflight configurado correctamente
```

**Indicadores en los logs:**

- ✅ Si ves `"Access-Control-Allow-Origin: http://localhost:3000"` = CORS funciona correctamente
- ❌ Si ves `"null"` o no existe el header = CORS no está configurado

## Configuración por Entorno

### Desarrollo Local

En desarrollo, la configuración por defecto utiliza:

```env
FRONTEND_URL=http://localhost:3000
```

### Producción

Al desplegar a producción, es **crítico** actualizar la variable de entorno `FRONTEND_URL` con el dominio real:

```env
FRONTEND_URL=https://tu-dominio-produccion.com
```

**⚠️ IMPORTANTE**: No permitir múltiples orígenes en producción por razones de seguridad. Especificar el dominio exacto.

## Headers CORS Implementados

El navegador recibe los siguientes headers en la respuesta del backend:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

Estos headers le indican al navegador que:
- El origen `http://localhost:3000` está autorizado
- Se pueden enviar credenciales (cookies, headers de autorización)
- Se permiten los métodos HTTP listados
- Se permiten headers personalizados

## Troubleshooting Común

### Error: "Access to XMLHttpRequest blocked by CORS policy"

**Causa**: El navegador está rechazando la petición porque CORS no está correctamente configurado.

**Soluciones**:

1. Verificar que `FRONTEND_URL` en el `.env` del backend coincide con el dominio del frontend
2. Asegurarse de que el backend está corriendo y accesible
3. Ejecutar `npm run test:cors` para diagnosticar el problema
4. Verificar que `credentials: true` está configurado si se usan headers de autenticación

### CORS funciona en desarrollo pero falla en producción

**Causa**: La variable de entorno `FRONTEND_URL` no está actualizada con el dominio de producción.

**Solución**: Actualizar la variable de entorno en el servidor de producción:

```env
FRONTEND_URL=https://dominio-produccion.com
```

## Consideraciones de Seguridad

### ✅ Buenas Prácticas Implementadas

- ✅ Permitir credenciales solo explícitamente cuando es necesario (`credentials: true`)
- ✅ Especificar el origen exacto, no usar `*` (wildcard)
- ✅ Usar HTTPS en producción para cifrar la comunicación
- ✅ Validar tokens JWT en cada petición

### ⚠️ Evitar en Producción

- ❌ No usar `origin: '*'` (permite cualquier origen)
- ❌ No exponer credenciales si no es necesario
- ❌ No permitir métodos HTTP innecesarios
- ❌ No permitir headers personalizados sin validación

## Referencias Adicionales

- [MDN Web Docs - CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
- [OWASP - Cross-Origin Resource Sharing (CORS)](https://owasp.org/www-community/Cross-Origin_Resource_Sharing_(CORS))
- [RFC 6454 - The Web Origin Concept](https://tools.ietf.org/html/rfc6454)

## Contacto y Soporte

Para preguntas sobre la configuración CORS de MindCare, contactar con:

- **Backend Lead**: Adrián Díaz Angulo ([@AdrianDiaz24](https://github.com/AdrianDiaz24))

