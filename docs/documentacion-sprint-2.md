## Sprint 2 – del 14 al 26 de noviembre de 2025
### Datos básicos
* **Periodo del sprint:** del 14 de noviembre de 2025 al 26 de noviembre de 2025 (ajusta si usáis otras fechas).

* **Equipo:** Adrián Díaz Angulo, Rocío Luque Montes y José Antonio Díaz Busati (Grupo 7).

* **Objetivo del sprint:**
Desarrollar la estructura inicial del servidor backend, preparar el primer endpoint de prueba, montar la arquitectura del frontend con React y Zustand, definir el esquema base en MongoDB para Usuario/Registro/Artículos y avanzar en la investigación de hábitos y preguntas para el diario de salud mental.

### Historias de usuario del sprint
* **HU1** – Backend inicial y salud del sistema: Como desarrollador, quiero un servidor Node/Express con un endpoint de salud para comprobar fácilmente que la API está funcionando.

* **HU2** – Frontend preparado para crecer: Como usuario, quiero que la aplicación cargue correctamente con rutas y estado global para poder navegar entre pantallas de Home, Login y Register.

* **HU3** – Modelo de datos de salud mental: Como equipo, queremos un esquema de base de datos adecuado para guardar usuarios, registros y artículos relacionados con hábitos de salud mental.

* **HU4** – Contenido útil para el diario: Como usuario, quiero que el diario se base en hábitos y preguntas bien pensadas para que el seguimiento de mi salud mental sea útil.

### Tareas realizadas
#### Backend
* Configurar la estructura básica del servidor: Se ha creado la estructura inicial del servidor con Node.js y Express, organizando middlewares y rutas base.

* Crear el primer endpoint de prueba: Se ha implementado un endpoint GET /api/health (o similar) para comprobar que la API responde correctamente y verificar la conexión.

#### Frontend
* Configurar el proyecto React: Se han revisado las dependencias principales (React, router, Zustand/u otra librería de estado) y se ha dejado el proyecto listo para desarrollar vistas.

* Establecer la estructura de carpetas del frontend: Se ha organizado la estructura en carpetas como components, pages, services y store, facilitando el crecimiento del proyecto.

* Crear las primeras rutas de navegación: Se han creado rutas básicas como Home, Login y Register usando react-router-dom, comprobando que la navegación entre pantallas funciona.

#### Base de datos
* Definir el esquema Mongo inicial: Se ha diseñado un esquema base de Mongoose/MongoDB para los modelos principales (Usuario, Registro, DiarioLibre, Artículos), alineado con la documentación del proyecto.

* Script de seeding: Se ha creado un script para insertar datos de prueba en la base de datos, incluyendo usuarios y registros de ejemplo, para poder probar el sistema sin tener que registrar todo manualmente.

#### Investigación
* Investigar qué hábitos y métricas registrar: Se han analizado guías y artículos clínicos para decidir qué hábitos, métricas y variables son más adecuados para un diario de salud mental (por ejemplo, sueño, estado de ánimo, actividad, etc.).

* Investigar qué preguntas usar en el onboarding: Se han identificado las preguntas esenciales para la pantalla de bienvenida, de forma que se puedan segmentar los usuarios y personalizar mejor la experiencia.

### Documentación y seguimiento
* Documentar el sprint: Se ha documentado en la wiki o en el archivo de documentación el avance del Sprint 2, describiendo el trabajo realizado en backend, frontend, base de datos e investigación.

* Añadir toggl tracker en el proyecto: Se ha añadido o configurado Toggl (u otra herramienta de time tracking) en el proyecto para medir el tiempo dedicado por el equipo y mejorar la planificación futura.

### Lógica de negocio adicional
* Lógica de registro: Se ha empezado a implementar la lógica del controlador registerUser (o equivalente), incluyendo el hasheado de la contraseña con bcrypt y la ruta POST del endpoint de registro en la API.

* Gestión de estados (Zustand): Se ha creado el store de Zustand para gestionar el estado del usuario y el token de autenticación en el frontend, preparándolo para futuras pantallas protegidas.

### Resultado del sprint
* El backend cuenta ahora con una estructura clara y un endpoint de prueba que permite verificar rápidamente el estado de la API.

* El frontend tiene rutas básicas operativas, una arquitectura organizada y un sistema de estado global preparado, lo que facilita desarrollar nuevas funcionalidades en los siguientes sprints.

* La base de datos dispone de un esquema inicial y datos de prueba mediante seeding, y además se ha avanzado en la definición de contenidos (hábitos y preguntas) que dan sentido al diario de salud mental.

### Problemas detectados y mejoras
**Problemas:**

* Definir bien el esquema de Mongo y la relación entre Usuario, Registro y Artículos ha requerido varias iteraciones y consultas a documentación.

* La integración entre backend y frontend todavía está en una fase inicial y algunos flujos (registro completo) necesitan más pruebas.

* Mejoras para próximos sprints:

* Dedicar un bloque de tiempo específico a pruebas de integración (frontend + backend + base de datos) y no solo a pruebas por separado.

* Seguir usando Toggl u otra herramienta para medir tiempos y así ajustar mejor el tamaño de las tareas en los siguientes sprints.