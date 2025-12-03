## Sprint 2 – 14–21 noviembre 2025

### Datos básicos
- **Periodo del sprint:** 15–21 de noviembre de 2025.
- **Equipo:** Adrián Díaz Angulo, Rocío Luque Montes y José Antonio Díaz Busati (Grupo 7).
- **Proyecto:** DAW2-Proyecto-Grupo-7 (MindCare).
- **Objetivo del sprint:** Implementar la primera versión funcional de autenticación y registro de usuarios, definir el esquema Mongoose principal y dejar preparado el estado global en frontend para poder empezar a registrar y persistir datos de usuario en los siguientes sprints. [image:1]

---

### 1. Roles y organización en este sprint

* **Scrum Master:** *Rocío* – Seguimiento del tablero de GitHub Projects, control de dependencias frontend y documentación del sprint en la Wiki.
* **Product Owner:** *José Antonio* – Aprobación del esquema de base de datos (Usuario, Registro, DiarioLibre, Artículos) y validación de requisitos funcionales del registro.
* **Development Team:**
    * **Adrián (Backend Lead):** Configuración del servidor Node/Express, endpoint de prueba y lógica de registro de usuario.
    * **Rocío (Frontend Lead):** Configuración de React, rutas principales, estados globales (Zustand) y conexión básica con backend.
    * **José Antonio (Data/Docs):** Definición de esquemas Mongoose, script de seeding y documentación clínica de hábitos/preguntas.

---

### 2. Registro de reuniones (Eventos Scrum)

#### Daily Standups (Resumen de bloqueos)

* **Bloqueo 1 – Conexión inicial frontend–backend:**  
  Había dudas sobre la URL y puertos a usar entre React y Express al probar el endpoint de salud (`/api/health`).  
  **Solución:** Se unificó la configuración en variables de entorno y se documentó en `.env.example` y en el README.

* **Bloqueo 2 – Diseño del esquema Mongoose:**  
  El modelo inicial mezclaba datos de usuario, diario y artículos en una misma colección.  
  **Solución:** En Sprint 2 se definió un esquema separado para `Usuario`, `Registro`, `DiarioLibre` y `Artículos`, que se terminará de refinar en sprints posteriores.

* **Bloqueo 3 – Selección de preguntas y métricas clínicas:**  
  No estaba claro qué hábitos y métricas incluir para el registro diario.  
  **Solución:** Se investigaron guías y manuales clínicos y se definió un set inicial de preguntas esenciales para el formulario de bienvenida.

#### Sprint Review (Demostración del incremento)

En la revisión se presenta el **Incremento de Producto** del Sprint 2:

1. **Backend operativo con endpoint de prueba:** El servidor Express está configurado y responde correctamente al endpoint `/api/health`.
2. **Esquema Mongoose inicial definido:** Modelos para Usuario, Registro, DiarioLibre y Artículos creados y listos para uso en sprints siguientes.
3. **Seeder de base de datos:** Script de seeding preparado para insertar datos de prueba en MongoDB (usuarios de prueba y artículos).
4. **Frontend con rutas y estado global:** Rutas principales (Home, Login, Register) implementadas y store de Zustand para gestionar usuario y token creado.
5. **Documentación de sprint en la Wiki:** Página de sprint documentada y enlace añadido a la Wiki general del proyecto.

#### Sprint Retrospective (Lecciones aprendidas)

* **Lo que hicimos bien:**
    - La coordinación entre frontend y backend permitió comprobar la comunicación con un endpoint real muy pronto.
    - Definir el esquema de base de datos en este sprint reduce la deuda técnica de los siguientes.

* **Lo que debemos mejorar:**
    - Algunas tareas de investigación (hábitos y preguntas clínicas) consumieron más tiempo de lo estimado; para el próximo sprint se dividirán en tareas más pequeñas. [image:1]
    - La documentación del tracker (Toggl) debe actualizarse al final de cada día, no solo al final del sprint.

* **Acciones para el próximo Sprint (Sprint 3):**
    - Implementar la lógica completa de login y registro (JWT) y la persistencia de registros/diario.
    - Conectar formularios frontend con los endpoints reales.
    - Mantener la Wiki y la colección de Postman actualizadas junto al desarrollo.

---

### 3. Registro de decisiones tomadas

1. **Separar modelos de Usuario, Registro, DiarioLibre y Artículos:**  
   *Decisión:* Definir un esquema Mongoose para cada entidad en lugar de agrupar todo en un único modelo.  
   *Motivo:* Facilitar la escalabilidad, las consultas específicas y la futura gestión de permisos por tipo de dato.

2. **Uso de script de seeding para datos iniciales:**  
   *Decisión:* Crear un script (`seed.js` o similar) que inserte usuarios de prueba y artículos base.  
   *Motivo:* Acelerar el desarrollo y las pruebas en sprints futuros sin depender de inserciones manuales.

3. **Gestión de estado global con Zustand:**  
   *Decisión:* Utilizar Zustand para gestionar el estado de usuario y token en lugar de prop‑drilling u otras librerías más pesadas.  
   *Motivo:* Simplicidad, tipado sencillo e integración rápida con React.

4. **Documentar cada sprint en la Wiki:**  
   *Decisión:* Crear una página específica de Sprint 2 en la Wiki, siguiendo la estructura acordada en Sprint 1, y enlazarla desde la página de planificación de sprints.

---

### 4. Progreso del Sprint (Tareas completadas)

Estado final del backlog del Sprint 2 según GitHub Projects.

#### Hecho (Definition of Done)

