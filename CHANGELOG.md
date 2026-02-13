# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Observability infrastructure with Morgan HTTP logging
- Prometheus metrics endpoint `/api/metrics` for monitoring
- MongoDB query instrumentation and performance metrics
- Daily rotating log files for production environments
- Structured JSON logging support

### Changed
- Enhanced security headers with Helmet.js
- Improved CORS configuration documentation
- Updated dependencies to latest secure versions

### Fixed
- Potential rate limiting edge cases

## [1.0.0] - 2025-02-12

### Added
- Core authentication system with JWT tokens
- Emergency contact management
- Daily mood tracking and journal entries
- Initial assessment form with AI integration
- Grok API integration for AI-powered advice
- Complete REST API with validation
- Docker containerization (Frontend, Backend, MongoDB)
- Docker Compose orchestration for local development
- CI/CD pipeline with GitHub Actions
- Automated security scanning with Trivy
- Rate limiting and CORS protection
- Comprehensive documentation and deployment guides
- Health check endpoints
- MongoDB integration with Mongoose
- User registration and login system
- Request logging middleware

### Security
- JWT authentication for protected routes
- Password hashing with bcrypt
- Environment variable protection (.env.example provided)
- CORS configuration for frontend security
- Rate limiting on API endpoints
- Helmet.js security headers
- Dependabot integration for dependency scanning

### Documentation
- Complete API documentation with Postman collections
- Deployment guide with Docker and production setup
- Architecture documentation for authentication
- SECURITY.md with responsible disclosure process
- Comprehensive README with installation instructions

---

## Versions Format

- `[Unreleased]` - Changes that will be in next release
- `[X.Y.Z]` - Released versions with date (YYYY-MM-DD)
- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security vulnerability fixes

