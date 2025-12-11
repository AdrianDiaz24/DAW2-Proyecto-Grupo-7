import React from 'react';
import { Container, Typography, Box, Divider, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Privacy() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Política de Privacidad
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Última actualización: Diciembre 2025
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          1. Responsable del Tratamiento de Datos
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Grupo 7 - DAW2</strong>
          <br />
          Proyecto educativo: MindCare
          <br />
          Propósito: Aplicación de apoyo para la salud mental y bienestar personal
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          2. Datos Personales que Recogemos
        </Typography>
        <Typography variant="body1" paragraph>
          Al usar MindCare, recopilamos los siguientes datos personales:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Datos de Registro:</strong> Nombre de usuario, email, contraseña (cifrada)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Datos de Salud Mental:</strong> Emociones registradas, entradas de diario personal, puntuaciones de bienestar
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Datos de Actividad:</strong> Fecha y hora de acceso, acciones realizadas en la plataforma
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo (a través de cookies y logs)
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          3. Base Legal para el Tratamiento
        </Typography>
        <Typography variant="body1" paragraph>
          El tratamiento de tus datos personales se realiza con base en:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Consentimiento explícito:</strong> Artículo 6.1.a RGPD - Aceptas nuestra política al registrarte
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Datos sensibles de salud:</strong> Artículo 9.2.a RGPD - Consentimiento explícito para datos de salud mental
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Cumplimiento legal:</strong> Artículo 6.1.c RGPD - Para el cumplimiento de obligaciones legales
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          4. Cómo Usamos Tus Datos
        </Typography>
        <Typography variant="body1" paragraph>
          Utilizamos tus datos personales para:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Crear y mantener tu cuenta de usuario
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Proporcionarte los servicios de MindCare (diario, seguimiento de emociones, recomendaciones de bienestar)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Mejorar la aplicación basándonos en datos anonimizados
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Enviarte notificaciones importantes sobre cambios en nuestra política
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Cumplir con requisitos legales y regularortios
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', backgroundColor: '#fff3cd', p: 2, borderRadius: 1 }}>
          ⚠️ <strong>IMPORTANTE:</strong> MindCare no utiliza tus datos para perfilado discriminatorio, publicidad dirigida, o venta a terceros. Respetamos completamente tu privacidad.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          5. Compartición de Datos
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Tus datos NO se comparten con terceros</strong>, excepto:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Proveedores de servicios:</strong> MongoDB Atlas (almacenamiento), SendGrid (notificaciones), Grok AI (análisis de bienestar)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Obligaciones legales:</strong> Si una autoridad judicial lo requiere
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Datos anonimizados:</strong> Podemos compartir estadísticas anonimizadas para investigación
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          6. Plazo de Conservación de Datos
        </Typography>
        <Typography variant="body1" paragraph>
          Conservamos tus datos durante:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Mientras tu cuenta esté activa:</strong> Guardamos todos tus datos
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Tras solicitar eliminación:</strong> 7 días para confirmación por email, después eliminación completa
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Logs de auditoría:</strong> Se conservan por 6 meses por razones de seguridad
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          7. Tus Derechos
        </Typography>
        <Typography variant="body1" paragraph>
          Tienes derecho a:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Acceso:</strong> Solicitar una copia de todos tus datos en formato JSON
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Rectificación:</strong> Corregir datos incorrectos desde tu perfil
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Supresión (Derecho al Olvido):</strong> Eliminar tu cuenta y todos tus datos
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado y reutilizable
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Oposición:</strong> Optar por no recibir comunicaciones de marketing (aunque no enviamos)
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
          Para ejercer cualquiera de estos derechos, contacta con nosotros en <strong>grupo7@mindcare.edu</strong>
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          8. Seguridad de Datos
        </Typography>
        <Typography variant="body1" paragraph>
          Implementamos medidas de seguridad avanzadas:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              <strong>Cifrado de contraseñas:</strong> Algoritmo bcrypt con 10 salt rounds
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Comunicaciones HTTPS:</strong> Todas las conexiones cifradas con TLS
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Autenticación JWT:</strong> Tokens con expiración de 24 horas
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Copias de seguridad:</strong> MongoDB Atlas con backups automáticos diarios
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              <strong>Rate limiting:</strong> Protección contra ataques de fuerza bruta
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          9. Advertencia Importante sobre Salud Mental
        </Typography>
        <Box sx={{
          p: 3,
          backgroundColor: '#ffebee',
          border: '2px solid #d32f2f',
          borderRadius: 1,
          mb: 2
        }}>
          <Typography variant="body1" sx={{ color: '#c62828', fontWeight: 'bold' }}>
            ⚠️ AVISO CRÍTICO
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>MindCare NO es un servicio médico.</strong> Es una herramienta de apoyo para el bienestar personal.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Los datos que registres (emociones, diarios) no constituyen diagnósticos médicos. Si experimentas:
          </Typography>
          <List sx={{ pl: 2, mt: 1 }}>
            <ListItem>
              <Typography variant="body2">Pensamientos suicidas</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">Crisis mental aguda</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">Síntomas de trastornos mentales graves</Typography>
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
            CONTACTA INMEDIATAMENTE CON:
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            • <strong>Teléfono de Prevención del Suicidio (España):</strong> 024<br />
            • <strong>Emergencias médicas:</strong> 112<br />
            • <strong>Profesional de salud mental:</strong> Tu médico de cabecera
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          10. Cambios en esta Política
        </Typography>
        <Typography variant="body1" paragraph>
          Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios importantes a través de tu email. El uso continuado de MindCare tras los cambios implica aceptación de la nueva política.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          11. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Para preguntas sobre privacidad o para ejercer tus derechos:
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> grupo7@mindcare.edu
        </Typography>
        <Typography variant="body2">
          <strong>Proyecto:</strong> MindCare - DAW2 Grupo 7
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

export default Privacy;

