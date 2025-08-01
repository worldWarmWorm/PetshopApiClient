# Project Restructuring Plan

## Current Structure
```
PetshopApiClient/
├── client/
│   └── client.go
├── frontend/
│   └── ...
├── handlers/
│   ├── pet_handlers.go
│   ├── store_handlers.go
│   └── user_handlers.go
├── models/
│   └── models.go
├── main.go
├── go.mod
└── go.sum
```

## New Structure (Following Standard Layout)
```
PetshopApiClient/
├── cmd/
│   └── api/
│       └── main.go
├── internal/
│   ├── client/
│   │   └── client.go
│   ├── handlers/
│   │   ├── pet_handlers.go
│   │   ├── store_handlers.go
│   │   └── user_handlers.go
│   └── models/
│       └── models.go
├── web/
│   └── frontend/
│       └── ...
├── go.mod
└── go.sum
```

## Changes Required

1. Create new directories:
   - `/cmd/api`
   - `/internal/client`
   - `/internal/handlers`
   - `/internal/models`
   - `/web/frontend`

2. Move files:
   - Move `main.go` to `/cmd/api/main.go`
   - Move `client/client.go` to `/internal/client/client.go`
   - Move `handlers/*.go` to `/internal/handlers/`
   - Move `models/models.go` to `/internal/models/models.go`
   - Move `frontend/*` to `/web/frontend/`

3. Update import paths in all files:
   - Update `PetshopApiClient/client` to `PetshopApiClient/internal/client`
   - Update `PetshopApiClient/handlers` to `PetshopApiClient/internal/handlers`
   - Update `PetshopApiClient/models` to `PetshopApiClient/internal/models`

4. Update file paths in code:
   - Update frontend path in `main.go` from `frontend/build/index.html` to `web/frontend/build/index.html`