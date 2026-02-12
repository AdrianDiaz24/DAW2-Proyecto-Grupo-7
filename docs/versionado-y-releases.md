# Versionado y Releases

Esta documentación describe la estrategia de versionado y proceso de releases para el proyecto MindCare.

## Estrategia de Versionado

MindCare sigue **Semantic Versioning (SemVer)** versión 2.0.0 especificado en [semver.org](https://semver.org/spec/v2.0.0.html).

### Formato de Versión

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
```

**Ejemplos:**
- `1.0.0` - Versión estable inicial
- `1.2.3` - Tres parches aplicados
- `2.0.0-beta.1` - Pre-release beta
- `1.0.0-rc.2+build.123` - Release candidate con metadata de build

### Reglas de Incremento

| Tipo | Incremento | Cuándo | Ejemplo |
|------|-----------|--------|---------|
| **MAJOR** | X.0.0 | Cambios incompatibles en API pública | 1.0.0 → 2.0.0 |
| **MINOR** | X.Y.0 | Nuevas características compatibles | 1.0.0 → 1.1.0 |
| **PATCH** | X.Y.Z | Correcciones de bugs | 1.0.0 → 1.0.1 |

**Ejemplos de cambios:**

- ✅ **MAJOR** - Cambiar estructura de respuesta JSON, eliminar endpoint, cambiar autenticación
- ✅ **MINOR** - Agregar nuevo endpoint, nueva métrica, mejorar performance sin breaking changes
- ✅ **PATCH** - Corregir bug, actualizar dependencia con mismo API

## Proceso de Release

### Automático vs Manual

#### Manual (Recomendado para esta fase)

```bash
# Hacer un release patch (1.0.0 → 1.0.1)
./scripts/release.sh patch

# Hacer un release minor (1.0.1 → 1.1.0)
./scripts/release.sh minor

# Hacer un release major (1.0.0 → 2.0.0)
./scripts/release.sh major
```

El script automáticamente:
1. ✅ Incrementa versión en `package.json`
2. ✅ Actualiza `CHANGELOG.md`
3. ✅ Crea commit con mensaje estándar
4. ✅ Crea Git tag anotado
5. ⚠️ Requiere manual: `git push` y `git push --tags`

### Pasos Manuales de Release

Si prefieres hacer todo manualmente:

**1. Actualizar versión en package.json:**
```bash
npm version minor  # o major, patch
```

**2. Editar CHANGELOG.md:**

Agregue una entrada como esta al inicio (después de `[Unreleased]`):

```markdown
## [1.1.0] - 2025-02-12

### Added
- Nueva métrica de performance
- Dashboard de observabilidad

### Fixed
- Corregir rotación de logs

### Security
- Actualizar dependencias críticas
```

**3. Hacer commit:**
```bash
git add package.json package-lock.json CHANGELOG.md
git commit -m "Release v1.1.0"
```

**4. Crear tag:**
```bash
git tag -a v1.1.0 -m "Release v1.1.0"
```

**5. Hacer push:**
```bash
git push origin main
git push origin v1.1.0
```

**6. Crear Release en GitHub:**
- Ir a: https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/releases
- Click "Create a new release"
- Tag: `v1.1.0`
- Título: `v1.1.0`
- Descripción: Copiar contenido de CHANGELOG.md para esta versión
- ✅ "Publish release"

## Archivo CHANGELOG.md

El archivo `CHANGELOG.md` documenta todos los cambios por versión.

### Formato

Seguimos [Keep a Changelog](https://keepachangelog.com/en/1.0.0/):

```markdown
# Changelog

## [Unreleased]

### Added
- Nueva característica XYZ

### Changed
- Cambio en endpoint /api/users

### Deprecated
- La ruta /api/old-endpoint será removida en 2.0.0

### Removed
- Remover soporte de API v1 (deprecado en 1.2.0)

### Fixed
- Corregir fuga de memoria en MongoDB
- Arreglar validación de email

### Security
- Parchar vulnerabilidad en JWT
- Actualizar Helmet.js a 8.1.0

## [1.0.0] - 2025-02-12

### Added
- Release inicial con características core

```

### Secciones Válidas (en orden)

1. **Added** - Nuevas características
2. **Changed** - Cambios en funcionalidad existente
3. **Deprecated** - Funcionalidad que será removida pronto
4. **Removed** - Funcionalidad removida
5. **Fixed** - Correcciones de bugs
6. **Security** - Parches de seguridad

### Buenas Prácticas

- ✅ Mantener `[Unreleased]` en la parte superior
- ✅ Listar cambios en orden de importancia
- ✅ Ser específico: "Corregir validación de email" > "Corregir bugs"
- ✅ Incluir referencia a PR o issue cuando sea posible
- ✅ Usar segundo párrafo descriptivo para cambios complejos

**Ejemplo con referencias:**

```markdown
### Fixed
- Fix email validation regex (#123)
- Prevent SQL injection in search endpoint
  - Affected: /api/search
  - Impact: Security
  - Fix: Added parameterized queries
```

## Versionado de Dependencias

### Política de Actualización

```json
{
  "dependencies": {
    "express": "^4.18.0",      // MINOR y PATCH automáticos
    "mongoose": "^8.0.0",       // MINOR y PATCH automáticos
    "prom-client": "~14.2.0"   // Solo PATCH automáticos (más restrictivo)
  }
}
```

**Símbolos:**
- `^` - Permite cambios MINOR y PATCH: ^1.2.3 → <2.0.0
- `~` - Permite solo cambios PATCH: ~1.2.3 → <1.3.0
- `=` o nada - Versión exacta: 1.2.3

### Dependabot

El proyecto tiene Dependabot habilitado en GitHub:
- ✅ Crea PRs automáticos para actualizaciones
- ✅ Ejecuta tests automáticamente
- ✅ Requiere revisión manual antes de merge

## Git Tags

Los tags son versiones inmutables marcadas en Git.

### Listar tags:
```bash
git tag -l                      # Listar todos
git tag -l "v1.*"              # Filtrar por patrón
```

### Crear tag manualmente:
```bash
# Anotado (recomendado para releases)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Lightweight (simple referencia)
git tag v1.0.0-lw
```

### Eliminar tag (solo si no está pusheado):
```bash
git tag -d v1.0.0
```

### Forzar eliminar tag remoto (⚠️ cuidado):
```bash
git push origin --delete v1.0.0
```

## GitHub Releases

GitHub Releases es una forma amigable de gestionar versiones.

### Crear una Release

1. **Ir a Releases:** https://github.com/AdrianDiaz24/DAW2-Proyecto-Grupo-7/releases
2. **Crear nueva:** Click "Create a new release"
3. **Completar formulario:**
   - **Tag:** `v1.0.0` (Git tag que ya existe)
   - **Title:** `Version 1.0.0`
   - **Description:** Copiar de CHANGELOG.md
   - **Pre-release:** Marcar si es beta/rc
   - **Set as latest:** Marcar para versión estable
4. **Publicar:** Click "Publish release"

### Estructura Recomendada de Release

```
# MindCare v1.1.0 - February 12, 2025

## 🎉 Highlights
- Nueva infraestructura de observabilidad
- Mejoras de performance en MongoDB

## 📋 Changelog

### ✨ Added
- Prometheus metrics endpoint
- Winston structured logging
- Daily rotating log files

### 🔧 Changed
- Mejorar latencia API en 30%

### 🐛 Fixed
- Corregir memory leak en conexiones

### 🔐 Security
- Actualizar dependencias críticas

## 📦 Installation

```bash
npm install
npm start
```

## 🔗 Links
- [Full Changelog](https://github.com/.../CHANGELOG.md)
- [Commits](https://github.com/.../compare/v1.0.0...v1.1.0)
```

## Integración con CI/CD

### GitHub Actions para Release

Se puede crear un workflow automático:

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          body_path: CHANGELOG.md
          draft: false
          prerelease: false
```

## Versionado de Docker Images

Las imágenes Docker se etiquetan con:

```bash
# Desarrollo
docker build -t mindcare-backend:dev .

# Por versión
docker build -t mindcare-backend:1.1.0 .

# Latest
docker build -t mindcare-backend:latest .

# Push a registry
docker push myregistry/mindcare-backend:1.1.0
```

En GitHub Actions (CI/CD):
```yaml
- name: Build and push Docker image
  run: |
    docker build -t $REGISTRY/mindcare-backend:${{ github.ref_name }} .
    docker push $REGISTRY/mindcare-backend:${{ github.ref_name }}
```

## Versionado de API

### Estrategia de Versión de Endpoint

```
/api/v1/auth/login      # Versión 1
/api/v2/auth/login      # Versión 2 (breaking change)
```

**Política:**
- ✅ Soportar mínimo 2 versiones simultáneamente
- ✅ Deprecar con cabecera `Deprecation: true`
- ✅ Publicar fecha de fim de soporte en CHANGELOG

**Ejemplo:**
```javascript
// Deprecar v1
app.use('/api/v1', (req, res, next) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', new Date('2025-12-31').toUTCString());
  next();
});
```

## Checklist de Release

Antes de hacer release:

- [ ] Todos los tests pasando
- [ ] CHANGELOG.md actualizado
- [ ] Versión actualizada en package.json
- [ ] Código revisado y mergeado a main
- [ ] No hay TODOs críticos en el código
- [ ] Documentación actualizada
- [ ] Dependencias auditadas (`npm audit`)
- [ ] Build de Docker funciona
- [ ] Variables de entorno documentadas

## Referencias

- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [npm version](https://docs.npmjs.com/cli/commands/npm-version)

