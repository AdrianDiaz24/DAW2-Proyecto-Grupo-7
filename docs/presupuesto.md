# Presupuesto Económico del Proyecto - MindCare

## Índice
1. [Introducción](#introducción)
2. [Perfiles del Equipo y Costes por Hora](#perfiles-del-equipo-y-costes-por-hora)
3. [Metodología de Estimación](#metodología-de-estimación)
4. [Presupuesto por Sprint](#presupuesto-por-sprint)
   - [Sprint 1 - Setup y Arquitectura Base](#sprint-1---setup-y-arquitectura-base)
   - [Sprint 2 - Autenticación y Roles de Usuario](#sprint-2---autenticación-y-roles-de-usuario)
   - [Sprint 3 - Funcionalidades Principales (Parte 1)](#sprint-3---funcionalidades-principales-parte-1)
   - [Sprint 4 - Funcionalidades Principales (Parte 2)](#sprint-4---funcionalidades-principales-parte-2)
   - [Sprint 5 - Testing, Optimización y UI/UX](#sprint-5---testing-optimización-y-uiux)
   - [Sprint 6 - Despliegue y Documentación Final](#sprint-6---despliegue-y-documentación-final)
5. [Comparación: Estimación vs. Realidad](#comparación-estimación-vs-realidad)
6. [Análisis de Desviaciones](#análisis-de-desviaciones)
7. [Costes Adicionales](#costes-adicionales)
8. [Presupuesto Total del Proyecto](#presupuesto-total-del-proyecto)
9. [Lecciones Aprendidas](#lecciones-aprendidas)

---

## Introducción

Este documento presenta el presupuesto económico completo del proyecto **MindCare**, basado en el tiempo invertido durante los 6 sprints de desarrollo. Se utiliza la metodología **Planning Poker** para las estimaciones iniciales y se comparan con las horas reales registradas mediante **Toggl Track**.

**Período de desarrollo:** 7 de noviembre de 2025 - 10 de diciembre de 2025  
**Duración total:** 5 semanas (33 días de trabajo intensivo)  
**Metodología:** SCRUM con sprints de duración variable

---

## Perfiles del Equipo y Costes por Hora

El equipo de desarrollo de MindCare está compuesto por **3 miembros** con diferentes roles y niveles de experiencia. Los costes por hora se han establecido según los estándares del mercado español para desarrollo de software en 2025.

### Equipo MindCare

| Miembro | Perfil | Rol | Coste/Hora | Descripción |
|---------|--------|-----|------------|-------------|
| **José Antonio Díaz** | Junior Developer | Database Manager | 18 €/h | Diseño de modelos de datos, gestión de MongoDB, queries y persistencia. Estudiante de DAW. |
| **Adrián Díaz** | Mid-Senior Developer | Backend Lead | 40 €/h | Arquitectura backend, API REST, autenticación, integraciones, liderazgo técnico. Estudiante de DAW. |
| **Rocío Luque** | Mid Developer | Frontend Lead | 32 €/h | Diseño UI/UX, desarrollo React, componentes, integración con API, accesibilidad. Estudiante de DAW. |

**Total del equipo:** 3 estudiantes de DAW, coste medio ponderado: **30 €/h**

### Justificación de Costes

- **José Antonio - Junior (18 €/h):** Estudiante de DAW con foco en bases de datos. Precio ajustado para estudiantes en formación con primeras experiencias profesionales.
- **Adrián - Mid-Senior (40 €/h):** Estudiante de DAW con experiencia previa en backend y liderazgo técnico. Rango ajustado (35-45 €/h) considerando las responsabilidades de arquitectura y coordinación del proyecto.
- **Rocío - Mid (32 €/h):** Estudiante de DAW con experiencia en frontend y diseño UX. Dentro del rango estándar (28-38 €/h) para desarrolladores frontend con React.

---

## Metodología de Estimación

### Planning Poker

Para cada sprint, el equipo realizó sesiones de **Planning Poker** para estimar el esfuerzo necesario:

1. **Presentación de la tarea:** El Product Owner explica cada issue/tarea.
2. **Discusión inicial:** El equipo hace preguntas para clarificar requisitos.
3. **Estimación privada:** Cada miembro estima en horas (1, 2, 3, 4, 6, 8, 12, 16).
4. **Revelación simultánea:** Todos muestran sus estimaciones a la vez.
5. **Consenso:** Se discuten diferencias y se llega a un consenso.
6. **Registro:** La estimación se registra en GitHub Projects (campo personalizado "Estimación (horas)").

### Registro de Tiempo Real

**Nota importante:** Aunque inicialmente se planificó usar **Toggl Track** para el registro sistemático de horas, en la práctica el equipo no pudo implementar esta herramienta de forma consistente debido a:
- Falta de familiaridad con la herramienta
- Dificultad para coordinar su uso entre los 3 miembros
- Preferencia por concentrarse en el desarrollo

**Metodología alternativa utilizada:**
1. **Estimaciones retrospectivas:** Al final de cada sprint, el equipo realizó reuniones de retrospectiva donde cada miembro estimó las horas reales invertidas en cada tarea.
2. **Commits como referencia:** Se analizaron los commits de GitHub para identificar cuándo se trabajó en cada funcionalidad.
3. **Consenso del equipo:** Las estimaciones de horas reales se validaron entre los 3 miembros para asegurar coherencia.
4. **Documentación en GitHub Issues:** Se añadieron comentarios en los issues con las horas invertidas aproximadas.

**Limitaciones reconocidas:**
- Las horas reales pueden tener un margen de error de ±15%
- No hay tracking minuto a minuto
- Las estimaciones se basan en recuerdos y análisis de commits

**Lección aprendida:** Para futuros proyectos, se implementará el registro de tiempo desde el día 1 con una herramienta más simple (ej: hoja de cálculo compartida) antes de adoptar herramientas complejas como Toggl Track.

---

## Presupuesto por Sprint

### Sprint 1 - Setup y Arquitectura Base

**Fechas:** 07-11-2025 al 11-11-2025 (4 días intensivos)

#### Estimación de Horas por Tarea

| ID | Tarea | Responsable | Horas Estimadas | Horas Reales | Desviación |
|----|-------|-------------|-----------------|--------------|------------|
| #1 | Crear repositorio GitHub | Adrián | 1h | 0.5h | -0.5h ⬇️ |
| #2 | Documentación de problema | Equipo (3 personas × 2.5h) | 8h | 9h | +1h |
| #3 | Viabilidad técnica | Adrián + Rocío | 6h | 5h | -1h ⬇️ |
| #4 | Objetivos y alcance | Equipo | 5h | 6.5h | +1.5h |
| #5 | Recursos necesarios | Equipo | 4h | 3h | -1h ⬇️ |
| #6 | Estructura del Backend | Adrián | 6h | 8h | +2h |
| #7 | Estructura del Frontend | Rocío | 6h | 7h | +1h |
| #8 | Estructura de documentación | José Antonio | 2h | 1.5h | -0.5h ⬇️ |
| #9 | Configuración de .gitignore | José Antonio | 1h | 0.5h | -0.5h ⬇️ |
| **TOTAL** | | | **39h** | **41h** | **+2h** |

#### Cálculo del Coste

| Miembro | Horas Reales | Coste/Hora | Subtotal |
|---------|--------------|------------|----------|
| José Antonio (Junior) | 10h | 18 €/h | 180 € |
| Adrián (Mid-Senior) | 18h | 40 €/h | 720 € |
| Rocío (Mid) | 13h | 32 €/h | 416 € |
| **TOTAL SPRINT 1** | **41h** | | **1,316 €** |

#### Análisis del Sprint

- **Coste estimado:** 1,260 € (39h estimadas)
- **Coste real:** 1,316 €
- **Desviación:** +56 € (+4.4%)
- **Motivo:** Primera vez trabajando juntos como equipo. La estructura del backend llevó más tiempo del previsto por decisiones de arquitectura. Sin embargo, tareas administrativas (Git, docs) fueron más rápidas de lo esperado.

---

### Sprint 2 - Autenticación y Roles de Usuario

**Fechas:** 11-11-2025 al 20-11-2025 (1.5 semanas)

#### Estimación de Horas por Tarea

| ID | Tarea | Responsable | Horas Estimadas | Horas Reales | Desviación |
|----|-------|-------------|-----------------|--------------|------------|
| #10 | Configurar conexión MongoDB | José Antonio | 3h | 5h | +2h |
| #11 | Configurar variables de entorno | José Antonio | 2h | 1h | -1h ⬇️ |
| #12 | Modelo de Usuario (Mongoose) | José Antonio + Adrián | 4h | 4.5h | +0.5h |
| #13 | Implementar bcrypt | Adrián | 3h | 2h | -1h ⬇️ |
| #14 | Endpoint de registro | Adrián | 5h | 6h | +1h |
| #15 | Endpoint de login | Adrián | 5h | 7h | +2h |
| #16 | Middleware de autenticación | Adrián | 4h | 5.5h | +1.5h |
| #17 | Endpoint api/health | José Antonio | 2h | 1.5h | -0.5h ⬇️ |
| #18 | Página de registro (React) | Rocío | 6h | 7.5h | +1.5h |
| #19 | Página de login (React) | Rocío | 6h | 6.5h | +0.5h |
| #20 | Configurar CORS | Adrián | 2h | 3h | +1h |
| #21 | Configurar Helmet | Adrián | 1h | 0.5h | -0.5h ⬇️ |
| **TOTAL** | | | **43h** | **50h** | **+7h** |

#### Cálculo del Coste

| Miembro | Horas Reales | Coste/Hora | Subtotal |
|---------|--------------|------------|----------|
| José Antonio (Junior) | 12h | 18 €/h | 216 € |
| Adrián (Mid-Senior) | 24h | 40 €/h | 960 € |
| Rocío (Mid) | 14h | 32 €/h | 448 € |
| **TOTAL SPRINT 2** | **50h** | | **1,624 €** |

#### Análisis del Sprint

- **Coste estimado:** 1,380 €
- **Coste real:** 1,624 €
- **Desviación:** +244 € (+17.7%)
- **Motivo:** Configuración de MongoDB Atlas requirió más tiempo por problemas de conexión y configuración de red. El login tuvo más complejidad de la esperada con la gestión de errores. Por otro lado, tareas como bcrypt y Helmet fueron más rápidas gracias a buena documentación.

---

### Sprint 3 - Funcionalidades Principales (Parte 1)

**Fechas:** 20-11-2025 al 26-11-2025 (1 semana)

#### Estimación de Horas por Tarea

| ID | Tarea | Responsable | Horas Estimadas | Horas Reales | Desviación |
|----|-------|-------------|-----------------|--------------|------------|
| #22 | Modelo Diario (Mongoose) | José Antonio | 4h | 3.5h | -0.5h ⬇️ |
| #23 | Investigar tracker diario | Equipo | 3h | 4h | +1h |
| #24 | Definir formulario inicial | Equipo | 3h | 2.5h | -0.5h ⬇️ |
| #25 | CRUD de entradas de diario | Adrián | 8h | 11h | +3h |
| #26 | Modelo de Tracker (Mongoose) | José Antonio | 4h | 3h | -1h ⬇️ |
| #27 | Endpoints de Tracker | Adrián | 6h | 7.5h | +1.5h |
| #28 | Script de seeding | José Antonio | 4h | 5.5h | +1.5h |
| #29 | Gestión de estado (Zustand) | Rocío + Adrián | 5h | 6h | +1h |
| #30 | Componente DiaryEditor | Rocío | 8h | 12h | +4h |
| #31 | Componente EmotionSelector | Rocío | 6h | 9h | +3h |
| #32 | Página de Diario | Rocío | 10h | 11h | +1h |
| #33 | Actualizar modelo Usuario | José Antonio | 3h | 2.5h | -0.5h ⬇️ |
| **TOTAL** | | | **64h** | **77.5h** | **+13.5h** |

#### Cálculo del Coste

| Miembro | Horas Reales | Coste/Hora | Subtotal |
|---------|--------------|------------|----------|
| José Antonio (Junior) | 14.5h | 18 €/h | 261 € |
| Adrián (Mid-Senior) | 24.5h | 40 €/h | 980 € |
| Rocío (Mid) | 38.5h | 32 €/h | 1,232 € |
| **TOTAL SPRINT 3** | **77.5h** | | **2,473 €** |

#### Análisis del Sprint

- **Coste estimado:** 2,070 €
- **Coste real:** 2,473 €
- **Desviación:** +403 € (+19.5%)
- **Motivo:** Los componentes de frontend (DiaryEditor y EmotionSelector) fueron mucho más complejos de lo previsto, especialmente las animaciones y la integración con el estado. El CRUD del diario también tuvo más casos edge que manejar. Sin embargo, los modelos de datos fueron más sencillos gracias a experiencia adquirida en Sprint 2.

---

### Sprint 4 - Funcionalidades Principales (Parte 2)

**Fechas:** 26-11-2025 al 28-11-2025 (3 días)

#### Estimación de Horas por Tarea

| ID | Tarea | Responsable | Horas Estimadas | Horas Reales | Desviación |
|----|-------|-------------|-----------------|--------------|------------|
| #34 | Crear API de IA | Adrián | 4h | 6h | +2h |
| #35 | Controlador Grok | Adrián | 6h | 8.5h | +2.5h |
| #36 | Rutas de IA | Adrián | 3h | 2.5h | -0.5h ⬇️ |
| #37 | Actualizar modelo Diario | José Antonio + Adrián | 3h | 3.5h | +0.5h |
| #38 | Middleware completo | Adrián | 4h | 4.5h | +0.5h |
| #39 | Colección Postman | José Antonio | 4h | 3h | -1h ⬇️ |
| #40 | Wiki del proyecto | Equipo | 5h | 5.5h | +0.5h |
| #41 | Implementar CORS avanzado | Adrián | 2h | 1.5h | -0.5h ⬇️ |
| #42 | Arreglar flujo de autenticación | Adrián + Rocío | 6h | 7.5h | +1.5h |
| #43 | Actualizar Landing | Rocío | 8h | 10h | +2h |
| #44 | Crear página Home | Rocío | 10h | 11h | +1h |
| #45 | Bases para Seguimiento | Rocío | 6h | 7h | +1h |
| #46 | Solucionar errores generales | Equipo | 8h | 9h | +1h |
| **TOTAL** | | | **69h** | **79h** | **+10h** |

#### Cálculo del Coste

| Miembro | Horas Reales | Coste/Hora | Subtotal |
|---------|--------------|------------|----------|
| José Antonio (Junior) | 11.5h | 18 €/h | 207 € |
| Adrián (Mid-Senior) | 34h | 40 €/h | 1,360 € |
| Rocío (Mid) | 33.5h | 32 €/h | 1,072 € |
| **TOTAL SPRINT 4** | **79h** | | **2,639 €** |

#### Análisis del Sprint

- **Coste estimado:** 2,220 €
- **Coste real:** 2,639 €
- **Desviación:** +419 € (+18.9%)
- **Motivo:** La integración con Grok API fue más compleja de lo esperado, especialmente en el manejo de errores y rate limiting. El Landing y Home requirieron más iteraciones de diseño. Sin embargo, tareas como CORS avanzado y Postman fueron más rápidas gracias a patrones ya establecidos en sprints anteriores.

---

### Sprint 5 - Testing, Optimización y UI/UX

**Fechas:** 03-12-2025 al 05-12-2025 (3 días)

#### Estimación de Horas por Tarea

| ID | Tarea | Responsable | Horas Estimadas | Horas Reales | Desviación |
|----|-------|-------------|-----------------|--------------|------------|
| #47 | Configurar JSDoc | José Antonio | 2h | 1.5h | -0.5h ⬇️ |
| #48 | Configurar workflow CI/CD | Adrián | 6h | 9h | +3h |
| #49 | Actualizar YAML | Adrián | 4h | 6h | +2h |
| #50 | Botón de emergencia | Rocío | 8h | 10h | +2h |
| #51 | Diseño del botón emergencia | Rocío | 4h | 3.5h | -0.5h ⬇️ |
| #52 | Cabecera Landing (sin animaciones) | Rocío | 6h | 5.5h | -0.5h ⬇️ |
| #53 | Cabecera Landing (con animaciones) | Rocío | 8h | 12h | +4h |
| #54 | Cabecera responsive | Rocío | 10h | 16h | +6h |
| #55 | Menu hamburguesa | Rocío | 8h | 14h | +6h |
| #56 | Fix encoding UTF-8 | José Antonio | 3h | 2.5h | -0.5h ⬇️ |
| #57 | Testing visual | Equipo | 6h | 5h | -1h ⬇️ |
| #58 | Refactorización | Adrián + Rocío | 8h | 9h | +1h |
| #59 | Optimización de rendimiento | Adrián | 6h | 5.5h | -0.5h ⬇️ |
| **TOTAL** | | | **79h** | **100h** | **+21h** |

#### Cálculo del Coste

| Miembro | Horas Reales | Coste/Hora | Subtotal |
|---------|--------------|------------|----------|
| José Antonio (Junior) | 9h | 18 €/h | 162 € |
| Adrián (Mid-Senior) | 29.5h | 40 €/h | 1,180 € |
| Rocío (Mid) | 61.5h | 32 €/h | 1,968 € |
| **TOTAL SPRINT 5** | **100h** | | **3,310 €** |

#### Análisis del Sprint

- **Coste estimado:** 2,530 €
- **Coste real:** 3,310 €
- **Desviación:** +780 € (+30.8%)
- **Motivo:** Este fue el sprint con mayor desviación. Las animaciones y el responsive design fueron MUY subestimados. El menú hamburguesa presentó problemas técnicos complejos con Framer Motion que consumieron el doble de tiempo. La cabecera responsive requirió múltiples iteraciones para diferentes breakpoints. CI/CD también tuvo configuraciones inesperadas. Este sprint enseñó al equipo a no subestimar tareas de UI/UX avanzadas.

---

### Sprint 6 - Despliegue y Documentación Final

**Fechas:** 08-12-2025 al 10-12-2025 (3 días)

#### Estimación de Horas por Tarea

| ID | Tarea | Responsable | Horas Estimadas | Horas Reales | Desviación |
|----|-------|-------------|-----------------|--------------|------------|
| #60 | Crear imagen Docker (YAML) | Adrián | 4h | 6h | +2h |
| #61 | Dockerfile backend | Adrián | 4h | 5.5h | +1.5h |
| #62 | Dockerfile frontend | Adrián | 4h | 5h | +1h |
| #63 | Actualizar Dockerfile | Adrián | 6h | 8.5h | +2.5h |
| #64 | Configurar CI/CD completo | Adrián | 6h | 7h | +1h |
| #65 | Testing en contenedores | Equipo | 4h | 3.5h | -0.5h ⬇️ |
| #66 | Configurar variables prod | Adrián + José Antonio | 3h | 2.5h | -0.5h ⬇️ |
| #67 | Deployment a producción | Adrián + José Antonio | 4h | 5.5h | +1.5h |
| #68 | Solucionar errores finales | Equipo | 8h | 9.5h | +1.5h |
| #69 | Verificar requisitos | Equipo | 4h | 3h | -1h ⬇️ |
| #70 | Documentación técnica completa | Rocío + Adrián | 10h | 11h | +1h |
| #71 | Limpieza de documentación | José Antonio | 2h | 1.5h | -0.5h ⬇️ |
| #72 | Documentación organizacional | Equipo | 6h | 7h | +1h |
| #73 | Preparar presentación final | Equipo | 8h | 9h | +1h |
| **TOTAL** | | | **73h** | **84.5h** | **+11.5h** |

#### Cálculo del Coste

| Miembro | Horas Reales | Coste/Hora | Subtotal |
|---------|--------------|------------|----------|
| José Antonio (Junior) | 20h | 18 €/h | 360 € |
| Adrián (Mid-Senior) | 41.5h | 40 €/h | 1,660 € |
| Rocío (Mid) | 23h | 32 €/h | 736 € |
| **TOTAL SPRINT 6** | **84.5h** | | **2,756 €** |

#### Análisis del Sprint

- **Coste estimado:** 2,340 €
- **Coste real:** 2,756 €
- **Desviación:** +416 € (+17.8%)
- **Motivo:** Docker y la configuración de CI/CD requirieron más debugging de lo esperado, especialmente en la optimización de imágenes y multi-stage builds. El deployment tuvo algunos problemas de red y configuración. Sin embargo, tareas de documentación y verificación fueron más eficientes al estar todo el equipo sincronizado y con experiencia acumulada.

---

## Comparación: Estimación vs. Realidad

### Tabla Resumen por Sprint

| Sprint | Horas Estimadas | Horas Reales | Desviación (h) | Desviación (%) | Coste Estimado | Coste Real | Desviación (€) |
|--------|----------------|--------------|----------------|----------------|----------------|------------|----------------|
| **Sprint 1** | 39h | 41h | +2h | +5.1% | 1,260 € | 1,316 € | +56 € |
| **Sprint 2** | 43h | 50h | +7h | +16.3% | 1,380 € | 1,624 € | +244 € |
| **Sprint 3** | 64h | 77.5h | +13.5h | +21.1% | 2,070 € | 2,473 € | +403 € |
| **Sprint 4** | 69h | 79h | +10h | +14.5% | 2,220 € | 2,639 € | +419 € |
| **Sprint 5** | 79h | 100h | +21h | +26.6% | 2,530 € | 3,310 € | +780 € |
| **Sprint 6** | 73h | 84.5h | +11.5h | +15.8% | 2,340 € | 2,756 € | +416 € |
| **TOTAL** | **367h** | **432h** | **+65h** | **+17.7%** | **11,800 €** | **14,118 €** | **+2,318 €** |

### Gráfico de Desviaciones

```
Sprint 1: █████ +5.1%
Sprint 2: ████████████████ +16.3%
Sprint 3: █████████████████████ +21.1%
Sprint 4: ██████████████ +14.5%
Sprint 5: ██████████████████████████ +26.6%
Sprint 6: ███████████████ +15.8%
```

### Evolución del Aprendizaje

| Sprint | Precisión de Estimación | Notas |
|--------|-------------------------|-------|
| Sprint 1 | 94.9% | Excelente inicio, tareas bien estimadas |
| Sprint 2 | 83.7% | Problemas con MongoDB Atlas no previstos |
| Sprint 3 | 78.9% | Subestimación de complejidad UI |
| Sprint 4 | 85.5% | Mejora en estimaciones backend |
| Sprint 5 | 73.4% | Mayor desviación: animaciones muy subestimadas |
| Sprint 6 | 84.2% | Recuperación en precisión, Docker requirió más tiempo |

**Promedio de precisión:** 82.3% (17.7% de desviación media)

---

### Distribución de Horas por Miembro

| Miembro | Horas Totales | % del Total | Coste Total |
|---------|---------------|-------------|-------------|
| **José Antonio** (Junior) | 77h | 17.8% | 1,386 € |
| **Adrián** (Mid-Senior) | 171.5h | 39.7% | 6,860 € |
| **Rocío** (Mid) | 183.5h | 42.5% | 5,872 € |
| **TOTAL** | **432h** | **100%** | **14,118 €** |

---

## Análisis de Desviaciones

### Tareas que Excedieron Estimaciones (+30% o más)

| Tarea | Sprint | Responsable | Estimado | Real | Desviación | Motivo |
|-------|--------|-------------|----------|------|------------|--------|
| Menu hamburguesa | Sprint 5 | Rocío | 8h | 14h | +75% | Problemas con Framer Motion y animaciones complejas |
| Cabecera responsive | Sprint 5 | Rocío | 10h | 16h | +60% | Múltiples breakpoints y ajustes de UX no previstos |
| Cabecera con animaciones | Sprint 5 | Rocío | 8h | 12h | +50% | Animaciones avanzadas con efectos de hover y scroll |
| Controlador Grok | Sprint 4 | Adrián | 6h | 8.5h | +42% | API externa con manejo complejo de errores y rate limiting |
| Crear API de IA | Sprint 4 | Adrián | 4h | 6h | +50% | Primera vez integrando API de IA, curva de aprendizaje |
| CRUD de diario | Sprint 3 | Adrián | 8h | 11h | +37.5% | Más casos edge de lo previsto (permisos, validaciones) |
| Componente DiaryEditor | Sprint 3 | Rocío | 8h | 12h | +50% | Editor de texto rico más complejo que un textarea simple |
| Componente EmotionSelector | Sprint 3 | Rocío | 6h | 9h | +50% | Diseño visual interactivo con animaciones |
| Actualizar Dockerfile | Sprint 6 | Adrián | 6h | 8.5h | +42% | Optimización multi-stage builds requirió investigación |

### Tareas que Fueron Más Rápidas de lo Esperado

| Tarea | Sprint | Responsable | Estimado | Real | Ahorro | Motivo |
|-------|--------|-------------|----------|------|--------|--------|
| Crear repositorio GitHub | Sprint 1 | Adrián | 1h | 0.5h | -50% | Proceso simple y conocido |
| Configurar variables .env | Sprint 2 | José Antonio | 2h | 1h | -50% | Plantilla clara y bien documentada |
| Implementar bcrypt | Sprint 2 | Adrián | 3h | 2h | -33% | Librería bien documentada |
| Modelo Tracker Mongoose | Sprint 3 | José Antonio | 4h | 3h | -25% | Experiencia del Sprint 2 |
| Colección Postman | Sprint 4 | José Antonio | 4h | 3h | -25% | Endpoints bien estructurados |
| Verificar requisitos | Sprint 6 | Equipo | 4h | 3h | -25% | Checklist claro y organizado |

### Categorías de Tareas con Mayor Desviación

1. **Frontend UI/UX Avanzado (Animaciones, Responsive):** +55% promedio
   - Rocío tuvo que iterar mucho en diseño y animaciones
   - Framer Motion tiene curva de aprendizaje pronunciada
   
2. **Integraciones con APIs Externas:** +45% promedio
   - Grok API requirió más configuración de la esperada
   - Manejo de errores y rate limiting no contemplados inicialmente

3. **DevOps/Docker:** +35% promedio
   - Primera vez del equipo configurando Docker en producción
   - Multi-stage builds y optimización requirieron investigación

4. **Componentes de Frontend Complejos:** +40% promedio
   - DiaryEditor y EmotionSelector más complejos que componentes básicos
   
5. **Backend CRUD:** +25% promedio
   - Más validaciones y casos edge de lo previsto

6. **Modelos de Datos:** -10% promedio (más rápido)
   - José Antonio aprendió rápido los patrones de Mongoose

### Factores que Afectaron las Estimaciones

#### Factores Técnicos
- **Complejidad subestimada:** Animaciones con Framer Motion y responsive design
- **Debugging de Docker:** Configuración de contenedores y multi-stage builds
- **Integración Grok API:** Primera vez integrando IA, rate limiting y manejo de errores
- **Responsive design:** Muchos breakpoints y ajustes visuales iterativos
- **Editor de texto rico:** Componente DiaryEditor más complejo que input básico

#### Factores de Equipo
- **Equipo de 3 personas:** Carga de trabajo distribuida de forma desigual (Rocío 42.5%, Adrián 39.7%, José Antonio 17.8%)
- **Curva de aprendizaje:** Primera vez usando Framer Motion, Docker, Grok API
- **Comunicación:** Discord y WhatsApp, a veces dificultó sincronización en tiempo real
- **Ausencia de Toggl Track:** No registrar horas en tiempo real dificultó el tracking preciso
- **Roles específicos:** José Antonio centrado en BD (menos horas totales pero críticas)

#### Factores Externos
- **Cambios de diseño:** Rocío iteró varias veces en UI del Landing
- **Bloqueos:** Algunas tareas de frontend dependían de endpoints backend
- **Problemas de MongoDB Atlas:** Sprint 2 tuvo problemas de red no anticipados
- **CI/CD:** Configuración de GitHub Actions más compleja de lo esperado

#### Factores Personales
- **Disponibilidad variable:** Estudiantes con otras asignaturas y responsabilidades
- **Experiencia diferenciada:** José Antonio junior, Adrián y Rocío con más experiencia
- **Especialización:** Backend (Adrián), Frontend (Rocío), BD (José Antonio)

---

## Costes Adicionales

Además del coste de desarrollo (horas × coste/hora), el proyecto requiere inversión en infraestructura y servicios:

### Infraestructura y Servicios (Primer Año)

| Concepto | Proveedor | Coste Mensual | Coste Anual | Notas |
|----------|-----------|---------------|-------------|-------|
| **Hosting Backend** | Railway / Render | 5 € | 60 € | Plan gratuito para MVP, escalable a 5-20 €/mes |
| **Hosting Frontend** | Vercel | 0 € | 0 € | Plan gratuito suficiente inicialmente |
| **Base de Datos** | MongoDB Atlas | 0 € | 0 € | Plan M0 (512MB) gratuito. Escalable a M10 (9 €/mes) |
| **Dominio** | Namecheap | - | 12 € | .com, renovación anual |
| **CDN / Almacenamiento** | Cloudinary | 0 € | 0 € | 25 GB gratuitos, suficiente para imágenes de perfil |
| **Email Transaccional** | SendGrid | 0 € | 0 € | 100 emails/día gratuitos |
| **Monitorización** | Sentry | 0 € | 0 € | Plan Developer (5K eventos/mes) |
| **Logs** | Papertrail | 0 € | 0 € | 50 MB/mes gratuito |
| **CI/CD** | GitHub Actions | 0 € | 0 € | 2,000 minutos/mes gratuitos (repositorio privado) |
| **API Externa** | Grok AI | Variable | ~120 € | Estimado: 10 € al mes promedio (según uso) |
| **SUBTOTAL** | | | **192 €** | |

### Herramientas de Desarrollo

| Concepto | Proveedor | Coste | Notas |
|----------|-----------|-------|-------|
| **IDE** | VS Code | 0 € | Gratuito |
| **Gestión de Proyecto** | GitHub Projects | 0 € | Incluido en GitHub |
| **Tracking de Tiempo** | Toggl Track | 0 € | Plan gratuito para equipos pequeños |
| **Comunicación** | Discord / Slack | 0 € | Plan gratuito |
| **Diseño** | Figma | 0 € | Plan gratuito |
| **SUBTOTAL** | | **0 €** | |

### Licencias de Software

- **Node.js, React, Express, MongoDB:** Open Source (0 €)
- **Librerías NPM:** Open Source (0 €)
- **Framer Motion, Zustand, etc.:** Open Source (0 €)

**Total Licencias:** 0 €

### Marketing y Lanzamiento (Opcional - No Incluido)

| Concepto | Coste Estimado | Notas |
|----------|---------------|-------|
| **Diseño de Marca (Logo, Identidad)** | 300-800 € | Freelancer o plataformas como Fiverr |
| **Publicidad Inicial (Google Ads)** | 200-500 € | Campaña de 1-2 meses |
| **Redes Sociales** | 0-200 € | Gestión orgánica + posible publicidad |
| **Landing Page Marketing** | 150-300 € | Copywriting + diseño optimizado |
| **SUBTOTAL** | 650-1,800 € | No incluido en presupuesto base |

---

## Presupuesto Total del Proyecto

### Desglose Final

| Categoría | Coste |
|-----------|-------|
| **Desarrollo (Horas × Coste/Hora)** | 14,118 € |
| **Infraestructura Año 1** | 192 € |
| **Herramientas de Desarrollo** | 0 € |
| **Licencias de Software** | 0 € |
| **Contingencia (10% del desarrollo)** | 1,412 € |
| **TOTAL PROYECTO (Sin Marketing)** | **15,722 €** |
| Marketing y Lanzamiento (Opcional) | +650 a +1,800 € |
| **TOTAL CON MARKETING** | **16,372 - 17,522 €** |

### Desglose por Miembro del Equipo

| Miembro | Rol | Horas | Coste/Hora | Subtotal | % del Total |
|---------|-----|-------|------------|----------|-------------|
| **José Antonio Díaz** | Junior / Database Manager | 77h | 18 €/h | 1,386 € | 9.8% |
| **Adrián Díaz** | Mid-Senior / Backend Lead | 171.5h | 40 €/h | 6,860 € | 48.6% |
| **Rocío Luque** | Mid / Frontend Lead | 183.5h | 32 €/h | 5,872 € | 41.6% |
| **TOTAL** | | **432h** | | **14,118 €** | **100%** |

### Proyección Mensual de Costes (Post-Lanzamiento)

Una vez finalizado el desarrollo, los costes recurrentes mensuales son:

| Concepto | Coste Mensual |
|----------|---------------|
| Hosting + BD (escalado básico) | 15-25 € |
| Dominio (prorrateado) | 1 € |
| Grok API | 10-20 € |
| Mantenimiento (4h/mes × 30 €/h promedio) | 120 € |
| **TOTAL MENSUAL** | **146-166 €** |

**Coste anual de operación:** ~1,750-2,000 €

---

## Lecciones Aprendidas

### Para Futuras Estimaciones

1. **Añadir buffer del 50-60%** en tareas de frontend con animaciones o diseño responsive complejo.
2. **Duplicar estimaciones** para tareas de DevOps/Docker si el equipo no tiene experiencia previa.
3. **Añadir 30-40%** para integraciones con APIs externas (especialmente IA).
4. **Las tareas de BD pueden ser más rápidas** si se establecen buenos patrones desde el inicio.
5. **Considerar la curva de aprendizaje** de nuevas librerías (Framer Motion, Docker, etc.).
6. **Planificar dependencias** entre frontend y backend para evitar bloqueos.

### Mejoras en el Proceso

1. **Implementar tracking de tiempo desde día 1:**
   - Aunque no se usó Toggl Track, sería ideal una hoja de cálculo simple compartida
   - Registrar horas diarias, aunque sea manualmente
   
2. **Planning Poker más detallado:**
   - Descomponer tareas grandes (>6h) en subtareas más pequeñas
   - Incluir tiempo para code review y testing
   
3. **Daily standups más efectivos:**
   - Identificar bloqueos temprano
   - Usar Discord con mensajes asíncronos cuando no se pueda reunir
   
4. **Pair programming en tareas complejas:**
   - Especialmente útil en integraciones (ej: Grok API)
   - Adrián y Rocío trabajaron juntos en algunos bugs complejos
   
5. **Documentación continua:**
   - No dejar toda la documentación para el último sprint
   - José Antonio podría documentar mientras implementa modelos

### Buenas Prácticas Aplicadas

✅ **Reuniones semanales de seguimiento** - Mantuvieron al equipo alineado  
✅ **Commits descriptivos** - Facilitaron el análisis retrospectivo de horas  
✅ **GitHub Projects** - Buena organización de tareas (aunque sin campos de horas)  
✅ **Documentación en Wiki** - Información accesible para todos  
✅ **Code review informal** - Adrián revisó código de José Antonio y Rocío  
✅ **Especialización por rol** - Cada miembro tenía áreas claras de responsabilidad

### Áreas de Mejora

⚠️ **Sprint 5 tuvo la mayor desviación (+26.6%)** - Subestimación grave de UI/UX  
⚠️ **No se usó Toggl Track** - Dificulta análisis preciso de tiempos  
⚠️ **Distribución desigual de carga** - Rocío (42.5%) y Adrián (39.7%) vs José Antonio (17.8%)  
⚠️ **Testing manual solamente** - Falta de tests automatizados añade tiempo de debugging  
⚠️ **Deuda técnica acumulada** - Nav móvil quedó pendiente  

### Aprendizajes Específicos del Equipo

**José Antonio (Junior):**
- Aprendió Mongoose rápidamente y estableció buenos patrones
- Necesitaría más tiempo en tareas de integración compleja
- Podría asumir más responsabilidad en futuros proyectos

**Adrián (Backend Lead):**
- Excelente en arquitectura y decisiones técnicas
- Grok API requirió más tiempo del esperado (primera vez con IA)
- Docker tuvo curva de aprendizaje pronunciada

**Rocío (Frontend Lead):**
- Animaciones y responsive consumieron mucho más tiempo del esperado
- Componentes complejos (DiaryEditor, EmotionSelector) requerían más estimación
- Excelente trabajo de UI/UX pero con impacto en timeline  

---

## Conclusión

El proyecto MindCare, desarrollado por un equipo de **3 personas** (José Antonio, Adrián y Rocío), tuvo un **coste total de desarrollo de 14,118 €** (432 horas reales), con una **desviación del +17.7%** respecto a la estimación inicial (11,800 €). Esta desviación está dentro de rangos aceptables para un proyecto con un equipo de estudiantes que utilizan algunas tecnologías por primera vez.

### Puntos Clave

**Distribución del trabajo:**
- Rocío (Frontend Lead): 183.5h (42.5%) - Máxima carga por complejidad de UI/UX
- Adrián (Backend Lead): 171.5h (39.7%) - Arquitectura, API y DevOps
- José Antonio (Database Manager): 77h (17.8%) - Rol especializado en BD

**Sprint más eficiente:** Sprint 1 (+5.1% desviación) - Tareas bien acotadas  
**Sprint más desviado:** Sprint 5 (+26.6%) - Subestimación severa de animaciones y responsive

Incluyendo infraestructura y contingencias, el **presupuesto total es de 15,722 €**, con costes operativos mensuales de ~155 € una vez en producción.

### Reflexiones Finales

**Fortalezas del equipo:**
- Buena coordinación a pesar de ser solo 3 personas
- Especialización clara por roles
- Capacidad de adaptación ante desviaciones

**Limitaciones identificadas:**
- No se implementó Toggl Track (lección para futuros proyectos)
- Subestimación de tareas de UI/UX avanzadas
- Distribución de carga podría ser más equitativa

Las principales lecciones aprendidas se centran en:
1. Mejorar estimaciones de UI/UX y DevOps (buffers mayores)
2. Implementar tracking de tiempo desde día 1
3. No subestimar curvas de aprendizaje de nuevas tecnologías
4. Considerar la especialización al distribuir tareas

---

**Equipo MindCare:**
- José Antonio Díaz Busati - Database Manager
- Adrián Díaz Angulo - Backend Lead  
- Rocío Luque Montes - Frontend Lead

**Documento generado:** 10-12-2025  
**Versión:** 1.0  
**Última actualización:** Post-Sprint 6  
**Próxima revisión:** Tras 3 meses en producción

