import React from 'react';
import { Container, Typography, Box, Divider, List, ListItem } from '@mui/material';

export function Terms() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Términos de Servicio
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Última actualización: Diciembre 2025
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 2, backgroundColor: '#ffebee', borderRadius: 1, border: '1px solid #ef5350' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#c62828' }}>
          ⚠️ IMPORTANTE: Al acceder y usar MindCare, aceptas estos términos de servicio en su totalidad. Si no aceptas, no puedes usar el servicio.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          1. Aceptación de Términos
        </Typography>
        <Typography variant="body1" paragraph>
          Al registrarte y usar MindCare, confirmas que:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Has leído, entendido y aceptas estos Términos de Servicio
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Aceptas la Política de Privacidad de MindCare
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Tienes al menos 18 años de edad (o consentimiento de un tutor legal)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Utilizarás MindCare de acuerdo con las leyes aplicables
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          2. Naturaleza y Propósito del Servicio
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          ¿Qué es MindCare?
        </Typography>
        <Typography variant="body1" paragraph>
          MindCare es una aplicación web diseñada como herramienta de apoyo para el bienestar personal y la salud mental. Te permite:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Registrar y monitorizar tus emociones diarias
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Mantener un diario personal de reflexiones y pensamientos
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Recibir sugerencias de bienestar basadas en tu estado emocional
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Realizar seguimiento de tu progreso mental
            </Typography>
          </ListItem>
        </List>

        <Box sx={{ mt: 3, p: 2, backgroundColor: '#ffebee', borderRadius: 1, border: '2px solid #d32f2f' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#c62828' }}>
            🚨 AVISO CRÍTICO - NO ES UN SERVICIO MÉDICO
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>MindCare NO es un servicio de atención médica, diagnóstico o tratamiento.</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Los datos que registres en MindCare:
          </Typography>
          <List sx={{ pl: 2, mt: 1 }}>
            <ListItem>
              <Typography variant="body2">
                ❌ NO constituyen diagnósticos médicos
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                ❌ NO reemplazan la atención médica profesional
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                ❌ NO deben ser usados como único tratamiento para trastornos mentales
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                ⚠️ SIEMPRE consulta a un profesional de salud mental si lo consideras necesario
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          3. Requisitos de Cuenta de Usuario
        </Typography>
        <Typography variant="body1" paragraph>
          Para usar MindCare, debes crear una cuenta. Aceptas que:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Proporcionarás información precisa, veraz y completa en el registro
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Eres responsable de mantener la confidencialidad de tu contraseña
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Eres responsable de todas las actividades bajo tu cuenta
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Notificarás inmediatamente de acceso no autorizado a tu cuenta
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              No compartirás tu cuenta con otras personas
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          4. Conductas Prohibidas
        </Typography>
        <Typography variant="body1" paragraph>
          No puedes usar MindCare para:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Acceder a cuentas de otros usuarios sin autorización
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Intentar quebrantar o eludir medidas de seguridad
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Usar scripts, bots o herramientas de automatización
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Reproducir, duplicar o copiar contenido sin permiso
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Subir, compartir o promover contenido ilegal o dañino
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Enviar spam, mensajes abusivos o contenido ofensivo
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Realizar ataques cibernéticos o intentos de acceso no autorizado
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Recopilar o rastrear información personal de otros usuarios
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Usar MindCare para actividades ilegales o contrarias a estas condiciones
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          5. Propiedad Intelectual
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Contenido de MindCare
        </Typography>
        <Typography variant="body1" paragraph>
          MindCare, su interfaz, logo, diseño y funcionalidades son propiedad intelectual del Grupo 7 - DAW2 o de sus proveedores. No puedes:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Copiar o reproducir el código fuente
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Vender, licenciar o transferir MindCare a terceros
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Crear obras derivadas basadas en MindCare
            </Typography>
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Tu Contenido
        </Typography>
        <Typography variant="body1" paragraph>
          Los datos que registres en MindCare (emociones, diarios, información personal):
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              ✅ Son propiedad tuya
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ✅ Puedes eliminarlos en cualquier momento solicitando supresión de cuenta
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ✅ No serán vendidos, compartidos o usados sin tu consentimiento
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              ⚠️ Al usar MindCare, nos autorizas a almacenar, procesar y usar tus datos según la Política de Privacidad
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          6. Descargos de Responsabilidad
        </Typography>
        <Typography variant="body1" paragraph>
          MindCare se proporciona "TAL COMO ESTÁ" sin garantías de ningún tipo.
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              MindCare NO es responsable de diagnósticos erróneos, consejos de bienestar imprecisos, o consecuencias de usar la aplicación
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              MindCare NO es responsable de pérdida de datos, interrupciones del servicio, o cualquier daño indirecto
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              MindCare NO es responsable de conducta de otros usuarios
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              MindCare NO garantiza disponibilidad continua del servicio (puede haber mantenimiento)
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          7. Limitación de Responsabilidad
        </Typography>
        <Typography variant="body1" paragraph>
          En ningún caso MindCare será responsable por:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Daños directos, indirectos, incidentales, especiales o consecuentes
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Pérdida de ingresos, datos, oportunidades o reputación
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Ninguna reclamación excederá la cantidad que pagaste por MindCare (que es gratuita)
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          8. Suspensión y Terminación de Cuenta
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Cuándo MindCare Puede Suspender tu Cuenta
        </Typography>
        <Typography variant="body1" paragraph>
          MindCare se reserva el derecho de suspender o eliminar tu cuenta si:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Violas estos Términos de Servicio
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Realizas actividades maliciosas o ilegales
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Incumples la Política de Privacidad
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Proporcionaste información falsa en el registro
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Tu actividad daña a otros usuarios o a MindCare
            </Typography>
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
          Cómo Eliminar tu Cuenta
        </Typography>
        <Typography variant="body1" paragraph>
          Puedes eliminar tu cuenta en cualquier momento desde <strong>Configuración → Privacidad → Eliminar Cuenta</strong>.
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem>
            <Typography variant="body2">
              Se te enviará un email de confirmación
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Tienes 7 días para confirmar la eliminación
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Una vez confirmado, todos tus datos se borran permanentemente
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              Esta acción es IRREVERSIBLE
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          9. Cambios en estos Términos
        </Typography>
        <Typography variant="body1" paragraph>
          Podemos modificar estos Términos de Servicio en cualquier momento. Los cambios importantes te serán notificados por email. El uso continuado de MindCare tras los cambios implica aceptación de los nuevos términos.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          10. Ley Aplicable y Jurisdicción
        </Typography>
        <Typography variant="body1" paragraph>
          Estos Términos de Servicio se rigen por las leyes de España. Cualquier disputa se resolverá en los juzgados competentes de España, bajo la ley española.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          11. Contacto
        </Typography>
        <Typography variant="body1" paragraph>
          Si tienes preguntas sobre estos Términos de Servicio:
        </Typography>
        <Typography variant="body2">
          <strong>Email:</strong> grupo7@mindcare.edu
        </Typography>
        <Typography variant="body2">
          <strong>Proyecto:</strong> MindCare - DAW2 Grupo 7
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1, border: '1px solid #1976d2' }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
          ℹ️ RECORDATORIO: Si experimentas una crisis mental, no esperes a usar MindCare. Contacta inmediatamente con:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          🚨 <strong>España - Teléfono de Prevención del Suicidio:</strong> <strong>024</strong><br />
          🚨 <strong>Emergencias Médicas:</strong> <strong>112</strong><br />
          🚨 <strong>Tu médico de cabecera o profesional de salud mental</strong>
        </Typography>
      </Box>

      <Box sx={{ mt: 6, p: 3, backgroundColor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Última actualización: Diciembre 2025
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Responsable Legal: Grupo 7 - DAW2
        </Typography>
      </Box>
    </Container>
  );
}

export default Terms;

