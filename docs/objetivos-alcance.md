# Fase 3: Definición de objetivos y alcance

<br>

El propósito de esta fase es definir claramente los objetivos del proyecto, asegurar que sean medibles y alcanzables, y delimitar el alcance de la aplicación para priorizar funcionalidades y garantizar su viabilidad en el plazo establecido. La definición de objetivos SMART, la delimitación del MVP y la identificación de qué se incluye y qué se excluye del proyecto permiten orientar el desarrollo y evaluar el éxito del mismo de manera objetiva.

---

<br>

## Índice


---

<br>

## A. Objetivos SMART del proyecto

Los objetivos se han definido siguiendo la metodología SMART (Específicos, Medibles, Alcanzables, Relevantes, Temporales). Se distinguen objetivos generales, que describen el propósito global del proyecto, y objetivos específicos, que son metas concretas y tangibles que contribuyen al logro del objetivo general.


| Objetivo | Específico | Medible | Alcanzable | Relevante | Temporal |
|---------------|---------------|-----------|---------------|---------------|-----------|
| Objetivo 1 (Específico) | Proteger la información introducida por los usuarios mediante autenticación segura y encriptación | Evitar vulnerabilidades críticas en el manejo de datos, como accesos no autorizados o pérdida de información | Implementando autenticación JWT, bcrypt para contraseñas y alias temporal para usuarios anónimos | Cumple con la ley de protección de datos (LOPD) y genera confianza en los usuarios, asegurando la privacidad de su información sensible | Implementar antes de publicar la página a los usuarios |
| Objetivo 2 (General) | Desarrollar una plataforma web integral que permita registrar y gestionar el estado emocional, acceder a recursos educativos, expresar emociones y recibir apoyo personalizado | Lograr que al menos un 80% de los usuarios activos interactúen con al menos una de las funcionalidades principales (registro emocional, diario, recursos o notificaciones) durante los primeros 3 meses tras el lanzamiento | Implementando una interfaz intuitiva, contenido atractivo y recordatorios automáticos para fomentar la participación continua | Promueve la salud mental, la autogestión emocional y la detección temprana de crisis mediante tecnología accesible | Alcanzar estos resultados en los primeros 6 meses desde la publicación oficial de la web |
| Objetivo 3 (Específico) | Incluir una sección educativa con artículos, videos y ejercicios sobre gestión emocional | Alcanzar al menos 100 visitas mensuales a la sección de recursos durante el primer trimestre | Con contenido existente y creando material adaptado a distintos niveles de usuarios | Promueve la educación emocional y la autonomía personal |Publicar la sección de recursos en el primer mes tras el lanzamiento |

### Justificación de la distinción:

- Objetivo general (2): Orienta la visión global del proyecto y define el impacto esperado en la salud mental de los usuarios.
- Objetivos específicos (1 y 3): Son metas concretas que aseguran la protección de datos y la disponibilidad de recursos educativos, esenciales para un MVP sólido y seguro.

---

<br>

## B. Definición del MVP

El Producto Mínimo Viable incluye las funcionalidades esenciales que cumplen con los objetivos específicos y generales:

1. ***Registro diario de emociones y hábitos***:
Permite a los usuarios registrar su estado de ánimo, sueño, alimentación y actividad física diaria. Esta funcionalidad constituye la base de datos principal y sustenta el resto de las funcionalidades de la aplicación.

2. ***Diario libre seguro y compartible***:
Facilita la expresión personal y la regulación emocional, ofreciendo la posibilidad de compartir entradas mediante enlaces protegidos con contraseña. Garantiza la privacidad y confidencialidad del usuario.

3. ***Sistema de notificaciones y consejos personalizados***:
Basado en los patrones detectados en los registros del usuario, este sistema envía alertas y recomendaciones para fomentar hábitos saludables y acompañamiento digital continuo.

4. ***Botón de emergencia / enlaces a servicios oficiales***:
Incluye acceso directo a líneas de ayuda y recursos oficiales de salud mental, cumpliendo con criterios éticos y de seguridad esenciales en cualquier aplicación de bienestar emocional.

5. ***Sección educativa con artículos y recursos confiables***:
Proporciona información validada sobre depresión, autocuidado y técnicas de regulación emocional, promoviendo la alfabetización emocional y la autonomía de los usuarios.


Este MVP permite validar la propuesta de valor principal de la aplicación, medir la interacción de los usuarios y garantizar la seguridad y protección de datos, cumpliendo plenamente con los objetivos SMART definidos.

---

<br>

## C. Delimitación del alcance

Para garantizar la viabilidad del proyecto dentro del plazo y recursos disponibles, se ha definido qué funcionalidades sí se incluyen y cuáles no, con justificación detallada.

### Qué se incluirá (alcance positivo)

- Registro diario de emociones y hábitos del usuario.
  
- Diario libre seguro y compartible mediante enlace protegido.
  
- Notificaciones y consejos personalizados basados en patrones emocionales.
  
- Sección educativa con artículos, videos y ejercicios sobre gestión emocional.
  
- Botón de emergencia / acceso rápido a líneas de ayuda oficiales.
  
- Autenticación segura con opción de anonimato (alias temporal).
  
- Interfaz web responsiva y accesible desde móviles y PCs.
  

Estas funcionalidades constituyen el MVP y permiten ofrecer valor real a los usuarios, priorizando la seguridad, el seguimiento emocional y la educación en salud mental.

### Qué no se incluirá (alcance negativo)

- Chatbot de apoyo emocional.
  
- Integración con talleres online de ONGs.
  
- Funcionalidades avanzadas de análisis predictivo o IA compleja.
  
- Integración con apps externas de salud o wearables.

Estas exclusiones responden a limitaciones de tiempo y experiencia del equipo. Su implementación podría comprometer la calidad del MVP, aunque se consideran ampliaciones futuras.

### Posibles ampliaciones futuras

- Chatbot basado en Terapia Cognitivo Conductual (TCC).
  
- Integración con wearables y monitorización de hábitos físicos.
  
- Funcionalidades de predicción emocional mediante Inteligencia Artificial.
  
- Talleres online y colaboración con ONGs para educación emocional en tiempo real.

Estas ampliaciones permitirían incrementar la personalización y escalabilidad de la app, pero no son esenciales para demostrar valor en el MVP.

---

<br>

## Criterios de éxito

El éxito del proyecto se medirá a través de indicadores cuantitativos y cualitativos, garantizando que los objetivos SMART puedan evaluarse objetivamente:

1. ***Interacción de usuarios***:
    - Número de registros de usuario y frecuencia de uso de la aplicación.
    - Porcentaje de usuarios activos que completan diarios emocionales y utilizan recursos educativos.

2. ***Satisfacción y percepción***:
    - Valoraciones positivas en encuestas de satisfacción aplicadas tras 1 y 3 meses de uso.
    - Comentarios sobre la utilidad y facilidad de uso de la app.

3. ***Impacto en bienestar emocional***:
    - Mejora autoinformada del estado de ánimo tras varias semanas de uso.
    - Reducción de episodios de estrés o ansiedad percibidos por los usuarios (medido mediante escalas de seguimiento simples integradas en la app).

La combinación de métricas de uso y percepción permite evaluar tanto la adopción tecnológica como el efecto real sobre el bienestar emocional, asegurando que los objetivos SMART se cumplan de manera tangible.
