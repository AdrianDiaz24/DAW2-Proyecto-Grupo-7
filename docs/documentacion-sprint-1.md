## Sprint 1 – 7–14 noviembre 2025

### Datos básicos
- **Periodo del sprint:** 7–14 de noviembre de 2025.
- **Equipo:** Adrián Díaz Angulo, Rocío Luque Montes y José Antonio Díaz Busati (Grupo 7).
- **Proyecto:** DAW2-Proyecto-Grupo-7 (MindCare)
- **Objetivo del sprint:** Dejar preparado el proyecto base con comunicación frontend–backend, diseño visual inicial y base de datos en MongoDB Atlas para poder continuar el desarrollo en los siguientes sprints.

---

### 1. Roles y organización en este sprint

Para cumplir con la metodología Scrum, el equipo ha mantenido una estructura definida enfocada en el setup técnico y la base de diseño.

* **Scrum Master:** *Rocío* - Encargado de asegurar el flujo de trabajo, crear el tablero de GitHub Projects y documentar en la Wiki.
* **Product Owner:** *José Antonio* - Validó que la estructura inicial de diseño (wireframes) cumpliera con los requisitos del producto.
* **Development Team:**
    * **Adrián (Backend Lead):** Configuración de Node.js/Express, conexión a MongoDB Atlas, definición de esquemas iniciales.
    * **Rocío (Frontend Lead):** Estructura React, creación de componentes base, guía de estilos.
    * **José Antonio (Design/Docs):** Investigación MERN, wireframes, componentes UI y documentación.

---

### 2. Registro de reuniones (Eventos Scrum)

#### Daily Standups (Resumen de bloqueos)
Se realizaron reuniones de seguimiento para sincronización del equipo.

