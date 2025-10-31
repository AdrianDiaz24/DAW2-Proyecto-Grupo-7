# Fase 4: Planificación de recursos

<br>

Para asegurar el desarrollo eficiente del proyecto, se han definido los recursos humanos, el stack tecnológico, los servicios externos y APIs, así como las herramientas de desarrollo y gestión necesarias para la correcta ejecución del proyecto.

---

<br>

## Índice

[A. Distribución de roles y responsabilidades](#a-distribuci%C3%B3n-de-roles-y-responsabilidades)

[B. Stack tecnológico completo](#b-stack-tecnol%C3%B3gico-completo)

[C. Servicios externos y APIs a utilizar](#c-servicios-externos-y-apis-a-utilizar)

[D. Herramientas de desarrollo y gestión](#d-herramientas-de-desarrollo-y-gesti%C3%B3n)


---

<br>

## A. Distribución de roles y responsabilidades

| Miembro       | Rol                   | Responsabilidades principales |
|---------------|----------------------|-------------------------------|
| Rocío         | Frontend Lead        | Diseño e implementación de la interfaz de usuario (UI) y experiencia de usuario (UX), desarrollo de vistas principales en React, integración con API, coherencia visual y accesibilidad. |
| Adrián        | Backend Lead         | Diseño e implementación del servidor y lógica de negocio, creación y gestión de la API REST, autenticación y seguridad, integración de funcionalidades del MVP (registro, login, diario, notificaciones básicas). |
| José Antonio  | Database Manager     | Diseño del modelo de datos en MongoDB, gestión de la persistencia de información (usuarios, registros, diario, notificaciones), consultas básicas y soporte en la integración con el backend. |

**Comunicación interna**  
- Discord y WhatsApp para comunicación rápida y coordinación diaria.  
- Reuniones semanales para seguimiento de avances y planificación de sprints cortos.

---

<br>

## B. Stack tecnológico completo

## Stack tecnológico completo

| Área         | Herramienta / Librería       | Versión aproximada | Justificación |
|--------------|-----------------------------|-----------------|---------------|
| Frontend     | React                       | 18.x            | Framework principal para crear la SPA, soporta componentes reutilizables y buena integración con librerías UI y state management |
| Frontend     | react-router-dom            | 6.x             | Navegación entre vistas y rutas |
| Frontend     | Zustand / Redux Toolkit      | Última          | Gestión de estado global (usuarios, emociones, hábitos, configuraciones) |
| Frontend     | Material UI / Chakra UI      | Última          | Componentes UI modernos, accesibles, personalización de temas y modo oscuro |
| Frontend     | react-hook-form + Yup        | Última          | Validación de formularios (registro, login, diario) |
| Frontend     | Recharts / Chart.js          | Última          | Visualización de estadísticas y gráficas |
| Frontend     | React-toastify / Sonner      | Última          | Alertas y feedback del usuario |
| Frontend     | Axios + jwt-decode           | Última          | Peticiones HTTP seguras al backend y manejo de JWT |
| Backend      | Node.js                     | 18.x            | Ejecución del servidor, manejo de peticiones y lógica de negocio |
| Backend      | Express.js                  | 4.x             | Framework principal para API REST |
| Backend      | jsonwebtoken (JWT)          | Última          | Autenticación y gestión de sesiones seguras |
| Backend      | bcrypt                      | Última          | Encriptación de contraseñas antes de guardarlas en la base de datos |
| Backend      | Nodemailer / Brevo           | Última          | Envío de correos automáticos (confirmación, recuperación de contraseña) |
| Backend      | node-cron / Agenda.js        | Última          | Programación de recordatorios y notificaciones automáticas |
| Base de datos | MongoDB Atlas               | Última          | Servicio NoSQL en la nube, plan gratuito, persistencia y seguridad garantizadas |
| Base de datos | Mongoose                    | Última          | ODM para definir esquemas, validación y relaciones en MongoDB, facilita integración con Node.js |


---

<br>


## C. Servicios externos y APIs a utilizar

| Servicio         | Uso principal                         | Limitaciones / Notas |
|-----------------|--------------------------------------|--------------------|
| Vercel           | Hosting Frontend React               | Plan gratuito, CI/CD integrado |
| Render / Railway | Hosting Backend Node.js + Express    | Plan gratuito, conectividad con MongoDB Atlas |
| MongoDB Atlas    | Base de datos NoSQL en la nube       | Plan gratuito, persistencia y seguridad garantizadas |
| APIs públicas de salud mental | Información oficial y líneas de ayuda | Gratuitas, requieren actualización manual periódica |
| Email (Nodemailer / Brevo) | Correos de confirmación y recuperación | Límite ~300 emails/día en plan gratuito |

---

<br>

## D. Herramientas de desarrollo y gestión

- **Control de versiones:** Git y GitHub, con ramas `main`, `develop` y `feature` para organización del desarrollo.  
- **Gestión de proyecto:** GitHub Projects para planificación de tareas y seguimiento de sprints.  
- **Pruebas:** Postman / Insomnia para testeo de endpoints, Jest + React Testing Library para pruebas unitarias y de componentes.  
- **Calidad de código:** ESLint + Prettier para estilo y formato uniforme.  
- **Visualización de datos:** MongoDB Compass para gestión y validación de la base de datos.  
- **Comunicación y coordinación:** Discord y WhatsApp, reuniones semanales para seguimiento de avances.  
