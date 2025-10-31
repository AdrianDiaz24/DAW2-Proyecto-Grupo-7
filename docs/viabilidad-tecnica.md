# Fase 2: Estudio de viabilidad técnica

<br>

Para asegurar que nuestra aplicación de salud mental es realizable y eficaz, hemos realizado un estudio de viabilidad técnica. Este análisis abarca los requisitos funcionales, la elección del stack tecnológico, el diseño preliminar de la base de datos, la evaluación de capacidades del equipo y la identificación de riesgos técnicos con estrategias de mitigación.

---

<br>

## Índice

[A. Requisitos funcionales priorizados.](#a-requisitos-funcionales-priorizados)

[B. Requisitos técnicos del stack MERN](#b-requisitos-t%C3%A9cnicos-del-stack-mern)

[C. Esquema de base de datos](#c-esquema-de-base-de-datos)

[D. Arquitectura de la aplicación](#d-arquitectura-de-la-aplicaci%C3%B3n-diagrama)

[E. Evaluación de capacidades del equipo](#e-evaluaci%C3%B3n-de-capacidades-del-equipo)

[F. Análisis de riesgos y estrategias de mitigación](#f-an%C3%A1lisis-de-riesgos-y-estrategias-de-mitigaci%C3%B3n)

---

<br>

## A. Requisitos funcionales priorizados.

### Funcionalidades principales
- Registro diario de emociones y hábitos (sueño, alimentación, actividad, ánimo).
  
- Diario libre seguro y compartible mediante enlace protegido con contraseña.
  
- Acceso a artículos e información confiable sobre depresión y autocuidado.
  
- Sistema de aprendizaje que detecta patrones de hábitos y emociones para enviar notificaciones personalizadas.
  
- Notificaciones y consejos adaptados a los patrones detectados.
  
- Botón de emergencia / enlaces de crisis.
  
- Visualización de estadísticas y gráficos de hábitos y estado emocional.

<br>

### Priorización MoSCoW

| Funcionalidad | Justificación | Prioridad |
|---------------|---------------|-----------|
| Registro diario de emociones y hábitos | Base de datos principal que sustenta el resto de funcionalidades | Must |
| Diario libre seguro y compartible | Mejora regulación emocional y expresión personal | Must |
| Sistema de notificaciones y consejos personalizados | Aumenta adherencia y acompañamiento digital | Must |
| Botón de emergencia / enlaces a servicios oficiales | Requisito ético y seguridad | Must |
| Acceso a artículos educativos | Promueve autocuidado y alfabetización emocional | Should |
| Gráficas de evolución emocional | Visualización y seguimiento de tendencias | Should |
| Recomendaciones de hábitos o contenidos según estado emocional | Refuerza la personalización y utilidad de la app | Should |
| Personalización de interfaz (temas, colores) | Mejora experiencia de usuario | Could |
| Funcionalidades avanzadas de análisis predictivo | Potencia futura basada en datos | Could |
| Chatbot de apoyo emocional | No incluido en MVP | Won’t |
| Integración con ONGs/talleres online | No incluido en MVP | Won’t |

<br>

### MVP (Producto Mínimo Viable)

- Registro diario de emociones y hábitos. Constituye la base de datos principales que sustenta el resto de funcionalidades.
  
- Diario libre seguro y compartible. La escritura expresiva se asocia con una mejora en la regulación emocional.
  
- Sistema de notificaciones y consejos personalizados. Mejora la adherencia al uso de la app y proporciona acompañamiento digital.
  
- Botón de emergencia / enlaces a servicios oficiales. Es un requisito mínimo de responsabilidad y diseño ético.
  
- Acceso a artículos e información confiable sobre depresión. Mejora la alfabetización emocional y promueve el autocuidado. Además, refuerza el carácter preventivo y educativo del proyecto.

Estas funcionalidades permiten a los usuarios gestionar su estado emocional de manera autónoma, recibir apoyo digital y acceder a recursos educativos esenciales.

---

<br>

## B. Requisitos técnicos del stack MERN

### Frontend (React)
- **React-router-dom:** navegación entre vistas.
- **Zustand / Redux Toolkit:** gestión de estado global (Zustand es ligero y simple, Redux robusto para apps escalables).
- **Material UI / Chakra UI:** componentes modernos, accesibles y con modo oscuro/temas personalizados. 
- **React-hook-form + Yup:** validación de formularios de login y registro de emociones.  
- **Recharts / Chart.js:** visualización de estadísticas y gráficas.  
- **React-toastify / Sonner:** notificaciones y feedback al usuario.  
- **Axios + jwt-decode:** peticiones al backend y manejo seguro de JWT.  

### Backend (Node.js + Express)
- **Autenticación:** JWT para sesiones seguras y opción de alias temporal (modo anónimo).  
- **bcrypt:** encriptación de contraseñas.  
- **APIs externas:** líneas de ayuda y recursos oficiales de salud mental.  
- **Nodemailer / Brevo:** envío de correos opcionales.
- **Node-cron / Agenda.js:** programación de recordatorios y notificaciones automáticas.  

En nuestro caso, la aplicación necesitará autenticación, aunque se mantendrá la opción de anonimato del usuario. Para los usuarios registrados se emplearán JWT (JSON Web Tokens) para manejar sesiones seguras sin almacenar datos sensibles en el servidor, junto con bcrypt para encriptar contraseñas. Los usuarios anónimos podrán generar un alias temporal (ID único local) para mantener su privacidad y anonimato.

### Base de datos (MongoDB Atlas)
- Servicio cloud, plan gratuito, persistencia y seguridad, accesible desde backend.

### Infraestructura
- **Frontend:** Vercel (despliegue rápido, CI/CD integrado).  
- **Backend:** Render o Railway (hosting Node.js, conectividad con MongoDB Atlas).

---

<br>

## C. Esquema de base de datos

#### Colección: Usuarios
- _id: ObjectId
- alias: string
- email: string (opcional)
- contraseña: string (hashed)
- fechaRegistro: Date
- estadoEmocional: array de ObjectId (referencia a emociones)

#### Colección: Registros
- _id: ObjectId
- usuarioId: ObjectId
- fecha: Date
- ánimo: string (enum)
- sueño: Number
- alimentación: Number
- actividad: string
- notas: string

#### Colección: Artículos
- _id: ObjectId
- título: string
- contenido: string
- etiquetas: array
- fechaPublicación: Date

#### Colección: Notificaciones
- _id: ObjectId
- usuarioId: ObjectId
- mensaje: string
- tipo: string
- fechaEnvio: Date
- leído: Boolean

### Diagrama:

```mermaid
erDiagram
    Usuarios {
        ObjectId _id
        string alias
        string email
        string contraseña
        Date fechaRegistro
    }
    Registros {
        ObjectId _id
        ObjectId usuarioId
        Date fecha
        string ánimo
        Number sueño
        Number alimentación
        string actividad
        string notas
    }
    Articulos {
        ObjectId _id
        string título
        string contenido
        array etiquetas
        Date fechaPublicación
    }
    Notificaciones {
        ObjectId _id
        ObjectId usuarioId
        string mensaje
        string tipo
        Date fechaEnvio
        Boolean leído
    }

    Usuarios ||--o{ Registros : tiene
    Usuarios ||--o{ Notificaciones : recibe
````

---

<br>

## D. Arquitectura de la aplicación (diagrama)

El siguiente diagrama muestra la arquitectura general de la aplicación, indicando los componentes principales, su comunicación y los servicios externos que se integran. Permite visualizar cómo el usuario interactúa con el sistema, cómo se gestionan los datos y cómo se proporciona información y soporte de manera segura y escalable.

```mermaid
flowchart TD
    Usuario[Usuario final] --> Frontend[Frontend React]
    Frontend --> Backend[Backend Node.js/Express]
    Backend --> DB[Base de datos MongoDB Atlas]
    Backend --> API[APIs externas / Líneas de ayuda y ONG]
    Backend --> Email[Nodemailer / Brevo]
    Backend --> Cron[Node-cron / Agenda.js]
    Frontend -->|Notificaciones| Backend
    Frontend -->|Autenticación / Alias anónimo| Backend
```

El diagrama refleja la estructura modular de la aplicación, donde el Frontend se encarga de la interfaz y la interacción con el usuario, mientras que el Backend gestiona la lógica de negocio, autenticación y comunicación con la base de datos y servicios externos.
Se incluyen componentes clave como las APIs externas, los sistemas de envío de correos y los recordatorios programados, para mostrar cómo se integran funcionalidades de soporte, emergencias y notificaciones personalizadas.

---

<br>

## E. Evaluación de capacidades del equipo

| Miembro | Habilidades actuales | Áreas a aprender | Rol principal |
|---------|-------------------|-----------------|---------------|
| Rocío | FrontEnd (HTML, CSS, JS), diseño web, gestión BBDD | BackEnd (Java) | FrontEnd + UI/UX |
| Adrián | BackEnd (Java, Kotlin), diseño web | FrontEnd (HTML) | BackEnd + API |
| José Antonio | BackEnd (Java, Kotlin), gestión BBDD | FrontEnd (CSS, JS) | Base de datos + BackEnd |

El proyecto es realista en el tiempo disponible; el principal desafío será la **coordinación y aprendizaje paralelo** de tecnologías.

---

<br>

## F. Análisis de riesgos y estrategias de mitigación

| Riesgo | Impacto | Probabilidad | Estrategia de mitigación |
|--------|---------|--------------|-------------------------|
| Falta de experiencia en ciertas tecnologías | Alta | Media | Aprendizaje activo, pair programming, colaboración interna |
| Problemas de integración frontend-backend | Alta | Media | Definir interfaces claras, pruebas end-to-end frecuentes |
| Retrasos por coordinación | Media | Alta | Sprints cortos, reuniones semanales, herramientas colaborativas |
| Seguridad y privacidad del usuario | Alta | Media | Buenas prácticas de cifrado, validación de entradas, revisiones periódicas |
| Rendimiento de notificaciones y sistema | Media | Media | Desarrollo iterativo, pruebas de carga, optimización progresiva |

