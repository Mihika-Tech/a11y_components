# Accessibility First Component Lab + Accessible Task Hub

A production-ready accessibility-first component library plus a small demo app that proves real flows with accessible UI patterns. This repo is built to showcase advanced frontend engineering, clean component architecture, and real testing.

Live sections:
- Component Lab: docs and examples for UI primitives and patterns
- Accessible Task Hub: demo app with realistic product flows

---

## Highlights

- Accessibility-first behavior and documented keyboard interactions
- Strong focus management for overlays
- Dark mode and high contrast mode with design tokens
- Respects prefers-reduced-motion
- Unit tests, e2e tests, and automated accessibility checks
- Deployable via GitHub Actions (GitHub Pages) and Vercel

---

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest + React Testing Library
- Playwright
- axe-core accessibility checks
- ESLint + Prettier

---

## Project Structure

src/
app/ # App Router routes
docs/ # Component docs pages
task-hub/ # Demo app routes
components/
ui/ # Accessible primitives
patterns/ # Composed components (docs shell, toast provider)
lib/
a11y/ # focus trap, stable ids, aria helpers
task-hub/ # demo app utilities (mock storage)
styles/
tokens.css # design tokens
globals.css # global styles
tests/
unit/ # Vitest unit tests
e2e/ # Playwright tests


---

## Local setup

From the repo root:

```bash
npm install
```
Start dev server:
```bash
npm run dev
```
Open:

Home: http://localhost:3000

Docs: http://localhost:3000/docs

Task Hub: http://localhost:3000/task-hub

Scripts

Run lint:
```
npm run lint
```
Run typecheck:
```
npm run typecheck
```
Run unit tests:
```
npm run test:run
```
Run e2e tests:
```
npm run e2e
```
Production build:
```
npm run build
npm run start
```
## Accessibility principles used here
- Keyboard support is mandatory for all interactions
- Visible focus indicators and predictable navigation
- Modal and Drawer trap focus, close on Escape, and restore focus on close
- Popover menus support arrow key navigation and close on Escape
- Toast notifications use aria-live and do not steal focus
- Inputs have labels and errors are wired using aria-describedby
- Respects prefers-reduced-motion
- High contrast mode supported via tokens

## Docs reference:

/docs/accessibility-checklist
