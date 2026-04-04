# StudyFlow Frontend — Copilot Instructions

Angular 21 SPA for a study/learning management platform. Consumes a Java Spring Boot REST API with JWT authentication. Deployed to Vercel (frontend) and Railway (backend).

## Build & Test

```bash
npm start          # dev server → http://localhost:4200
npm run build      # production build
npm test           # unit tests (Karma/Jasmine)
```

Backend must be running at `http://localhost:8080` for local development (see [README.md](../README.md)).

## Architecture

```
src/app/
  pages/        # Feature pages (login, register, study-items) — lazy-loaded
  services/     # AuthService, StudyItemService — providedIn: 'root'
  guards/       # Functional route guard (authGuard)
  interceptors/ # Functional HTTP interceptor (authInterceptor — adds Bearer token, handles 401/403)
src/environments/ # environment.ts (dev) / environment.prod.ts (prod) — file-replaced at build
```

- **All components are standalone** (`standalone: true`) — never use NgModules
- Routes use `loadComponent()` for lazy loading
- App bootstrapped with `bootstrapApplication()` in `main.ts`

## Key Conventions

**Components**
- Standalone with explicit `imports` array
- Template-driven forms with `FormsModule` (not reactive forms)
- Per-component SCSS via `styleUrl`
- Loading states: boolean flags (`isLoading`); errors: string properties bound in template

**Services & HTTP**
- `HttpClient` with typed generics — `http.get<StudyItem[]>(...)`
- Error handling in component `.subscribe({ next, error })` callbacks
- API base URL always from `environment.apiUrl` — never hardcode URLs
- Auth token stored in `localStorage` under key `token`

**Routing**
- Guard: `canActivate: [authGuard]` on protected routes
- Unauthenticated → redirect to `/login`; 401/403 response → interceptor logs out and redirects

**Styling**
- Tailwind CSS v4 utility classes in templates
- Global styles in `src/styles.scss`; component-specific in `*.scss` files

**Language**
- UI strings and error messages are in **Portuguese (PT-BR)** — keep all user-facing text in PT-BR

**TypeScript**
- Strict mode is on — no implicit `any`, no implicit returns
- Define interfaces for all API request/response shapes

## Adding New Features

1. Generate with Angular CLI: `npx ng generate component pages/my-feature --standalone`
2. Add a lazy route in `src/app/app.routes.ts` using `loadComponent()`
3. Apply `canActivate: [authGuard]` if the route requires authentication
4. Use `StudyItemService` as a reference for new service patterns
