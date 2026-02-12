#!/bin/bash

# Script de Release para MindCare
# Uso: ./scripts/release.sh [major|minor|patch]
# Ejemplo: ./scripts/release.sh minor
#
# Este script:
# 1. Incrementa la versión semántica
# 2. Actualiza CHANGELOG.md
# 3. Crea un commit
# 4. Crea un Git tag
# 5. Realiza push (opcional)

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Validar argumentos
if [ $# -ne 1 ]; then
    log_error "Uso: $0 [major|minor|patch]"
    exit 1
fi

VERSION_TYPE=$1

# Validar que el tipo de versión sea válido
if [[ ! "$VERSION_TYPE" =~ ^(major|minor|patch)$ ]]; then
    log_error "Tipo de versión inválido. Use: major, minor, o patch"
    exit 1
fi

# Obtener versión actual desde package.json
CURRENT_VERSION=$(node -e "console.log(require('./package.json').version)")
log_info "Versión actual: $CURRENT_VERSION"

# Calcular nueva versión (implementación simple)
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]:-0}
PATCH=${VERSION_PARTS[2]:-0}

case $VERSION_TYPE in
    major)
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
    minor)
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    patch)
        PATCH=$((PATCH + 1))
        ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
log_info "Nueva versión: $NEW_VERSION"

# Actualizar versión en package.json
log_info "Actualizando package.json..."
npm version "$NEW_VERSION" --no-git-tag-v

# Obtener la fecha actual
RELEASE_DATE=$(date +%Y-%m-%d)

# Crear entrada en CHANGELOG.md
log_info "Actualizando CHANGELOG.md..."

# Leer el contenido actual de CHANGELOG.md
CHANGELOG_CONTENT=$(cat CHANGELOG.md)

# Crear nueva entrada para la versión
NEW_ENTRY="## [$NEW_VERSION] - $RELEASE_DATE

### Added
- (Describe nuevas características)

### Changed
- (Describe cambios)

### Fixed
- (Describe correcciones de bugs)

### Security
- (Describe parches de seguridad)

---

$CHANGELOG_CONTENT"

# Escribir el nuevo contenido
echo "$NEW_ENTRY" > CHANGELOG.md

log_info "CHANGELOG.md actualizado"

# Agregar cambios a git
log_info "Preparando commit..."
git add package.json package-lock.json CHANGELOG.md

# Crear commit
COMMIT_MESSAGE="Release v$NEW_VERSION"
git commit -m "$COMMIT_MESSAGE"

# Crear tag
log_info "Creando Git tag..."
git tag -a "v$NEW_VERSION" -m "$COMMIT_MESSAGE"

log_info "${GREEN}Release completado exitosamente!${NC}"
log_info "Versión: $NEW_VERSION"
log_info "Tag creado: v$NEW_VERSION"
log_info ""
log_warning "Pasos siguientes:"
log_warning "1. Revisar cambios: git log --oneline -5"
log_warning "2. Hacer push de cambios: git push origin main"
log_warning "3. Hacer push de tags: git push origin v$NEW_VERSION"
log_warning "4. Crear Release en GitHub con los cambios del CHANGELOG"

exit 0

