# UserManagement Documentation

## Overview

UserManagement is a CRUD-based user listing application with login functionality, built using Next.js and following the Atomic Design methodology. It includes user authentication, user management (create, update, delete), theme switching (light/dark), and integration with a mock API.

---

## Technologies Used

- Next.js 15 (with Turbopack)
- React 19
- TypeScript
- Redux Toolkit and React Redux
- React Hook Form with Zod for schema validation
- Material UI (MUI) and styled-components for styling
- Framer Motion for animations
- React Query (TanStack Query)
- Axios for API requests
- Cypress, Playwright, and Vitest for testing

---

## Project Structure

```
src/
├── components/
│   ├── atoms/             # Basic UI elements
│   ├── molecules/         # Combinations of atoms
│   ├── organisms/         # Complex UI components
│   └── templates/         # Page-level layouts
├── context/               # Theme context provider
├── features/              # Redux slices, services, and types
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries (if any)
├── pages/                 # Next.js pages and API routes
├── store/                 # Redux store configuration
├── styles/                # Global CSS styles
├── theme/                 # Theme definitions (light/dark)
```

---

## Authentication

- Login and registration are available at `/login`
- Tokens are persisted in localStorage
- Redux manages the authentication state and session persistence

---

## User Management Features

- User listing interface
- User creation form
- User editing and deletion
- Form validation using Zod integrated with React Hook Form
- Real-time updates on the user list

---

## Theme System

- Toggle between Light and Dark modes
- Managed via ThemeContext
- Defined in `lightTheme.ts` and `darkTheme.ts` files

---

## Testing

- Cypress for end-to-end tests (located in `cypress/e2e`)
- Vitest for unit and integration testing
- Playwright for browser automation testing

Example test commands:

```bash
npx cypress open       # Launches Cypress UI
dev vitest             # Runs Vitest tests
npx playwright test    # Executes Playwright tests
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- Docker (optional)

### Local Development

```bash
npm install
npm run dev
```

Application will be available at: http://localhost:3000

### Docker

```bash
docker build -t usermanagement .
docker run -p 3000:3000 usermanagement
```

---

## Environment Variables

Create a `.env.local` file at the root with the following content:

```
NEXT_PUBLIC_API_URL=https://reqres.in/api
```

---

## Configuration Highlights

- Alias `@/*` maps to `src/*` in `tsconfig.json`
- Custom build settings in `next.config.ts`
- ESLint configuration in `eslint.config.mjs`
- Dockerfile provided for containerization

---

## Commit Standards and CI/CD

- Follows Conventional Commits (e.g., `feat:`, `fix:`)
- Ready for integration with continuous integration/continuous deployment pipelines

---

## Scripts

```json
"dev": "next dev --turbopack",
"build": "next build",
"start": "next start",
"lint": "next lint"
```

---

## Future Improvements

- Role-based access control (RBAC)
- Pagination in user listings
- Forgot password and password reset flows
- Enhanced test coverage and edge case handling

---

## Author

Gabriel Santos

---

## License

MIT License (consider adding a LICENSE file if not yet included)
