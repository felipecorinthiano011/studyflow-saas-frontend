# StudyFlow — Frontend

> Angular 21 SPA for the StudyFlow study management platform.

**Live:** https://studyflow-saas-frontend.vercel.app  
**Backend:** https://studyflow-saas-production.up.railway.app  
**Backend repo:** [felipecorinthiano011/studyflow-saas](https://github.com/felipecorinthiano011/studyflow-saas)

---

## Stack

| Technology | Purpose |
|---|---|
| Angular 21 (standalone) | SPA framework |
| NgRx Signal Store | Reactive state management |
| Tailwind CSS v4 | Utility-first styling |
| Cypress | E2E testing |
| @sentry/angular | Error monitoring |

---

## Running Locally

### Prerequisites
- Node.js 18+
- Backend running at `http://localhost:8080` (see [backend repo](https://github.com/felipecorinthiano011/studyflow-saas))

### Install & start

```bash
npm install
npx ng serve
```

Access: http://localhost:4200

### Environment

By default the app points to the production backend.  
To use a local backend, edit `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### Run E2E tests

```bash
npx cypress open   # interactive
npx cypress run    # headless
```

---

## Features

- ✅ Register and login with JWT authentication
- ✅ Create, list, update and delete study items
- ✅ Pagination — loads items in pages of 20
- ✅ Logged-in user always displayed in the navbar
- ✅ Toast notifications for errors and success actions
- ✅ Global error handling with `HttpErrorInterceptor`