**Backend**
* `#4` **Configurar la estructura básica del servidor:** Estructura inicial con Node.js y Express, middlewares base. (Adrián)
* `#5` **Crear el primer endpoint de prueba:** Endpoint GET `/api/health` para verificar funcionamiento del servidor. (Adrián)
* `#46` **Lógica de registro:** Controlador `registerUser`, hash de contraseña con bcrypt y creación de ruta POST. (Adrián)

**Frontend**
* `#6` **Configurar el proyecto React:** Instalación de dependencias clave (axios, zustand, react-router-dom, react-hook-form). (Rocío)
* `#7` **Establecer la estructura de carpetas:** Organización de components, pages, services, store, hooks. (Rocío)
* `#8` **Crear las primeras rutas de navegación:** Rutas básicas Home, Login y Register con React Router. (Rocío)
* `#47` **Gestión de estados (Zustand):** Creación del store `authStore.js` para guardar usuario y token. (Rocío)

**Base de datos**
* `#10` **Definir el esquema Mongo principal:** Diseño del esquema Mongoose para Usuario, Registro, DiarioLibre y Artículos. (José)
* `#45` **Script de seeding:** Creación o actualización de script para limpiar BBDD e insertar usuarios de prueba. (José)

**Investigación**
* `#39` **Investigar qué hábitos y métricas registrar:** Revisión de guías clínicas para definir métricas adecuadas. (Rocío)
* `#40` **Investigar qué preguntas se usarán en el formulario de bienvenida:** Definición de preguntas esenciales para segmentar usuarios. (Rocío)

**Documentación**
* `#44` **Añadir Toggl tracker en el proyecto:** Configuración del uso de Toggl y enlace en documentación interna. (Rocío)

#### Pendiente / En curso

**Documentación**
* `#42` **Documentar sprint:** Documentar en la Wiki los avances del Sprint 2 (tarea sigue marcada como To Do, se cierra al subir este documento). (Todos)

---

### 5. Tareas del sprint (Resumen)

| Tarea                                               | Categoría      | Responsable | Estimación (h) | Estado      |
|-----------------------------------------------------|----------------|-------------|----------------|-------------|
| Configurar la estructura básica del servidor        | Backend        | Adrián      |               | Done        |
| Crear el primer endpoint de prueba (`/api/health`)  | Backend        | Adrián      |               | Done        |
| Configurar el proyecto React                        | Frontend       | Rocío       |               | Done        |
| Establecer la estructura de carpetas en frontend    | Frontend       | Rocío       |               | Done        |
| Crear las primeras rutas de navegación              | Frontend       | Rocío       |               | Done        |
| Definir el esquema Mongoose principal               | Base de datos  | José        |               | Done        |
| Investigar hábitos y métricas clínicas              | Investigación  | Rocío       |               | Done        |
| Investigar preguntas esenciales del formulario      | Investigación  | Rocío       |               | Done        |
| Documentar sprint en la Wiki                        | Documentación  | Todos       |               | In progress |
| Añadir Toggl tracker en el proyecto                 | Documentación  | Rocío       |               | Done        |
| Script de seeding                                   | Base de datos  | José        |               | Done        |
| Lógica de registro (backend)                        | Backend        | Adrián      |               | Done        |
| Gestión de estados (Zustand)                        | Frontend       | Rocío       |               | Done        |


---

### 6. Historias de usuario del sprint

Propuesta de historias de usuario alineadas con las tareas del Sprint 2:

| ID  | Descripción breve                                                                                  | Estado       | Issues relacionados                            |
|-----|----------------------------------------------------------------------------------------------------|-------------|-----------------------------------------------|
| HU5 | Como desarrollador, quiero un servidor Express configurado con endpoint de salud para probar la API. | Done        | #4, #5                                        |
| HU6 | Como usuario, quiero poder registrarme en la aplicación para tener una cuenta personal.           | In progress | #46                                           |
| HU7 | Como desarrollador, quiero un esquema de base de datos bien definido para guardar usuarios y registros. | Done    | #10, #45                                      |
| HU8 | Como usuario nuevo, quiero responder preguntas iniciales sobre mis hábitos para personalizar el seguimiento. | Done | #39, #40                                     |
| HU9 | Como equipo, queremos un frontend con rutas básicas y un estado global para gestionar sesión.     | Done        | #6, #7, #8, #47                               |
| HU10| Como equipo, queremos tener el tiempo de trabajo registrado para poder calcular el presupuesto.   | Done        | #44                                           |

---

### 7. Resultado del sprint (Sprint Review)

- **Backend funcional:** Servidor Express en marcha con endpoint de prueba y lógica de registro implementada.
- **Modelo de datos definido:** Esquema Mongoose inicial y script de seeding listos para usarse en los siguientes sprints.
- **Frontend preparado:** Proyecto React configurado con rutas principales y gestión de estado global mediante Zustand.
- **Base para personalización clínica:** Conjunto inicial de hábitos y preguntas definido a partir de investigación clínica.
- **Gestión del tiempo integrada:** Toggl Track añadido al flujo de trabajo del equipo.

---

### 8. Próximos pasos (Sprint 3)

El siguiente sprint se centrará en la lógica core y la persistencia completa:

- Terminar la lógica de login/registro con JWT y proteger rutas.
- Implementar CRUD completo de Tracker y Diario conectado a MongoDB.
- Conectar componentes de frontend (formularios) con los nuevos endpoints.
- Mantener actualizadas la Wiki y la colección de Postman, y empezar a medir desviaciones entre horas estimadas y reales.
