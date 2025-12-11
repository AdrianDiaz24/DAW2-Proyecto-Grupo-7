# Páginas Legales - MindCare

Este directorio contiene los componentes React para las páginas legales de MindCare.

## Archivos

### 1. Privacy.jsx
**Ruta:** `/legal/privacidad`

Política de Privacidad completa que cubre:
- Responsable del tratamiento de datos
- Datos personales que se recopilan
- Base legal para el tratamiento (RGPD)
- Cómo se utilizan los datos
- Compartición de datos
- Plazo de conservación
- Derechos de los usuarios (acceso, rectificación, supresión, portabilidad)
- Seguridad de datos
- Cambios en la política
- Contacto

**Cumplimiento Normativo:**
- RGPD (Reglamento General de Protección de Datos)
- LOreg 3/2018 (Ley de Protección de Datos de Salud)
- LSSI-CE (Ley de Servicios de la Sociedad de la Información)

### 2. Cookies.jsx
**Ruta:** `/legal/cookies`

Política de Cookies que detalla:
- Qué son las cookies
- Clasificación de cookies (técnicas, preferencias, analytics)
- Tabla de cookies utilizadas
- Cómo gestionar cookies en navegadores (Chrome, Firefox, Safari, Edge)
- Derechos del usuario
- Contacto

**Cumplimiento Normativo:**
- RGPD - Artículo 7 (consentimiento para cookies no esenciales)
- Directiva 2002/58/CE (Directiva sobre privacidad en comunicaciones)

### 3. Terms.jsx
**Ruta:** `/legal/terminos`

Términos de Servicio que incluyen:
- Aceptación de términos
- Naturaleza del servicio (IMPORTANTE: Aviso que no es diagnóstico médico)
- Requisitos de cuenta
- Conductas prohibidas
- Propiedad intelectual
- Descargos de responsabilidad
- Limitación de responsabilidad
- Suspensión y terminación de cuenta
- Cambios en términos
- Ley aplicable (España)
- Contacto
- Recursos de emergencia para crisis mental

**Cumplimiento Normativo:**
- Términos de Servicio personalizados para MindCare
- Responsabilidad limitada apropiada para aplicación de salud mental
- Cláusulas de emergencia médica

---

## Implementación

### 1. Registrar Rutas en App.js

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Privacy from './pages/Legal/Privacy';
import Cookies from './pages/Legal/Cookies';
import Terms from './pages/Legal/Terms';

function App() {
  return (
    <Router>
      <Routes>
        {/* Otras rutas */}
        <Route path="/legal/privacidad" element={<Privacy />} />
        <Route path="/legal/cookies" element={<Cookies />} />
        <Route path="/legal/terminos" element={<Terms />} />
      </Routes>
    </Router>
  );
}
```

### 2. Añadir Banner de Cookies

En el componente raíz (App.js o Layout.jsx):

```jsx
import CookieConsent from './components/molecules/CookieConsent';

function App() {
  return (
    <>
      <CookieConsent />
      {/* Contenido de la app */}
    </>
  );
}
```

### 3. Añadir Enlaces en Footer

```jsx
// components/layout/Footer.jsx
<footer>
  <nav>
    <Link to="/legal/privacidad">Política de Privacidad</Link>
    <Link to="/legal/cookies">Política de Cookies</Link>
    <Link to="/legal/terminos">Términos de Servicio</Link>
  </nav>
</footer>
```

### 4. Integrar en Formulario de Registro

```jsx
// pages/Register.js
<div>
  <input 
    type="checkbox" 
    id="privacy"
    required
  />
  <label htmlFor="privacy">
    He leído y acepto la {' '}
    <a href="/legal/privacidad" target="_blank">
      Política de Privacidad
    </a>
  </label>
</div>

<div>
  <input 
    type="checkbox" 
    id="terms"
    required
  />
  <label htmlFor="terms">
    Acepto los {' '}
    <a href="/legal/terminos" target="_blank">
      Términos de Servicio
    </a>
  </label>
</div>
```

---

## Endpoints Backend Requeridos

Para cumplir completamente con RGPD/Legislación, el backend debe proporcionar estos endpoints:

### 1. GET /api/usuarios/mis-datos
**Descripción:** Obtener todos los datos personales del usuario  
**Autenticación:** JWT requerido  
**Respuesta:**
```json
{
  "usuario": {
    "id": "...",
    "nombre": "...",
    "email": "...",
    "fechaRegistro": "...",
    "ultimoAcceso": "..."
  },
  "registros": ["..."],
  "diarios": ["..."],
  "emociones": ["..."]
}
```

### 2. GET /api/usuarios/exportar-datos
**Descripción:** Descargar datos en formato JSON (Derecho de Portabilidad)  
**Autenticación:** JWT requerido  
**Respuesta:** Archivo JSON descargable  
**Nombre de archivo:** `mindcare-datos-${usuario}_${fecha}.json`

### 3. DELETE /api/usuarios/:id
**Descripción:** Solicitar eliminación de cuenta (Derecho al Olvido)  
**Autenticación:** JWT requerido  
**Body:**
```json
{
  "confirmacion": "ELIMINAR"
}
```
**Respuesta:**
```json
{
  "mensaje": "Solicitud recibida. Verifica tu email para confirmar.",
  "diasParaConfirmar": 7
}
```

### 4. PUT /api/usuarios/:id
**Descripción:** Actualizar datos personales (Derecho de Rectificación)  
**Autenticación:** JWT requerido  
**Body:**
```json
{
  "nombre": "Nuevo nombre",
  "email": "nuevo@email.com"
}
```

---

## Testing de Cumplimiento

### Checklist Antes del Lanzamiento

- [ ] Banner de cookies visible en primera visita
- [ ] Banner tiene opciones: Aceptar, Rechazar, Personalizar
- [ ] Decisión de cookies guardada en localStorage
- [ ] `/legal/privacidad` es accesible
- [ ] `/legal/cookies` es accesible
- [ ] `/legal/terminos` es accesible
- [ ] Formulario de registro tiene checkboxes de aceptación (obligatorios)
- [ ] Enlaces en footer apuntan a páginas legales
- [ ] Página de términos menciona "no es diagnóstico médico"
- [ ] Página de privacidad menciona derechos RGPD
- [ ] Endpoint GET /api/usuarios/mis-datos funciona
- [ ] Endpoint GET /api/usuarios/exportar-datos funciona
- [ ] Endpoint DELETE /api/usuarios/:id funciona
- [ ] Contraseñas están hasheadas con bcrypt
- [ ] JWT tiene expiración (24h recomendado)
- [ ] HTTPS está habilitado
- [ ] Variables de entorno no están en código
- [ ] Logs de auditoría registran accesos/cambios

---

## Recursos Adicionales

- [RGPD Oficial](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679)
- [Documentación Legislación MindCare](/docs/legislacion.md)
- [WCAG 2.1 (Accesibilidad)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material-UI Accessibility](https://mui.com/material-ui/guides/accessibility/)

---

**Última actualización:** Diciembre 2025  
**Responsable:** Grupo 7 - DAW2

