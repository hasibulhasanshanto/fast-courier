# React + TypeScript + Vite

A production-grade React starter with **React Router v7**, **Zustand** (with `persist`), **react-hook-form** + **Yup**, and **Tailwind CSS v4**.

The codebase is organised as **bounded contexts** (`auth`, `dashboard`, `public`) with a small shared layer for UI primitives, hooks, types and config. Layouts are picked dynamically per route group from a single registry.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Project structure

```
src/
├── app/                        # (reserved for cross-cutting app code)
│
├── components/                 # Shared, app-level UI
│   ├── ui/                     # shadcn primitives (button, card, form, input, label)
│   └── common/                 # App primitives (Container, SectionHeader, EmptyState, Brand)
│
├── config/                     # Static config: route paths, app metadata
│
├── features/                   # Bounded contexts (one folder per domain)
│   ├── auth/
│   │   ├── pages/              # Login, Register
│   │   ├── routes/             # AuthGuard, GuestGuard
│   │   ├── schemas/            # Yup schemas
│   │   ├── services/           # authService (login/register requests)
│   │   ├── stores/             # useAuthStore (Zustand)
│   │   └── index.ts            # Public API barrel
│   ├── dashboard/
│   │   ├── components/         # DashboardLayout, Sidebar, Header
│   │   └── pages/              # home, profile, settings
│   └── public/
│       ├── components/         # PublicNavbar, PublicFooter
│       └── pages/              # home, about, contact
│
├── hooks/                      # Cross-feature hooks (useDisclosure, useDocumentTitle)
│
├── layouts/                    # Top-level chrome per route group
│   ├── PublicLayout.tsx
│   ├── AuthLayout.tsx
│   ├── DashboardLayout.tsx
│   ├── RootErrorBoundary.tsx
│   ├── NotFound.tsx
│   └── index.ts                # LAYOUTS registry — add new layouts here
│
├── lib/                        # Generic helpers (cn, etc.)
│
├── routes/
│   └── router.tsx              # createBrowserRouter with route groups & lazy pages
│
├── types/                      # Cross-feature types
│
├── App.tsx                     # Placeholder shell (composition lives in main.tsx)
├── main.tsx                    # createRoot + RouterProvider
└── index.css                   # Tailwind v4 entry, design tokens
```

### How layouts are chosen

`src/layouts/index.ts` exports a `LAYOUTS` map. `src/routes/router.tsx` picks the layout per top-level route via the `withLayout("public" | "auth" | "dashboard")` wrapper. Add a new layout by:

1. Creating `src/layouts/MyLayout.tsx` (a component that renders `<Outlet />`).
2. Registering it in `LAYOUTS`.
3. Using `withLayout("my-layout")` in the router.

### Route groups

| Path                  | Layout    | Guard      |
| --------------------- | --------- | ---------- |
| `/`                   | public    | none       |
| `/about`              | public    | none       |
| `/contact`            | public    | none       |
| `/login`              | auth      | GuestGuard |
| `/register`           | auth      | GuestGuard |
| `/dashboard`          | dashboard | AuthGuard  |
| `/dashboard/profile`  | dashboard | AuthGuard  |
| `/dashboard/settings` | dashboard | AuthGuard  |
| `*`                   | —         | 404        |

All page components are `React.lazy()`-loaded and code-split per route.

### Adding a new feature

1. Create `src/features/<name>/` with `components/`, `pages/`, `routes/`, `stores/` as needed.
2. Export its public API from `src/features/<name>/index.ts` (do **not** re-export pages — import them via direct path so `React.lazy()` can split).
3. Add a layout if needed and register it in `src/layouts/index.ts`.
4. Wire routes in `src/routes/router.tsx` with the appropriate guard.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
