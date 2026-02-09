# Accessibility First Component Lab + Demo App

A production-ready component lab and a small demo app that proves real flows with accessible UI patterns.

This repo is built to showcase:
- Accessibility-first component behavior
- Clean component architecture and design tokens
- Real testing (unit, e2e, and a11y checks)
- Deployable workflows (GitHub Actions + static export)

No em dashes are used in UI text content.

---

## What is included

### Component Library
Located in `src/components/ui` and `src/components/patterns`.

Current components:
- Button
- Link and skip link patterns
- TextInput
- Modal dialog
- Drawer sheet
- Tabs
- Toast notifications
- Popover menu
- Skeleton loading
- DataTable
- Combobox

Each component has a docs page under `/docs` that includes:
- Examples
- Keyboard interactions
- ARIA notes
- Common pitfalls

### Demo app: Accessible Task Hub
Routes under `/task-hub` use the components in realistic flows:
- Login (mock auth)
- Dashboard with search, filters, and actions menu
- Create task form with validation
- Task details with status controls and tabs
- Settings for theme and contrast preferences

---

## Tech stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest + React Testing Library
- Playwright
- axe-core checks for key pages
- ESLint + Prettier

---

## Project structure

src/
app/ # App Router routes
docs/ # Component docs pages
task-hub/ # Demo app
components/
ui/ # Accessible primitives
patterns/ # Composed components (docs shell, toast provider)
lib/
a11y/ # focus trap, id helpers
task-hub/ # mock storage and demo app utilities
styles/
tokens.css # design tokens
globals.css # global styles
tests/
unit/ # Vitest unit tests
e2e/ # Playwright tests


---

## Local setup

### 1) Install

npm install

### 2) Run dev server

npm run dev

### Open:

Home: http://localhost:3000

Docs: http://localhost:3000/docs

Task Hub: http://localhost:3000/task-hub

## Scripts
### Lint
npm run lint

### Typecheck
npm run typecheck

### Unit tests
npm run test:run

### E2E tests
npm run e2e

### Production build
npm run build
npm run start

## Accessibility principles used here

- Keyboard support is mandatory for all interactions
- Visible focus states and predictable navigation
- Overlays trap focus, close on Escape, and restore focus to the trigger
- Toasts use aria-live and do not steal focus
- Components respect prefers-reduced-motion
- High contrast mode supported through tokens

## Docs reference:

- /docs/accessibility-checklist