* **Bloqueos detectados:**
    * *Problema:* Confusión inicial sobre la estructura correcta de carpetas (backend separado de frontend vs. monorepo).
    * *Solución:* Se decidió usar estructura separada (backend/ y frontend/) para mayor claridad en los desarrollos futuros. (Tarea #7)
    * *Problema:* Variables de entorno (.env) no compartidas correctamente entre miembros del equipo.
    * *Solución:* Se creó archivo `.env.example` con template para que cada miembro configurara el suyo. (Tarea #8)
    * *Problema:* MongoDB Atlas requería crear una organización e IP whitelist antes de conectarse.
    * *Solución:* Adrián gestionó las credenciales y Rocío las distribuyó al equipo de forma segura. (Tarea #13)

#### Sprint Review (Demostración del incremento)
En la revisión actual se presenta el **Incremento de Producto** inicial:

1. **Entorno Configurado:** Un proyecto Node.js/Express conectado a MongoDB Atlas y funcionando localmente en cada máquina del equipo.
2. **Base de datos:** Clúster de MongoDB Atlas creado (`DAW2_Grupo7`), colecciones `usuarios` y `registros` inicializadas con esquemas básicos.
3. **Frontend base:** Componente de prueba (`#9`) que demuestra que React se ejecuta correctamente y puede conectarse al backend.
4. **Documentación Visual:** Guía de estilos, wireframes de 4 pantallas principales (Inicio, Registro, Diario, Recursos) y componentes base de UI definidos en Figma.

#### Sprint Retrospective (Lecciones aprendidas)

* **Lo que hicimos bien:**
    * El reparto de tareas fue claro desde el inicio; cada miembro conocía sus responsabilidades.
    * La documentación de la configuración del entorno (.env.example) evitó problemas de inconsistencia.
    * Usar GitHub Projects desde el principio facilitó el seguimiento de tareas.

* **Lo que debemos mejorar:**
    * Se subestimó el tiempo de aprendizaje inicial del stack MERN; algunas investigaciones tomaron más horas de las previstas.
    * El mockup principal quedó "In Progress"; debería haberse dividido en dos tareas más pequeñas.
    * No se registraron correctamente las horas en Toggl Track desde el inicio; empezaremos formalmente en Sprint 2.

* **Acciones para el próximo Sprint (Sprint 2):**
    * Finalizar el mockup y la guía de estilos en Figma.
    * Empezar a implementar autenticación (registro/login) en el backend.
    * Usar Toggl Track de forma sistemática para registrar todas las horas reales.
    * Refinar las estimaciones basándose en lo aprendido.

---

### 3. Registro de decisiones tomadas

Registro de decisiones técnicas y organizativas para la evaluación del proyecto.

1. **Estructura de Carpetas Separada (Backend / Frontend):**
    * *Decisión:* Usar carpetas separadas (`backend/` y `frontend/`) en lugar de un monorepo.
    * *Motivo:* Permite que el equipo trabaje en paralelo sin conflictos; facilita futuras separaciones si se despliega en servidores diferentes.
    * *Implementación:* Ambas carpetas tienen sus propios `package.json` y ramas `main`, `dev`, `feature/X`.

2. **MongoDB Atlas Frente a Base de Datos Local:**
    * *Decisión:* Usar MongoDB Atlas (nube) desde el Sprint 1 en lugar de una instancia local.
    * *Motivo:* Todos los miembros tienen acceso sin configuraciones locales; facilita las pruebas remotas y la escalabilidad.
    * *Beneficio:* Evita el problema de "me funciona en mi máquina" desde el principio.

3. **Separación de Colecciones (Usuarios vs. Registros):**
    * *Decisión:* Crear dos colecciones: `usuarios` (datos de autenticación) y `registros` (entradas de diario/tracker).
    * *Motivo:* Modularidad y seguridad; permite que la lógica de acceso sea diferente para cada tipo de dato.
    * *Nota:* En Sprint 3, esta estructura se refinará si es necesario.

---

### 4. Progreso del Sprint (Tareas completadas)

Estado final del Backlog del Sprint 1 basado en el tablero de GitHub Projects.

#### Hecho (Definition of Done)

**Investigación y Setup**
* `#1` **Investigar stack MERN:** Revisión de cómo funcionan MongoDB, Express, React y Node.js juntos. (Todos)
* `#2` **Configurar entorno local:** Instalación de Node.js, npm y verificación de dependencias. (Rocío y Adrián)

**Diseño**
* `#3` **Crear guía de estilos:** Definición de tipografía, colores y componentes accesibles. (Rocío)
* `#4` **Diseñar wireframes:** Wireframes de Inicio, Registro, Diario y Recursos. (José Antonio)
* `#5` **Elaborar componentes base:** Componentes de UI reutilizables siguiendo la guía. (Adrián)

**Configuración del Proyecto**
* `#7` **Crear estructura de carpetas:** Carpetas backend/ y frontend/ con ramas operativas. (Rocío)
* `#8` **Añadir archivo `.env.example`:** Template con variables mínimas (puertos, URLs). (Adrián)
* `#17` **Crear tablero GitHub Projects:** Tablero configurado con campos Sprint, Prioridad, Estimación, Categoría, Assignee. (Rocío)

**Frontend**
* `#9` **Crear componente sprint:** Componente de prueba que demuestra que React funciona. (Rocío)

**Backend & Base de Datos**
* `#13` **Configurar conexión MongoDB:** Conexión exitosa desde Express a MongoDB Atlas. (Adrián)
* `#15` **Crear base de datos en MongoDB Atlas:** Clúster `DAW2_Grupo7` creado. (Adrián)
* `#12` **Crear colecciones usuarios y registros:** Colecciones inicializadas con esquemas básicos. (Adrián)
* `#16` **Diseñar modelos de usuario:** Esquemas Mongoose para usuarios y registros definidos. (José Antonio y Rocío)

#### En Progreso (Mvto. a Sprint 2)

* `#6` **Elaborar mockup principal:** Mockup visual de Inicio y Diario en Figma. ~70% completado.

---

### 5. Tareas del sprint (Resumen)

| Tarea                                               | Categoría   | Responsable          | Estimación (h) | Estado      |
|-----------------------------------------------------|------------|----------------------|-----------|----------------|
| Investigación stack MERN                            | Documentación | Todos                | 3         | Done        |
| Configurar entorno local y dependencias             | Backend    | Rocío y Adrián       | 4         | Done        |
| Crear guía de estilos                               | Diseño     | Rocío                | 4         | Done        |
| Diseñar wireframes (Inicio, Registro, Diario, Recursos) | Diseño | José Antonio         | 5         | Done        |
| Elaborar componentes base de UI                     | Frontend   | Adrián               | 5         | Done        |
| Mockup principal de Inicio y Diario                 | Diseño     | Rocío                | 6         | In progress |
| Crear estructura de carpetas frontend/backend       | DevOps     | Rocío                | 2         | Done        |
| Añadir archivo `.env.example`                       | Backend    | Adrián               | 1         | Done        |
| Crear componente de prueba "Sprint" en frontend     | Frontend   | Rocío                | 2         | Done        |
| Configurar conexión a MongoDB Atlas                 | Backend    | Adrián               | 3         | Done        |
| Crear base de datos y colecciones                   | Backend    | Adrián               | 3         | Done        |
| Definir modelos iniciales                           | Backend    | José Antonio y Rocío | 4         | Done        |
| Crear tablero de GitHub Projects                    | Gestión    | Rocío                | 2         | Done        |

---

### 6. Historias de usuario del sprint

| ID  | Descripción breve                                                                    | Estado             | Issues relacionados |
|-----|--------------------------------------------------------------------------------------|--------------------|---------------------|
| HU1 | Investigar la pila MERN para entender conexión frontend–backend–base de datos.      | Done               | #1, #2              |
| HU2 | Tener un proyecto base Node/React conectado a MongoDB Atlas y funcionando.          | Done               | #7, #8, #9, #13     |
| HU3 | Definir el diseño base (guía de estilos, wireframes, componentes principales).      | Done / In progress | #3, #4, #5, #6      |
| HU4 | Disponer de una base de datos inicial con colecciones y esquemas básicos.           | Done               | #15, #12, #16, #17  |

---

### 7. Resultado del sprint (Sprint Review)

- **Esqueleto técnico sólido:** Entorno local funcionando, backend conectado a MongoDB Atlas, estructura de carpetas definida y GitHub Projects operativo.
- **Base de datos lista:** Clúster en MongoDB Atlas, colecciones de usuarios y registros creadas con esquemas iniciales.
- **Diseño visual avanzado:** Guía de estilos completa, wireframes de 4 pantallas principales, componentes base diseñados, y mockup principal al 70%.
- **Flujo de trabajo establecido:** El equipo conoce cómo funciona Git, GitHub Projects, y la separación de responsabilidades.

---

### 8. Próximos pasos (Sprint 2)

El siguiente Sprint se enfocará en la autenticación de usuarios y la finalización del diseño visual.

* **Backend:** Implementar endpoints de registro y login con JWT.
* **Frontend:** Conectar formularios de registro/login con el backend; crear flujo de autenticación.
* **Diseño:** Finalizar mockup principal y crear componentes finales en Figma.
* **Testing:** Crear primeras pruebas en Postman para endpoints de autenticación.
* **Documentación:** Actualizar Wiki con esquemas de base de datos y flujos de autenticación.
* **Toggl Track:** Todos los miembros registrarán horas de forma sistemática.
