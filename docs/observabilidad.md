# Observabilidad y Monitoreo

Este documento describe la infraestructura de observabilidad implementada en MindCare para monitoreo, logging y recolección de métricas.

## Descripción General

La solución de observabilidad consta de tres componentes principales:

1. **Morgan** - Logging de peticiones HTTP
2. **Winston** - Logging estructurado y rotación de logs
3. **Prometheus** - Recolección y exposición de métricas

## Arquitectura

```
┌─────────────────┐
│  HTTP Requests  │
└────────┬────────┘
         │
         ▼
┌────────────────────────────┐
│  Metrics Middleware        │
│ - Duración de request      │
│ - Status code              │
│ - Errores HTTP             │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│  Morgan Logger             │
│ - Log HTTP en console      │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│  Winston Logger            │
│ - Logs a archivos          │
│ - Rotación diaria          │
│ - Logs separados error     │
└────────────────────────────┘

┌─────────────────────────────────────┐
│  Prometheus Metrics Registry        │
│ - HTTP metrics                      │
│ - Auth metrics                      │
│ - MongoDB metrics                   │
│ - Expuesto en /api/metrics          │
└─────────────────────────────────────┘
```

## Metricas Disponibles

### Métricas HTTP

#### `http_request_duration_seconds` (Histogram)
Duración de las peticiones HTTP en segundos.

**Labels:**
- `method`: Método HTTP (GET, POST, PUT, DELETE, etc.)
- `route`: Ruta de la petición
- `status_code`: Código de estado HTTP

**Ejemplo:**
```
http_request_duration_seconds_bucket{method="POST",route="/api/auth/login",status_code="200",le="0.01"} 5
```

#### `http_requests_total` (Counter)
Total de peticiones HTTP procesadas.

**Labels:**
- `method`: Método HTTP
- `route`: Ruta de la petición
- `status_code`: Código de estado HTTP

#### `http_errors_total` (Counter)
Total de errores HTTP (4xx y 5xx).

**Labels:**
- `method`: Método HTTP
- `route`: Ruta de la petición
- `error_type`: `client_error` (4xx) o `server_error` (5xx)

### Métricas de Autenticación

#### `auth_attempts_total` (Counter)
Total de intentos de autenticación.

**Labels:**
- `endpoint`: Endpoint de autenticación
- `result`: `success` o `failure`

### Métricas de MongoDB

#### `mongo_query_duration_seconds` (Histogram)
Duración de las operaciones MongoDB en segundos.

**Labels:**
- `operation`: Tipo de operación (find, insert, update, delete, etc.)
- `collection`: Nombre de la colección

#### `mongo_queries_total` (Counter)
Total de operaciones MongoDB.

**Labels:**
- `operation`: Tipo de operación
- `collection`: Nombre de la colección
- `status`: `success` o `error`

## Logging

### Winston Logger

El logger Winston está configurado en `backend/src/services/observability.service.js` con los siguientes niveles:

- `error` - Errores críticos
- `warn` - Advertencias
- `info` - Información general (por defecto)
- `http` - Logs de peticiones HTTP
- `debug` - Información de depuración

#### Desarrollo

En desarrollo, los logs se imprimen en console con colores.

#### Producción

En producción, los logs se guardan en archivos rotativos:

```
logs/
├── application-2025-02-12.log    # Logs generales (máx 20MB, máx 14 días)
├── application-2025-02-11.log
└── error-2025-02-12.log          # Solo errores (máx 20MB, máx 30 días)
```

**Rutas en docker-compose (volumen):**
```yaml
volumes:
  - ./backend/logs:/app/logs
```

## Monitoreo con Prometheus

### Acceso al Endpoint de Métricas

```bash
curl http://localhost:5000/api/metrics
```

Las métricas están disponibles en formato Prometheus text-based (formato estándar).

### Queries Prometheus Comunes

#### Tasa de error HTTP (últimos 5 minutos)

```promql
rate(http_errors_total[5m])
```

#### Latencia P95 de peticiones

```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

#### Intentos de autenticación fallidos

```promql
rate(auth_attempts_total{result="failure"}[5m])
```

#### Duración promedio de queries MongoDB

```promql
rate(mongo_query_duration_seconds_sum{collection="usuarios"}[5m]) 
/ 
rate(mongo_query_duration_seconds_count{collection="usuarios"}[5m])
```

## Configuración Avanzada

### Variables de Entorno

```bash
# Nivel de logging (error, warn, info, debug)
LOG_LEVEL=info

# Entorno de ejecución
NODE_ENV=production  # o development
```

### Personalizar Métricas

Para agregar nuevas métricas, editar `backend/src/services/observability.service.js`:

```javascript
const myCustomMetric = new client.Counter({
  name: 'my_metric_name',
  help: 'Descripción de la métrica',
  labelNames: ['label1', 'label2'],
  registers: [register]
});

// Usar en el código:
myCustomMetric.inc({ label1: 'value1', label2: 'value2' });
```

### Instrumentar Nuevas Rutas

El middleware `metricsMiddleware` automáticamente recolecta métricas de todas las rutas excepto las listadas en `ignorePaths`. Para agregar una ruta a la lista de ignoradas:

```javascript
const ignorePaths = ['/api/metrics', '/api/health', '/health', '/tu/nueva/ruta'];
```

## Integración con Grafana

Para visualizar las métricas en Grafana, agregar un data source de Prometheus:

1. **Servidor Prometheus:** `http://prometheus:9090`
2. **URL en Docker Compose:** 
   ```yaml
   services:
     prometheus:
       image: prom/prometheus:latest
       ports:
         - "9090:9090"
       volumes:
         - ./prometheus.yml:/etc/prometheus/prometheus.yml
   ```

### Archivo de Configuración Prometheus (prometheus.yml)

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'mindcare-api'
    static_configs:
      - targets: ['http://backend:5000']
    metrics_path: '/api/metrics'
```

## Troubleshooting

### Las métricas no se muestran

1. Verificar que el middleware esté registrado en `app.js`
2. Verificar logs en `logs/application-*.log`
3. Acceder a `http://localhost:5000/api/metrics` directamente

### Los logs no se rotan

1. Verificar que `NODE_ENV=production`
2. Verificar permisos de escritura en carpeta `logs/`
3. Revisar `LOG_LEVEL` en `.env`

### Archivo de logs muy grande

Aumentar la configuración de rotación en `observability.service.js`:

```javascript
new DailyRotateFile({
  filename: path.join(logsDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '50m',        // Cambiar a 50m
  maxDays: '7d',         // Cambiar a 7d
  format: winston.format.json()
});
```

## Buenas Prácticas

1. **No registrar datos sensibles** - Nunca loguear contraseñas, tokens o PII
2. **Usar niveles apropiados** - Info para eventos normales, error para excepciones
3. **Etiquetado consistente** - Usar labels predecibles en métricas
4. **Rotación de logs** - Configurar límites de tamaño y retención
5. **Muestreo en producción** - Si hay volumen muy alto, considerar sampling

## Referencias

- [Prometheus Client Library](https://github.com/siimon/prom-client)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Morgan HTTP Logger](https://github.com/expressjs/morgan)
- [Keep a Changelog](https://keepachangelog.com/)

