import React from 'react';
import { Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem } from '@mui/material';

export function Cookies() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Política de Cookies
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Última actualización: Diciembre 2025
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          ¿Qué son las Cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Se utilizan para recordar información sobre ti, mejorar tu experiencia y, en algunos casos, recopilar datos estadísticos.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Cookies que Utiliza MindCare
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          A continuación se detalla cada cookie que utilizamos, su propósito y si requiere tu consentimiento:
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Propósito</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Expiración</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Consentimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>session_id</TableCell>
                <TableCell>Técnica</TableCell>
                <TableCell>Mantener tu sesión activa</TableCell>
                <TableCell>Al cerrar navegador</TableCell>
                <TableCell>No (Esencial)</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>jwt_token</TableCell>
                <TableCell>Técnica</TableCell>
                <TableCell>Autenticación y autorización</TableCell>
                <TableCell>24 horas</TableCell>
                <TableCell>No (Esencial)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>csrf_token</TableCell>
                <TableCell>Técnica</TableCell>
                <TableCell>Protección contra ataques CSRF</TableCell>
                <TableCell>Sesión</TableCell>
                <TableCell>No (Esencial)</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>theme</TableCell>
                <TableCell>Preferencias</TableCell>
                <TableCell>Guardar tu preferencia de tema (claro/oscuro)</TableCell>
                <TableCell>1 año</TableCell>
                <TableCell>No (Preferencia)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>language</TableCell>
                <TableCell>Preferencias</TableCell>
                <TableCell>Recordar tu idioma preferido</TableCell>
                <TableCell>1 año</TableCell>
                <TableCell>No (Preferencia)</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>cookieConsent</TableCell>
                <TableCell>Preferencias</TableCell>
                <TableCell>Recordar tus preferencias de cookies</TableCell>
                <TableCell>1 año</TableCell>
                <TableCell>No (Necesaria para recordar consentimiento)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>_ga</TableCell>
                <TableCell>Analytics</TableCell>
                <TableCell>Google Analytics - Estadísticas de uso</TableCell>
                <TableCell>2 años</TableCell>
                <TableCell><strong>Sí (Requerido)</strong></TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell>_gid</TableCell>
                <TableCell>Analytics</TableCell>
                <TableCell>Google Analytics - Sesión del navegador</TableCell>
                <TableCell>24 horas</TableCell>
                <TableCell><strong>Sí (Requerido)</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Clasificación de Cookies por Tipo
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
          🔒 Cookies Técnicas (Esenciales)
        </Typography>
        <Typography variant="body2" paragraph sx={{ mb: 2 }}>
          Estas cookies son NECESARIAS para que MindCare funcione correctamente. Sin ellas, no podrías acceder a tu cuenta ni usar la aplicación.
        </Typography>
        <List sx={{ pl: 2, backgroundColor: '#e8f5e9', p: 2, borderRadius: 1 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>session_id:</strong> Mantiene tu sesión activa mientras navegas
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>jwt_token:</strong> Autentica tu identidad en cada solicitud
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>csrf_token:</strong> Protege contra ataques de falsificación de solicitud entre sitios
            </Typography>
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
          ⚙️ Cookies de Preferencias
        </Typography>
        <Typography variant="body2" paragraph sx={{ mb: 2 }}>
          Estas cookies guardan tus preferencias personales (tema, idioma) para mejorar tu experiencia.
        </Typography>
        <List sx={{ pl: 2, backgroundColor: '#fff3e0', p: 2, borderRadius: 1 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>theme:</strong> Recuerda si prefieres modo claro u oscuro
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>language:</strong> Recuerda tu idioma seleccionado
            </Typography>
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
          📊 Cookies de Analytics
        </Typography>
        <Typography variant="body2" paragraph sx={{ mb: 2 }}>
          <strong>REQUIEREN tu consentimiento explícito.</strong> Se utilizan para recopilar estadísticas sobre cómo se usa MindCare, permitiéndonos mejorar la aplicación.
        </Typography>
        <List sx={{ pl: 2, backgroundColor: '#e3f2fd', p: 2, borderRadius: 1 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>_ga, _gid:</strong> Google Analytics - Número de usuarios, páginas visitadas, duración de sesión (datos anonimizados)
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Tu Derecho a Rechazar Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Cuando accedes a MindCare por primera vez, se muestra un <strong>banner de cookies</strong> que te da las siguientes opciones:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Aceptar todas:</strong> Se habilitan todas las cookies (técnicas + analytics)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Rechazar:</strong> Solo se activan cookies técnicas (esenciales para el funcionamiento)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Personalizar:</strong> Eliges cuáles cookies quieres permitir
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: '#fff3cd', borderRadius: 1 }}>
          Tu decisión se guarda en la cookie <strong>cookieConsent</strong> durante 1 año. Puedes cambiar tu preferencia en cualquier momento desde <strong>Menú → Configuración → Privacidad</strong>.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Cómo Gestionar Cookies en tu Navegador
        </Typography>
        <Typography variant="body1" paragraph>
          Puedes controlar cómo tu navegador maneja las cookies:
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Chrome
        </Typography>
        <Typography variant="body2" paragraph>
          Configuración → Privacidad y seguridad → Cookies y otros datos de sitios → Mostrar todas las cookies y datos del sitio
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Firefox
        </Typography>
        <Typography variant="body2" paragraph>
          Opciones → Privacidad y seguridad → Cookies y datos de sitios
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Safari
        </Typography>
        <Typography variant="body2" paragraph>
          Preferencias → Privacidad → Cookies y datos de sitios web
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Edge
        </Typography>
        <Typography variant="body2" paragraph>
          Configuración → Privacidad → Cookies y permisos del sitio
        </Typography>

        <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1, color: '#c62828' }}>
          ⚠️ <strong>Advertencia:</strong> Si desactivas todas las cookies, es posible que MindCare no funcione correctamente. Las cookies técnicas (session_id, jwt_token) son ESENCIALES.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Respeto por tu Privacidad
        </Typography>
        <Typography variant="body1" paragraph>
          MindCare respeta tu privacidad:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              ✅ No vendemos datos a terceros
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ✅ No rastreamos tu navegación fuera de MindCare
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ✅ No usamos publicidad dirigida o perfilado
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ✅ Respetamos la preferencia "No rastrear" del navegador (Do Not Track)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ✅ Solo usamos Google Analytics para estadísticas generales (cuando aceptas)
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes dudas sobre nuestras cookies o deseas gestionar tu consentimiento:
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> grupo7@mindcare.edu
        </Typography>
        <Typography variant="body2">
          <strong>Consulta:</strong> Ve a Menú → Configuración → Privacidad
        </Typography>
      </Box>

      <Box sx={{ mt: 6, p: 3, backgroundColor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Última actualización: Diciembre 2025
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Responsable de Privacidad: Adrián Díaz Angulo
        </Typography>
      </Box>
    </Container>
  );
}

export default Cookies;

