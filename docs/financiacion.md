# Plan de Financiación - MindCare

## Índice
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Costes Iniciales de Desarrollo](#costes-iniciales-de-desarrollo)
3. [Costes de Infraestructura y Servicios](#costes-de-infraestructura-y-servicios)
4. [Costes de Marketing y Lanzamiento](#costes-de-marketing-y-lanzamiento)
5. [Capital de Trabajo](#capital-de-trabajo)
6. [Necesidades Totales de Financiación](#necesidades-totales-de-financiación)
7. [Fuentes de Financiación Analizadas](#fuentes-de-financiación-analizadas)
8. [Plan de Financiación Propuesto](#plan-de-financiación-propuesto)
9. [Proyección de Ingresos y Viabilidad](#proyección-de-ingresos-y-viabilidad)
10. [Plan de Contingencia](#plan-de-contingencia)
11. [Conclusiones](#conclusiones)

---

## Resumen Ejecutivo

**MindCare** es una aplicación web de salud mental que ofrece herramientas de seguimiento emocional, diario personal con análisis por IA y recursos de bienestar. Este documento analiza las necesidades de financiación para llevar el proyecto desde el MVP actual hasta una operación sostenible en el mercado.

Desarrollado por un equipo de **3 estudiantes de DAW** (José Antonio Díaz, Adrián Díaz y Rocío Luque) durante 5 semanas intensivas (7 nov - 10 dic 2025), el MVP ha demostrado viabilidad técnica y potencial de mercado.

### Cifras Clave

| Concepto | Cantidad |
|----------|----------|
| **Inversión MVP realizada** | 14,118 € (432 horas de desarrollo) |
| **Inversión adicional necesaria** | 11,000 € |
| **Inversión inicial total** | 25,100 € |
| **Capital de trabajo (6 meses)** | 7,500 € |
| **Total financiación requerida** | 32,600 € |
| **Plazo hasta break-even** | 12-18 meses |
| **Modelo de negocio** | Freemium + Suscripciones |

---

## Costes Iniciales de Desarrollo

### Desarrollo del MVP (Ya Realizado)

Según el análisis detallado en [`presupuesto.md`](./presupuesto.md), el coste de desarrollo del MVP fue:

| Concepto | Coste |
|----------|-------|
| Desarrollo (432 horas) | 14,118 € |
| Infraestructura Año 1 | 192 € |
| Contingencia (10%) | 1,412 € |
| **SUBTOTAL MVP** | **15,722 €** |

**Equipo que desarrolló el MVP:**
- **José Antonio Díaz** (Junior / Database Manager): 77h → 1,386 €
- **Adrián Díaz** (Mid-Senior / Backend Lead): 171.5h → 6,860 €
- **Rocío Luque** (Mid / Frontend Lead): 183.5h → 5,872 €

### Desarrollo Post-MVP (Necesario para Lanzamiento)

Para preparar el producto para el mercado, se requiere desarrollo adicional:

| Concepto | Descripción | Horas | Coste |
|----------|-------------|-------|-------|
| **Solución nav móvil** | Corregir bug conocido del menú hamburguesa | 12h | 360 € |
| **Testing automatizado** | Tests unitarios, integración y E2E | 40h | 1,200 € |
| **Accesibilidad (WCAG 2.1)** | Mejorar accesibilidad para usuarios con discapacidad | 30h | 900 € |
| **Optimización SEO** | Meta tags, sitemap, structured data | 15h | 450 € |
| **Panel de administración** | Dashboard para gestionar usuarios y contenido | 50h | 1,750 € |
| **Sistema de notificaciones** | Email y push notifications | 25h | 750 € |
| **Integración de pagos** | Stripe/PayPal para suscripciones | 20h | 700 € |
| **Políticas legales** | Privacidad, Términos, RGPD | 10h | 300 € |
| **Performance optimization** | Lazy loading, caching, CDN | 20h | 600 € |
| **Security audit** | Revisión de seguridad, pentesting básico | 15h | 900 € |
| **SUBTOTAL POST-MVP** | | **237h** | **7,910 €** |

**Total Desarrollo Completo:** 15,722 € (MVP) + 7,910 € (Post-MVP) = **23,632 €**

### ¿Se Puede Afrontar sin Financiación Externa?

**Análisis:**
- El equipo actual (3 estudiantes) ya invirtió **432 horas** de su tiempo
- Necesitan **237 horas adicionales** para completar el producto
- Si continúan a **tiempo parcial** (10-15h/semana cada uno): **SÍ, técnicamente autofinanciable pero lento (4-6 meses más)**
- Si se requiere **dedicación completa** para lanzar en 2-3 meses: **NO, se requiere financiación externa**

**Realidad del equipo:**
- Son estudiantes de DAW con otras responsabilidades académicas
- No pueden permitirse trabajar a tiempo completo sin ingresos
- El momentum del proyecto puede perderse si se alarga demasiado

**Conclusión:** Para un lanzamiento competitivo en **3-4 meses**, se necesita financiación que cubra:
1. Tiempo de desarrollo del equipo (o contratación temporal de freelancers para tareas específicas)
2. Infraestructura escalable
3. Marketing inicial para tracción

---

## Costes de Infraestructura y Servicios

### Año 1 - Detalle Mensual

| Servicio | Proveedor | Mes 1-3 (MVP) | Mes 4-6 (Beta) | Mes 7-12 (Producción) | Total Año 1 |
|----------|-----------|---------------|----------------|-----------------------|-------------|
| **Hosting Backend** | Railway / Render | Gratuito | 5 €/mes | 20 €/mes | 155 € |
| **Hosting Frontend** | Vercel | Gratuito | Gratuito | Gratuito | 0 € |
| **Base de Datos** | MongoDB Atlas | Gratuito | Gratuito | 25 €/mes (M10) | 150 € |
| **Dominio** | Namecheap | 12 € (anual) | - | - | 12 € |
| **SSL Certificate** | Let's Encrypt | Gratuito | Gratuito | Gratuito | 0 € |
| **CDN / Storage** | Cloudinary | Gratuito | Gratuito | 20 €/mes | 120 € |
| **Email Transaccional** | SendGrid | Gratuito | 15 €/mes | 30 €/mes | 255 € |
| **Monitorización** | Sentry | Gratuito | Gratuito | 29 €/mes | 174 € |
| **Logs** | Papertrail | Gratuito | 7 €/mes | 15 €/mes | 111 € |
| **Analytics** | Google Analytics | Gratuito | Gratuito | Gratuito | 0 € |
| **API IA (Grok)** | xAI | 50 € (setup) | 80 €/mes | 150 €/mes | 1,130 € |
| **Backup & Recovery** | MongoDB Atlas | Incluido | Incluido | 15 €/mes | 90 € |
| **CI/CD** | GitHub Actions | Gratuito | Gratuito | Gratuito | 0 € |
| **Uptime Monitoring** | UptimeRobot | Gratuito | Gratuito | Gratuito | 0 € |
| **TOTAL MENSUAL** | | ~5 € | ~107 € | ~304 € | **2,197 €** |

### Años 2-3 - Escalado

| Concepto | Año 2 | Año 3 |
|----------|-------|-------|
| Infraestructura (escalado) | 4,500 € | 7,200 € |
| Soporte técnico (12h/mes) | 5,040 € | 5,040 € |
| **TOTAL** | **9,540 €** | **12,240 €** |

---

## Costes de Marketing y Lanzamiento

### Pre-Lanzamiento (Mes -2 a 0)

| Concepto | Descripción | Coste |
|----------|-------------|-------|
| **Identidad de Marca** | Logo profesional, guía de estilo, paleta de colores | 500 € |
| **Diseño Web Marketing** | Landing optimizada para conversión | 400 € |
| **Copywriting** | Textos persuasivos, storytelling | 300 € |
| **Material Gráfico** | Banners, posts para RRSS, infografías | 250 € |
| **Video Explicativo** | Video de 60-90 segundos del producto | 800 € |
| **Press Kit** | Materiales para medios de comunicación | 150 € |
| **SUBTOTAL PRE-LANZAMIENTO** | | **2,400 €** |

### Lanzamiento (Mes 1-3)

| Concepto | Descripción | Coste |
|----------|-------------|-------|
| **Google Ads** | Campaña de búsqueda + display (3 meses) | 1,200 € |
| **Facebook / Instagram Ads** | Publicidad segmentada (3 meses) | 900 € |
| **Content Marketing** | 12 posts de blog + SEO | 600 € |
| **Influencer Marketing** | Colaboraciones con micro-influencers salud mental | 800 € |
| **PR / Medios** | Notas de prensa, contacto con medios especializados | 400 € |
| **Community Management** | Gestión RRSS (3 meses, part-time) | 1,200 € |
| **Email Marketing** | Campaña de onboarding, setup Mailchimp | 150 € |
| **SUBTOTAL LANZAMIENTO** | | **5,250 €** |

### Post-Lanzamiento (Mes 4-12)

| Concepto | Mensual | 9 Meses | Total |
|----------|---------|---------|-------|
| Publicidad digital (reducida) | 200 € | × 9 | 1,800 € |
| Content marketing | 150 € | × 9 | 1,350 € |
| Community management | 300 € | × 9 | 2,700 € |
| **SUBTOTAL POST-LANZAMIENTO** | | | **5,850 €** |

**TOTAL MARKETING AÑO 1:** 2,400 € + 5,250 € + 5,850 € = **13,500 €**

---

## Capital de Trabajo

El **capital de trabajo** cubre los gastos operativos durante los primeros meses, cuando los ingresos son insuficientes o inexistentes.

### Gastos Fijos Mensuales

| Concepto | Coste Mensual |
|----------|---------------|
| Infraestructura (promedio) | 180 € |
| Marketing (promedio meses 4-12) | 650 € |
| Soporte técnico / Mantenimiento (4h/mes × 30€/h) | 120 € |
| Gastos administrativos | 100 € |
| **TOTAL MENSUAL** | **1,250 €** |

### Fondo de Emergencia Recomendado

**6 meses de gastos fijos:** 1,250 € × 6 = **7,500 €**

Este fondo cubre:
- Imprevistos técnicos (downtime, migraciones urgentes)
- Oportunidades de marketing no planificadas
- Contratación temporal de freelancers para tareas críticas
- Gastos legales (posibles reclamaciones, asesoría)
- Tiempo del equipo fundador sin ingresos durante la fase de tracción inicial

---

## Necesidades Totales de Financiación

### Resumen Consolidado

| Categoría | Coste |
|-----------|-------|
| **Desarrollo Post-MVP** | 7,910 € |
| **Infraestructura Año 1** | 2,197 € |
| **Marketing y Lanzamiento Año 1** | 13,500 € |
| **Capital de Trabajo (6 meses)** | 7,500 € |
| **Contingencia (10% del total)** | 3,111 € |
| **TOTAL NECESIDADES** | **34,218 €** |

**Nota:** El MVP ya está desarrollado (15,722 € invertidos por el equipo en forma de tiempo), por lo que NO se incluye en las necesidades de financiación. El equipo fundador aporta esto como capital inicial/sweat equity.

### Redondeado para Negociación

**Financiación requerida: 35,000 €**

### Distribución de Uso de Fondos

```
Desarrollo Post-MVP: 23% (8,000 €)
Marketing:           39% (13,500 €)
Infraestructura:      6% (2,100 €)
Capital Trabajo:     21% (7,500 €)
Contingencia:        11% (3,900 €)
```

---

## Fuentes de Financiación Analizadas

### 1. Autofinanciación (Bootstrapping)

**Descripción:** Financiar el proyecto con ahorros personales de los fundadores.

#### Ventajas
✅ **Control total:** No hay dilución de capital ni deuda.  
✅ **Flexibilidad:** Decisiones rápidas sin aprobaciones externas.  
✅ **Sin presión externa:** Crecimiento al ritmo del equipo.  
✅ **Aprendizaje:** Mayor disciplina financiera.

#### Desventajas
❌ **Riesgo personal alto:** Pérdida de ahorros personales.  
❌ **Crecimiento lento:** Recursos limitados para marketing y desarrollo.  
❌ **Oportunidad perdida:** Competidores con más recursos pueden adelantarse.  
❌ **Estrés financiero:** Presión sobre finanzas personales.

#### Viabilidad para MindCare
🟡 **Media-Baja**
- **35,000 €** es una cantidad significativa para ahorros personales de un equipo joven.
- Posible si se combina con trabajo part-time en otros proyectos (alarga el timeline a 12-18 meses).

---

### 2. Préstamos Bancarios

**Descripción:** Solicitar un préstamo a entidades bancarias tradicionales.

#### Condiciones Típicas
- **Monto:** 10,000 - 50,000 €
- **Interés:** 4-8% TAE (variable según perfil y avales)
- **Plazo:** 3-7 años
- **Requisitos:** Plan de negocio, avales personales o garantías
- **Carencia:** Posible periodo de carencia de 6-12 meses

#### Ventajas
✅ **Control total:** No se diluye el capital de la empresa.  
✅ **Importes significativos:** Se puede obtener financiación suficiente.  
✅ **Deducible fiscalmente:** Los intereses son gasto deducible.

#### Desventajas
❌ **Avales personales:** Riesgo de pérdida de patrimonio personal.  
❌ **Endeudamiento:** Obligación de pago independiente de resultados.  
❌ **Difícil acceso:** Bancos reticentes a financiar startups sin historial.  
❌ **Coste financiero:** Intereses aumentan el coste total.

#### Ejemplo de Préstamo
- **Principal:** 35,000 €
- **Interés:** 6% TAE
- **Plazo:** 5 años
- **Cuota mensual:** ~675 €
- **Total a pagar:** ~40,500 € (5,500 € en intereses)

#### Viabilidad para MindCare
🟡 **Media**
- Requiere avales sólidos (propiedades, ahorros significativos).
- La cuota mensual puede ser difícil de afrontar los primeros meses sin ingresos.
- Opción viable si se combina con otras fuentes (ej: 15,000 € préstamo + 20,000 € autofinanciación/subvenciones).

---

### 3. Ayudas y Subvenciones Públicas

**Descripción:** Financiación no reembolsable o préstamos con condiciones favorables de organismos públicos.

#### Principales Programas en España

##### A) ENISA (Empresa Nacional de Innovación)
- **Tipo:** Préstamo participativo
- **Monto:** 25,000 - 1,500,000 €
- **Interés:** Euríbor + 3-4% (+ variable según resultados)
- **Plazo:** Hasta 7 años, carencia hasta 5 años
- **Ventajas:** Sin avales personales, se considera patrimonio neto
- **Requisitos:** Empresa constituida, plan de negocio sólido, viabilidad técnica

##### B) ICO (Instituto de Crédito Oficial)
- **Tipo:** Líneas de financiación a través de bancos
- **Monto:** Variable
- **Interés:** Preferencial (3-5%)
- **Requisitos:** Canalizado a través de entidades financieras

##### C) Ayudas Autonómicas (ejemplo: Comunidad Valenciana)
- **IVACE:** Ayudas a la innovación y digitalización (hasta 50% subvencionado)
- **Cheques Innovación:** 6,000 - 20,000 € para servicios tecnológicos
- **Apoyo a Emprendedores:** Subvenciones de 3,000 - 15,000 €

##### D) Kit Digital (Red.es)
- **Monto:** Hasta 12,000 € (según tamaño empresa)
- **Cobertura:** 100% subvencionado
- **Uso:** Digitalización, presencia web, e-commerce, ciberseguridad

##### E) Programa Horizonte Europa
- **Tipo:** Subvención a fondo perdido
- **Monto:** Variable (proyectos desde 50,000 €)
- **Enfoque:** Proyectos de I+D+i con impacto social
- **Complejidad:** Alta, requiere consorcio o socios

#### Ventajas
✅ **No reembolsable o condiciones favorables:** Reduce riesgo financiero.  
✅ **Validación:** Obtener una ayuda pública da credibilidad.  
✅ **Sin dilución de capital:** Mantienes el 100% de la empresa.

#### Desventajas
❌ **Proceso largo:** 3-12 meses desde solicitud hasta cobro.  
❌ **Burocracia:** Documentación extensa, justificación de gastos.  
❌ **Incertidumbre:** No garantía de aprobación.  
❌ **Limitaciones de uso:** Fondos destinados a partidas específicas.

#### Viabilidad para MindCare
🟢 **Alta**
- **ENISA Jóvenes Emprendedores:** Muy adecuado para este perfil (25,000-75,000 €).
- **Kit Digital:** Puede cubrir parte de la infraestructura tecnológica.
- **Ayudas autonómicas:** Complementarias para marketing y desarrollo.
- **Recomendación:** Solicitar 2-3 programas en paralelo para aumentar probabilidad.

---

### 4. Business Angels

**Descripción:** Inversores privados que aportan capital a cambio de participación en la empresa (equity).

#### Perfil Típico
- **Inversión:** 10,000 - 100,000 € por angel
- **Equity:** 5-20% de la empresa
- **Valor:** No solo dinero, también mentoría, contactos y experiencia

#### Ventajas
✅ **Capital + Mentoría:** Aportan experiencia empresarial y networking.  
✅ **Flexibilidad:** Más rápido que VC, menos burocrático que bancos.  
✅ **Validación:** Su inversión es un sello de confianza.  
✅ **Smart money:** Conocimiento del sector puede acelerar crecimiento.

#### Desventajas
❌ **Dilución:** Pierdes parte de la propiedad de la empresa.  
❌ **Influencia en decisiones:** Puede haber conflictos estratégicos.  
❌ **Expectativas de retorno:** Presión para crecer rápido y exit.  
❌ **Búsqueda compleja:** Encontrar el angel adecuado lleva tiempo.

#### Redes de Business Angels en España
- **ESBAN** (Asociación Española de Business Angels)
- **AEBAN** (Red de redes)
- **SeedRocket, Conector, KFund Angels**

#### Ejemplo de Operación
- **Inversión:** 40,000 €
- **Valoración pre-money:** 160,000 €
- **Equity cedido:** 20%
- **Valoración post-money:** 200,000 €

#### Viabilidad para MindCare
🟢 **Alta**
- Proyecto con **impacto social** (salud mental) es atractivo.
- **MVP funcional** demuestra capacidad de ejecución.
- **Mercado en crecimiento:** Salud digital es sector en auge.
- **Recomendación:** Buscar angels con experiencia en healthtech o edtech.

---

### 5. Venture Capital (VC)

**Descripción:** Fondos de capital riesgo que invierten en startups con alto potencial de crecimiento y escalabilidad.

#### Perfil Típico
- **Inversión:** 100,000 - 5,000,000 € (rondas Seed y Serie A)
- **Equity:** 15-40%
- **Requisitos:** Tracción demostrable, escalabilidad, mercado grande

#### Ventajas
✅ **Capital significativo:** Permite crecimiento acelerado.  
✅ **Network y recursos:** Acceso a mentores, clientes y socios.  
✅ **Credibilidad:** Atrae talento y más inversores.

#### Desventajas
❌ **Dilución importante:** Pérdida significativa de control.  
❌ **Presión extrema:** Objetivos de crecimiento muy agresivos.  
❌ **Cambio de cultura:** Puede cambiar el ADN de la empresa.  
❌ **Muy competitivo:** Solo 1-2% de startups reciben inversión VC.

#### Fondos VC en España (Healthtech / SaaS)
- **Seaya Ventures**
- **Kfund**
- **JME Ventures**
- **Ship2B Ventures** (impacto social)
- **Clave Mayor** (healthtech)

#### Viabilidad para MindCare
🟡 **Baja-Media** (actualmente)
- **Prematuro:** VCs buscan más tracción (usuarios, ingresos).
- **Posible en 12-18 meses:** Una vez demostrado PMF (Product-Market Fit).
- **Recomendación:** Foco en angels/subvenciones ahora. VC para Ronda Seed tras validación.

---

### 6. Crowdfunding

**Descripción:** Financiación colectiva a través de plataformas online.

#### Tipos

##### A) Recompensas (Rewards-based)
- **Plataformas:** Kickstarter, Verkami, Goteo
- **Monto promedio:** 5,000 - 50,000 €
- **A cambio:** Producto, servicios, beneficios exclusivos

##### B) Equity Crowdfunding
- **Plataformas:** Crowdcube, Seedrs, The Crowd Angel
- **Monto:** 50,000 - 500,000 €
- **A cambio:** Participación en la empresa

#### Ventajas
✅ **Validación de mercado:** Demuestra interés real del público.  
✅ **Marketing incluido:** Visibilidad y construcción de comunidad.  
✅ **Sin deuda:** (En modelo de recompensas) No hay que devolver.

#### Desventajas
❌ **No garantizado:** Muchas campañas fracasan (tasa éxito ~30-40%).  
❌ **Trabajo intenso:** Requiere campaña de marketing previa y durante.  
❌ **Comisiones:** 5-10% del total recaudado.  
❌ **Todo o nada:** En algunas plataformas, si no alcanzas el objetivo no recibes nada.

#### Ejemplo de Campaña
- **Objetivo:** 30,000 €
- **Duración:** 30-45 días
- **Recompensas:**
  - 10 €: Agradecimiento y early access
  - 25 €: 6 meses de suscripción premium
  - 50 €: 1 año premium + consulta personalizada
  - 100 €: Paquete VIP + tu nombre en los créditos
  - 500 €: Para empresas: licencia corporativa

#### Viabilidad para MindCare
🟢 **Media-Alta**
- **Tema sensible:** Salud mental genera empatía.
- **Comunidad potencial:** Muchas personas interesadas en bienestar.
- **Riesgo:** Requiere inversión previa en video y marketing de campaña (~3,000 €).
- **Recomendación:** Kickstarter o Verkami para el mercado hispano. Goal realista de 25,000 €.

---

### 7. Aceleradoras e Incubadoras

**Descripción:** Programas que ofrecen financiación, formación, mentoría y networking a cambio de equity.

#### Principales en España

##### A) Lanzadera (Valencia)
- **Inversión:** Hasta 150,000 € (sin equity en fase inicial)
- **Duración:** 12 meses
- **Ventajas:** Espacios de coworking, mentores, acceso a inversores
- **Requisitos:** Proyecto innovador, equipo comprometido

##### B) Plug and Play
- **Inversión:** 50,000 - 150,000 €
- **Equity:** 5-8%
- **Network:** Acceso a corporaciones y VCs internacionales

##### C) Wayra (Telefónica)
- **Inversión:** 50,000 €
- **Equity:** ~8%
- **Ventajas:** Acceso a infraestructura Telefónica, clientes corporativos

##### D) Demium Startups
- **Inversión:** Hasta 100,000 € (equity + convertible note)
- **Equity:** 10-20%
- **Duración:** 6-12 meses

##### E) StartupBootcamp (Healthtech vertical)
- **Inversión:** 15,000 € + 450,000 € en servicios
- **Equity:** 8%
- **Ventajas:** Foco específico en healthtech

#### Ventajas
✅ **Formación intensiva:** Evitas errores comunes de emprendedores noveles.  
✅ **Networking de alto valor:** Contacto con inversores, mentores y potenciales clientes.  
✅ **Credibilidad:** Graduarse de una aceleradora reconocida abre puertas.  
✅ **Demo Day:** Exposición ante inversores.

#### Desventajas
❌ **Dilución de equity:** 5-10% puede ser significativo en el futuro.  
❌ **Tiempo intensivo:** Requiere dedicación full-time durante el programa.  
❌ **Competitivo:** Tasa de aceptación baja (2-5%).

#### Viabilidad para MindCare
🟢 **Alta**
- **Lanzadera:** Sin dilución inicial, ideal para empezar.
- **StartupBootcamp Healthtech:** Perfecto para el sector.
- **Recomendación:** Aplicar a 3-5 aceleradoras en paralelo. Timeline: aplicaciones en enero-marzo para programas de verano.

---

## Plan de Financiación Propuesto

Basándome en el análisis anterior, propongo una **estrategia híbrida** que minimiza el riesgo y maximiza las probabilidades de éxito.

### Estrategia Recomendada: Combinación de Fuentes

#### Fase 1 (Mes 0-3): Arranque con Autofinanciación + Ayudas Públicas

| Fuente | Monto Objetivo | Uso de Fondos | Probabilidad |
|--------|----------------|---------------|--------------|
| **Autofinanciación** (ahorros equipo) | 8,000 € | Desarrollo post-MVP, primeros gastos | 100% |
| **Kit Digital** | 12,000 € | Infraestructura, desarrollo | 70% |
| **Ayuda Autonómica** | 10,000 € | Marketing, desarrollo | 60% |
| **TOTAL FASE 1** | **30,000 €** | | |

**Acciones:**
1. Solicitar **Kit Digital** inmediatamente (plazo: 2-3 meses).
2. Aplicar a **ayudas autonómicas** de emprendimiento.
3. Continuar desarrollo part-time con recursos propios.
4. Preparar documentación para ENISA.

#### Fase 2 (Mes 3-6): Aceleradora + ENISA

| Fuente | Monto Objetivo | Equity Cedido | Probabilidad |
|--------|----------------|---------------|--------------|
| **Aceleradora (Lanzadera)** | 50,000 € + servicios | 0-5% | 40% |
| **ENISA Jóvenes Emprendedores** | 25,000 € | 0% (préstamo) | 50% |
| **TOTAL FASE 2** | **75,000 €** | | |

**Acciones:**
1. Aplicar a **Lanzadera, Demium, Plug and Play**.
2. Presentar solicitud a **ENISA** con business plan robusto.
3. Si aceptados en aceleradora: dedicación full-time del equipo.
4. Lanzar beta cerrada con primeros usuarios.

#### Fase 3 (Mes 6-12): Business Angel + Crowdfunding

| Fuente | Monto Objetivo | Equity Cedido | Probabilidad |
|--------|----------------|---------------|--------------|
| **Business Angel** | 40,000 € | 15-20% | 50% |
| **Crowdfunding (Kickstarter)** | 25,000 € | 0% | 40% |
| **TOTAL FASE 3** | **65,000 €** | | |

**Acciones:**
1. Networking con **Business Angels** durante la aceleradora.
2. Preparar y lanzar campaña de **crowdfunding** (2 meses de preparación).
3. Usar el crowdfunding también como herramienta de marketing.
4. Lanzamiento público beta abierta.

### Resumen de la Estrategia

| Fase | Fuentes Principales | Capital Total | Equity Cedido | Timeline |
|------|---------------------|---------------|---------------|----------|
| **Fase 1** | Autofinanciación + Ayudas | 30,000 € | 0% | Mes 0-3 |
| **Fase 2** | Aceleradora + ENISA | 75,000 € | 0-5% | Mes 3-6 |
| **Fase 3** | Business Angel + Crowdfunding | 65,000 € | 15-20% | Mes 6-12 |
| **TOTAL** | **Múltiples fuentes** | **170,000 €** | **15-25%** | **12 meses** |

### Justificación de la Estrategia

1. **Minimiza riesgo personal:** Comienza con autofinanciación mínima + ayudas no reembolsables.
2. **Escala progresivamente:** Cada fase valida el proyecto antes de buscar más financiación.
3. **Mantiene control:** Dilución máxima del 25% en el primer año.
4. **Flexibilidad:** Si una fuente falla, hay alternativas.
5. **Validación continua:** Cada hito (ayudas, aceleradora, angel) valida el proyecto.

### Plan B (Si Fases 2-3 Fallan)

Si no se consigue entrar en aceleradora ni conseguir ENISA/Angels:

| Fuente | Monto | Condiciones |
|--------|-------|-------------|
| **Crowdfunding solo** | 25,000 € | 0% equity |
| **Préstamo bancario ICO** | 15,000 € | Interés preferencial 4% |
| **Autofinanciación adicional** | 5,000 € | Ahorros personales |
| **TOTAL PLAN B** | **45,000 €** | |

Con 45,000 € se puede lanzar una versión más reducida y crecer orgánicamente.

---

## Proyección de Ingresos y Viabilidad

### Modelo de Negocio: Freemium + Suscripciones

| Plan | Precio | Características | Target |
|------|--------|----------------|--------|
| **Free** | 0 € | Diario básico, 5 entradas/mes, emociones básicas | Usuarios casuales |
| **Premium** | 6.99 €/mes (79 €/año) | Ilimitado, análisis IA, exportación, sin ads | Usuarios comprometidos |
| **Terapia** | 14.99 €/mes (159 €/año) | Todo Premium + sesiones con psicólogos (online) | Usuarios con necesidad terapéutica |
| **Enterprise** | Custom (200-500 €/mes) | Licencias corporativas para empresas (bienestar empleados) | Empresas, universidades |

### Proyección de Usuarios (Año 1)

| Mes | Usuarios Totales | Free | Premium (6.99€) | Terapia (14.99€) | MRR | 
|-----|------------------|------|-----------------|------------------|-----|
| 1-3 | 100 (beta) | 90 | 10 | 0 | 70 € |
| 4-6 | 500 | 450 | 40 | 10 | 430 € |
| 7-9 | 2,000 | 1,700 | 250 | 50 | 2,498 € |
| 10-12 | 5,000 | 4,200 | 650 | 150 | 6,793 € |

**Tasa de conversión Free → Premium:** 10-15% (estándar para SaaS)  
**Churn mensual:** 5% (objetivo: bajar a 3% en 6 meses)

### Ingresos Año 1

| Concepto | Monto |
|----------|-------|
| Suscripciones | 32,500 € |
| Enterprise (2 clientes) | 8,000 € |
| **TOTAL** | **40,500 €** |

### Proyección 3 Años

| Año | Usuarios | MRR (final de año) | Ingresos Anuales | Gastos | Beneficio |
|-----|----------|-------------------|------------------|--------|-----------|
| **Año 1** | 5,000 | 6,793 € | 40,500 € | 45,000 € | -4,500 € |
| **Año 2** | 25,000 | 30,000 € | 250,000 € | 180,000 € | +70,000 € |
| **Año 3** | 80,000 | 90,000 € | 850,000 € | 450,000 € | +400,000 € |

**Break-even:** Mes 14-16 (mitad del Año 2)

### Supuestos

- Crecimiento mensual usuarios: 15-25%
- Tasa de conversión: 12%
- Churn: 5% → 3%
- Ticket medio: 9 €/usuario premium
- CAC (Coste de Adquisición): 15 € → 8 € (mejora con SEO y organic)
- LTV (Lifetime Value): 180 € (20 meses de retención × 9 €)
- Ratio LTV/CAC: 12:1 (excelente)

---

## Plan de Contingencia

### Escenarios de Riesgo

#### Escenario 1: Financiación Insuficiente (-30%)

**Situación:** Solo se consiguen 25,000 € en lugar de 35,000 €.

**Acciones:**
1. Reducir marketing agresivo: -5,000 €
2. Posponer features no-core (panel admin complejo): -3,000 €
3. Infraestructura mínima (mantener planes gratuitos más tiempo): -2,000 €
4. **Total ahorrado:** 10,000 €

**Impacto:** Lanzamiento con 2-3 meses de retraso, crecimiento más lento.

#### Escenario 2: Fracaso de Tracción (usuarios < esperados)

**Situación:** A los 6 meses solo hay 1,000 usuarios (objetivo: 2,000).

**Acciones:**
1. Pivotar estrategia de marketing: focus en nicho específico (ej: estudiantes universitarios).
2. Partnerships con universidades, empresas, asociaciones de salud mental.
3. Reducir burn rate: -30% en marketing pagado, +50% en content marketing (SEO).
4. Fundraising adicional: buscar business angel o crowdfunding.

#### Escenario 3: Competencia Agresiva

**Situación:** Competidor lanza producto similar con más recursos.

**Acciones:**
1. **Diferenciación:** Focus en IA de análisis emocional + contenido en español.
2. **Comunidad:** Construir comunidad fuerte y leal.
3. **Partnerships exclusivos:** Alianzas con instituciones de salud mental.
4. **Freemium generoso:** Plan gratuito más atractivo que la competencia.

---

## Conclusiones

### Resumen Ejecutivo de Financiación

| Aspecto | Conclusión |
|---------|------------|
| **Financiación necesaria** | 35,000 € iniciales |
| **Estrategia recomendada** | Híbrida: Autofinanciación + Ayudas + Aceleradora + Business Angel |
| **Equity a ceder** | 15-25% en el primer año |
| **Break-even** | Mes 14-16 |
| **Viabilidad** | Alta, con correcta ejecución y validación de mercado |

### Recomendaciones Finales

1. **Prioridad 1:** Solicitar ayudas públicas (Kit Digital, ayudas autonómicas) **AHORA**.
2. **Prioridad 2:** Aplicar a aceleradoras (deadlines Q1 2026).
3. **Prioridad 3:** Networking con Business Angels durante los próximos 3 meses.
4. **Prioridad 4:** Preparar campaña de crowdfunding como plan B y herramienta de marketing.

### Factores Críticos de Éxito

✅ **Tracción temprana:** Conseguir primeros 1,000 usuarios en 6 meses.  
✅ **Retención:** Mantener churn <5%.  
✅ **Conversión:** Lograr 10-15% de conversión Free → Premium.  
✅ **Partnerships:** Alianzas con instituciones de salud mental.  
✅ **Equipo:** Mantener equipo motivado y alineado.

### Próximos Pasos (30 días)

- [ ] **Semana 1:** Solicitar Kit Digital
- [ ] **Semana 2:** Preparar documentación para ayudas autonómicas
- [ ] **Semana 3:** Aplicar a 3 aceleradoras (Lanzadera, Demium, Plug and Play)
- [ ] **Semana 4:** Networking: asistir a eventos de emprendimiento y salud digital
- [ ] **Semana 4:** Preparar business plan completo para ENISA

---

**Documento generado:** 10-12-2025  
**Versión:** 1.0  
**Equipo:** MindCare Development Team  
**Próxima revisión:** Tras conseguir primera fuente de financiación

