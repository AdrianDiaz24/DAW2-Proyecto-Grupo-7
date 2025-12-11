#!/bin/sh
set -e

# Establecer puerto por defecto si no está definido (útil para desarrollo local)
export PORT=${PORT:-80}

echo "Configurando Nginx en el puerto ${PORT}..."

# Sustituir la variable PORT en la configuración de Nginx
# Usamos envsubst que viene incluido en la imagen nginx:alpine
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf > /tmp/default.conf
cat /tmp/default.conf > /etc/nginx/conf.d/default.conf
rm /tmp/default.conf

echo "Iniciando Nginx..."

# Iniciar Nginx
exec nginx -g 'daemon off;'

