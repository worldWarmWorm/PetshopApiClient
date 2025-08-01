# Project Restructuring Documentation

## Overview

This project has been restructured to follow the standard Golang project layout as defined in [golang-standards/project-layout](https://github.com/golang-standards/project-layout/blob/master/README_ru.md).

## Changes Made

### Directory Structure

The project structure has been changed from:

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

To:

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

### Import Paths

All import paths have been updated to reflect the new directory structure:

- `PetshopApiClient/client` → `PetshopApiClient/internal/client`
- `PetshopApiClient/handlers` → `PetshopApiClient/internal/handlers`
- `PetshopApiClient/models` → `PetshopApiClient/internal/models`

### File Paths

The path to the frontend build files in `main.go` has been updated:
- `frontend/build/index.html` → `web/frontend/build/index.html`

## Standard Layout Explanation

The new structure follows these standard Golang project layout principles:

- `/cmd` - Main applications for this project
  - `/cmd/api` - The API server application
- `/internal` - Private application and library code
  - `/internal/client` - API client code
  - `/internal/handlers` - HTTP request handlers
  - `/internal/models` - Data models
- `/web` - Web application specific components
  - `/web/frontend` - Frontend React application

## Benefits

This restructuring provides several benefits:

1. Better organization and separation of concerns
2. Clearer distinction between application code and libraries
3. Improved maintainability through standard conventions
4. Better visibility of private vs public code
5. Easier onboarding for new developers familiar with Go standards