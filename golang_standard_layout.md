# Standard Golang Project Layout

Based on the standard defined at https://github.com/golang-standards/project-layout

## Key Directories

1. `/cmd` - Main applications for this project. Each application should have its own directory under /cmd.
2. `/internal` - Private application and library code that you don't want others importing.
3. `/pkg` - Library code that's ok to use by external applications.
4. `/api` - OpenAPI/Swagger specs, JSON schema files, protocol definition files.
5. `/web` - Web application specific components: static web assets, server side templates, SPAs.
6. `/configs` - Configuration file templates or default configs.
7. `/build` - Packaging and Continuous Integration scripts.
8. `/deployments` - IaaS, PaaS, system and container orchestration deployment configurations and templates.
9. `/test` - Additional external test apps and test data.
10. `/docs` - Design and user documents.
11. `/tools` - Supporting tools for this project.
12. `/scripts` - Scripts to perform various build, install, analysis, etc operations.
13. `/vendor` - Application dependencies (managed by dependency management tools).

## Application Directories

- `/cmd/[app_name]` - Main applications of the project
- `/internal/app/[app_name]` - Private application code
- `/internal/pkg/[pkg_name]` - Private library code
- `/pkg/[pkg_name]` - Public library code

## Common Application Directories

- `/internal/app/[app_name]/models` - Data models
- `/internal/app/[app_name]/handlers` or `/internal/app/[app_name]/controllers` - Request handlers
- `/internal/app/[app_name]/services` - Business logic
- `/internal/app/[app_name]/repositories` - Data access layer