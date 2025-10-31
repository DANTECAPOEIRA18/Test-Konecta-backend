# Test-Konecta-backend
Esta prueba fue hecha con arquitectura por capas(DDD):
- Interface(API)
- Aplicacion: servicios
- Dominio: entities
- INfraestructura: TypeORM

# Test-Konecta-backend Patrones de diseño
- Dependency injection (IoC)
- Repository
- DTO
- Validation/Guard clauses
- Adapter
- Factory
- CQS(Command-Query separation)
- Mapper
- configuration as a module
- Exception handling



# Version NodeJs
NodeJs = 22

# Clonar el repositorio
git clone <url repo>
cd Test-Konecta-backend

# instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env

# Levantar con docker base de datos
docker compose build
docker compose up -d

# Correr servicio localhost:3000
npm run start:dev

