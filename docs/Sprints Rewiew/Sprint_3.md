#  Sprint Review - Sprint 3: Lógica Core & Persistencia

**Proyecto:** MindCare

**Fecha de Revisión:** 28 de Noviembre de 2025

**Duración del Sprint:** 21 Nov - 28 Nov

---

## 1.  Roles y Organización en este Sprint
Para cumplir con la metodología Scrum, el equipo ha mantenido una estructura definida enfocada en cerrar la lógica de negocio.

* **Scrum Master:** *José* - Encargado de asegurar que las pruebas de Postman cubrieran todos los endpoints nuevos y de gestionar la documentación técnica en la Wiki.
* **Product Owner:** *Rocío* - Validó que los esquemas visuales (aunque sin diseño final) cumplieran con los requisitos de entrada de datos necesarios para el MVP.
* **Development Team:**
    * **Adrián (Backend Lead):** Arquitectura del servidor, seguridad JWT y lógica de negocio (Tracker/Diario/Emergencia).
    * **Rocío (Frontend Lead):** Conexión de servicios Axios, gestión de rutas y maquetación funcional.
    * **José (QA/DevOps):** Pruebas de endpoints y documentación técnica de modelos.

---

## 2.  Registro de Reuniones (Eventos Scrum)
Documentación de los eventos clave según requisitos de evaluación.

###  Daily Standups (Resumen de bloqueos)
Se realizaron reuniones de seguimiento para sincronización.
* **Bloqueos detectados:**
    * *Problema:* El flujo de registro fallaba al conectar React con Express debido a errores en la validación de datos del formulario.
    * *Solución:* Rocío y Adrián realizaron una sesión conjunta para depurar la conexión (Tarea #64).
    * *Problema:* La estructura inicial de la base de datos no era eficiente para separar las métricas numéricas (Tracker) del texto libre (Diario).
    * *Solución:* Se decidió reestructurar los modelos Mongoose antes de avanzar (Tarea #66).

###  Sprint Review (Demostración del Incremento)
En la revisión actual se presenta el **Incremento de Producto** funcional:
1.  **Auth:** Un usuario puede registrarse y loguearse recibiendo un Token JWT válido.
2.  **Persistencia:** El usuario puede guardar su estado de ánimo (Tracker) y entradas de diario, persistiendo correctamente en MongoDB Atlas.
3.  **Seguridad:** La lógica de contactos de emergencia está implementada y funcional en el backend.

###  Sprint Retrospective (Lecciones aprendidas)
* **Lo que hicimos bien:** La redefinición temprana de las tablas (#66) evitó deuda técnica futura. La documentación en la Wiki (#28) se ha mantenido al día con el desarrollo.
* **Lo que debemos mejorar:** Se subestimó el tiempo necesario para la limpieza de código (#81), tarea que ha quedado abierta.
* **Acciones para el próximo Sprint:** Centrarse exclusivamente en la capa visual (Diseño final) y la generación de la memoria del proyecto, congelando la lógica nueva.

---

## 3.  Registro de Decisiones Tomadas
Registro de decisiones técnicas para la evaluación del proyecto.

1.  **Separación de Colecciones (Tracker vs. Diario):**
    * *Decisión:* Se separó el esquema de `Registro` (datos métricos para gráficas) del esquema `Diario` (texto libre).
    * *Motivo:* Facilitar la escalabilidad y permitir que el diario tenga lógica de compartición específica en el futuro sin afectar a las métricas de salud.

2.  **Postergación del Diseño UI Final:**
    * *Decisión:* Se trabajó con componentes visuales "crudos" (Esquemas #15, #16, #85) en este Sprint.
    * *Motivo:* Priorizar que la persistencia de datos y la conexión con la BBDD funcionara al 100% antes de invertir tiempo en estilos (CSS/Material UI), moviendo el diseño final (#25) al Sprint 4.

3.  **Priorización de Lógica de Emergencia:**
    * *Decisión:* Se adelantó la lógica de contactos de emergencia (#21) a este sprint.
    * *Motivo:* Es un requisito funcional crítico ("Must Have") para la seguridad del usuario en una app de salud mental.

---

## 4.  Progreso del Sprint (Tareas Completadas)

Estado final del Backlog del Sprint 3 basado en el tablero de proyecto.

###  Hecho (Definition of Done)

**Backend & Lógica**
* `#11` **Lógica de Login:** Implementación de JWT y controladores de acceso. (Adrián)
* `#12` **Middleware de protección:** Seguridad de rutas privadas. (Adrián)
* `#66` **Redefinir Tablas BBDD:** Reestructuración de modelos Mongoose. (Adrián)
* `#72` **Lógica Tracker (Form):** Endpoint para el perfilado inicial. (Adrián)
* `#75` **Lógica Tracker (Reg):** CRUD de registros diarios (ánimo, sueño). (Adrián)
* `#76` **Lógica Diario:** CRUD de entradas de texto personal. (Adrián)
* `#21` **Logica contactos de emergencia:** Gestión de datos de seguridad. (Adrián)

**Frontend (Funcional)**
* `#15` **Crear esquema de Home:** Enrutamiento y estructura base. (Rocío)
* `#16` **Crear esquema de Seguimiento:** Componentes de toma de datos. (Rocío)
* `#64` **Arreglar problemas con log:** Corrección de flujo de registro. (Rocío)
* `#78` **Crear componentes del diario:** Plantillas de prueba backend. (Adrián)
* `#85` **Crear esquema de Diario:** Vista funcional conectada a BBDD. (Rocío)

**Documentación**
* `#19` **Documentar la wiki (User):** Docs de validaciones y modelo. (José)
* `#20` **Crear colección de Postman:** Testing de creación/búsqueda de usuarios. (José)


###  Pendiente (Mvto. a Sprint 4)
* `#81` **Limpiar proyecto:** (En progreso) Refactorización y eliminación de archivos no usados.
* `#28` **Wiki:** Realización de la estructura general de la Wiki. (José)

---

## 5.  Próximos Pasos (Sprint 4)
El siguiente Sprint se enfocará en la finalización visual y la entrega documental.

* **Diseño:** Finalizar la implementación del diseño UI/UX (#25) y la vista del botón de emergencia (#24).
* **Funcionalidad Externa:** Implementar la API de artículos médicos (#26).
* **Documentación Final:** Generar documentación de sprints pasados (#29), documentar el proyecto final (#23) y configurar GitHub Actions para PDFs (#88).