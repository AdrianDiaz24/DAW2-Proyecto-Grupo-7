# 🚀 GUÍA RÁPIDA DE INTEGRACIÓN - PÁGINAS LEGALES

**Objetivo:** Integrar las páginas legales (Privacidad, Cookies, Términos) en el frontend de MindCare  
**Tiempo estimado:** 30 minutos  
**Nivel:** Intermedio

---

## 📋 ANTES DE COMENZAR

Verifica que tengas:
- ✅ Acceso al repositorio del proyecto
- ✅ Frontend React corriendo en local
- ✅ React Router configurado en App.js
- ✅ Material-UI instalado

---

## 📂 PASO 1: VERIFICAR ARCHIVOS CREADOS

Los siguientes archivos ya han sido creados y están listos para usar:

```
frontend/src/pages/Legal/
├── Privacy.jsx ............... Política de Privacidad
├── Cookies.jsx ............... Política de Cookies
├── Terms.jsx ................. Términos de Servicio
└── README.md ................. Documentación

frontend/src/components/molecules/
└── CookieConsent.jsx ......... Banner de cookies
```

Verifica que existan en tu repositorio.

---

## 🔗 PASO 2: REGISTRAR RUTAS EN App.js

**Archivo:** `frontend/src/App.js`

### 2.1 Importar componentes legales

```jsx
// En la sección de imports
import Privacy from './pages/Legal/Privacy';
import Cookies from './pages/Legal/Cookies';
import Terms from './pages/Legal/Terms';
```

### 2.2 Añadir rutas en Routes

```jsx
<Routes>
  {/* Rutas existentes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  
  {/* ⬇️ NUEVAS RUTAS LEGALES ⬇️ */}
  <Route path="/legal/privacidad" element={<Privacy />} />
  <Route path="/legal/cookies" element={<Cookies />} />
  <Route path="/legal/terminos" element={<Terms />} />
  
  {/* Más rutas... */}
</Routes>
```

**Resultado esperado:** 
- `http://localhost:3000/legal/privacidad` → Abre Privacy.jsx
- `http://localhost:3000/legal/cookies` → Abre Cookies.jsx
- `http://localhost:3000/legal/terminos` → Abre Terms.jsx

---

## 🍪 PASO 3: INTEGRAR BANNER DE COOKIES

**Archivo:** `frontend/src/App.js`

### 3.1 Importar componente

```jsx
import CookieConsent from './components/molecules/CookieConsent';
```

### 3.2 Añadir en el JSX (arriba de todo)

```jsx
function App() {
  return (
    <>
      <CookieConsent /> {/* ← Añadir aquí (primera línea) */}
      
      <Router>
        {/* Resto del contenido */}
      </Router>
    </>
  );
}
```

**Resultado esperado:**
- Primera vez que accedas → Banner aparece abajo
- Usuario elige: Aceptar, Rechazar, Personalizar
- Decisión se guarda en localStorage

---

## 🔗 PASO 4: AÑADIR ENLACES EN FOOTER

**Archivo:** `frontend/src/components/layout/Footer.jsx`

Si no existe, créalo o actualízalo con:

```jsx
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Container>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 2 }}>
          <Link to="/legal/privacidad" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Política de Privacidad
          </Link>
          <Link to="/legal/cookies" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Política de Cookies
          </Link>
          <Link to="/legal/terminos" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Términos de Servicio
          </Link>
        </Box>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2025 MindCare - Grupo 7 DAW2. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
```

**Resultado esperado:**
- Footer aparece con 3 enlaces
- Clics llevan a páginas legales

---

## ✓ PASO 5: VERIFICAR EN NAVEGADOR

### 5.1 Verifica que todo funcione

```bash
npm start
```

### 5.2 Prueba cada funcionalidad

1. **Banner de Cookies**
   - [ ] Aparece en primera visita
   - [ ] Tiene botones: Aceptar, Rechazar, Personalizar
   - [ ] Al aceptar, no vuelve a aparecer
   - [ ] localStorage("cookieConsent") está guardado

2. **Página `/legal/privacidad`
   - [ ] Abre sin errores
   - [ ] Contiene:
     - [ ] Título "Política de Privacidad"
     - [ ] Derechos RGPD explicados
     - [ ] Contacto: grupo7@mindcare.edu
     - [ ] Links a otras páginas legales

3. **Página `/legal/cookies`
   - [ ] Abre sin errores
   - [ ] Tabla de cookies visible
   - [ ] Instrucciones por navegador
   - [ ] Banner de gestión de preferencias

4. **Página `/legal/terminos`
   - [ ] Abre sin errores
   - [ ] ⚠️ AVISO crítico visible: "No es diagnóstico médico"
   - [ ] Teléfono de emergencia (024 España)
   - [ ] Términos claros y legibles

5. **Footer**
   - [ ] 3 links visibles
   - [ ] Clics funcionan y llevan a páginas legales

---

## 📋 PASO 6: OPCIONAL - INTEGRAR EN FORMULARIO DE REGISTRO

**Archivo:** `frontend/src/pages/Register.js`

Añade checkboxes de aceptación obligatorios:

