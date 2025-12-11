import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Link, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentChoices, setConsentChoices] = useState({
    technical: true, // Siempre activas
    analytics: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    // Mostrar banner solo si no hay decisión previa
    if (!consent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(consent);
      setConsentChoices(parsedConsent);
      initializeAnalytics(parsedConsent.analytics);
    }
  }, []);

  const initializeAnalytics = (analyticsEnabled) => {
    if (analyticsEnabled) {
      // Inicializar Google Analytics si está habilitado
      // window.gtag ? window.gtag('consent', 'update', {...}) : null;
      console.log('Analytics habilitado');
    } else {
      console.log('Analytics deshabilitado');
    }
  };

  const handleAcceptAll = () => {
    const choices = {
      technical: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(choices));
    setConsentChoices(choices);
    initializeAnalytics(true);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const choices = {
      technical: true, // Técnicas siempre activas
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(choices));
    setConsentChoices(choices);
    initializeAnalytics(false);
    setShowBanner(false);
  };

  const handleOpenSettings = () => {
    // Navegar a página de configuración de cookies
    navigate('/configuracion/privacidad');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '20px',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{ mb: 2, lineHeight: 1.6 }}
        >
          Utilizamos <strong>cookies</strong> para mejorar tu experiencia en MindCare. Algunas son esenciales para que la aplicación funcione, mientras que otras nos ayudan a entender cómo la usas para mejorarla.
        </Typography>

        <Typography
          variant="caption"
          sx={{ mb: 2, display: 'block' }}
        >
          <Link href="/legal/cookies" target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: 'underline' }}>
            Ver nuestra Política de Cookies completa
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            onClick={handleAcceptAll}
          >
            ✓ Aceptar todas
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            onClick={handleRejectAll}
          >
            ✕ Solo técnicas
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            onClick={handleOpenSettings}
          >
            ⚙️ Personalizar
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{ mt: 2, display: 'block', color: '#aaa' }}
        >
          Puedes cambiar tus preferencias en cualquier momento desde Menú → Configuración → Privacidad
        </Typography>
      </Container>
    </Box>
  );
}

export default CookieConsent;