```jsx
import { Box, Checkbox, FormControlLabel, Link } from '@mui/material';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    acceptPrivacy: false,
    acceptTerms: false,
  });

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box>
      {/* Campos existentes: email, password, nombre */}

      {/* ⬇️ NUEVAS CASILLAS DE ACEPTACIÓN ⬇️ */}
      <Box sx={{ my: 2 }}>
        <FormControlLabel
          required
          control={
            <Checkbox
              name="acceptPrivacy"
              checked={formData.acceptPrivacy}
              onChange={handleCheckboxChange}
            />
          }
          label={
            <>
              He leído y acepto la{' '}
              <Link href="/legal/privacidad" target="_blank">
                Política de Privacidad
              </Link>
            </>
          }
        />
        <FormControlLabel
          required
          control={
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleCheckboxChange}
            />
          }
          label={
            <>
              Acepto los{' '}
              <Link href="/legal/terminos" target="_blank">
                Términos de Servicio
              </Link>
            </>
          }
        />
      </Box>

      {/* Botón de envío */}
      <Button
        disabled={!formData.acceptPrivacy || !formData.acceptTerms}
      >
        Registrarse
      </Button>
    </Box>
  );
}
```

**Resultado:**
- Checkboxes con links a páginas legales
- Botón deshabilitado hasta que acepta ambas

---

## 🧪 PASO 7: TESTING DE CUMPLIMIENTO LEGISLATIVO

### Checklist de Validación

```
RGPD:
- [ ] Página privacidad accesible en /legal/privacidad
- [ ] Derechos RGPD explicados (acceso, rectificación, supresión, portabilidad)
- [ ] Email de contacto para ejercer derechos: grupo7@mindcare.edu
- [ ] Aviso de que datos se cifran y protegen

COOKIES:
- [ ] Banner visible en primera visita
- [ ] Opciones: Aceptar Todo, Rechazar, Personalizar
- [ ] localStorage guardando decisión
- [ ] No hay cookies analytics si usuario rechaza

TÉRMINOS:
- [ ] Página términos accesible en /legal/terminos
- [ ] AVISO CRÍTICO: "No es diagnóstico médico"
- [ ] Teléfono emergencia: 024 (España)
- [ ] Limitación de responsabilidad clara

ACCESIBILIDAD:
- [ ] Todas las páginas legibles sin zoom
- [ ] Contraste de colores adecuado (4.5:1)
- [ ] Navegables con teclado (Tab, Enter)
- [ ] Compatibles con lectores de pantalla
```

---

## 🛠️ TROUBLESHOOTING

### Problema: "Cannot find module './pages/Legal/Privacy'"

**Solución:**
```bash
# Verifica que los archivos existen
ls frontend/src/pages/Legal/

# Si no existen, cópialos desde docs/
# Los archivos .jsx están en el repositorio
```

### Problema: Banner de cookies no aparece

**Solución:**
```jsx
// En App.js, verifica que CookieConsent está FUERA de <Router>
<>
  <CookieConsent /> {/* ← Debe estar aquí */}
  <Router>
    {/* Contenido */}
  </Router>
</>
```

### Problema: Enlaces del footer dan 404

**Solución:**
```jsx
// Usa Link de React Router, no <a>
import { Link } from 'react-router-dom';

<Link to="/legal/privacidad">Política de Privacidad</Link>
```

### Problema: Estilos de Material-UI no aplican

**Solución:**
```bash
# Instala @mui/material si no está
npm install @mui/material @emotion/react @emotion/styled

# Verifica en package.json que tiene versión 5.x
npm ls @mui/material
```

---

## 📚 DOCUMENTACIÓN ADICIONAL

- **Legislación completa:** `/docs/legislacion.md`
- **Guía de páginas legales:** `/frontend/src/pages/Legal/README.md`
- **Resumen Fase 3:** `/docs/FASE3-RESUMEN.md`
- **Checklist de cumplimiento:** `/CHECKLIST-FASE3.md`

---

## ✅ SIGUIENTE PASO

Una vez integradas las páginas legales, se recomienda:

1. **Backend - Implementar endpoints RGPD:**
   - POST `/api/usuarios/solicitar-supresion`
   - GET `/api/usuarios/mis-datos`
   - GET `/api/usuarios/exportar-datos`

2. **Testing:** Verificar que banners y checkboxes funcionan

3. **Deployment:** Subir a Vercel/producción

4. **Monitorización:** Verificar que nadie reporta problemas de accesibilidad

---

## 💡 TIPS FINALES

- 🔐 Datos de usuarios en localStorage (cookieConsent) son locales, no se envían a servidor
- 📱 Páginas legales son responsivas (mobile-friendly con Material-UI)
- ♿ Cumplen WCAG 2.1 AA (accesibilidad web)
- 🌍 Están en español (España)
- 📖 Son legibles y entiendibles por usuarios normales (no jerga legal pesada)

---

**¿Necesitas ayuda?** Consulta `/frontend/src/pages/Legal/README.md`

**Tiempo estimado:** 30 minutos  
**Nivel de dificultad:** ⭐⭐ Bajo-Medio  
**Beneficio:** Cumplimiento RGPD + Protección legal completa ✅

