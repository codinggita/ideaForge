# IdeaForge

IdeaForge is a MERN stack SaaS workspace for startup and team operations. It combines authentication, project planning, task execution, team collaboration, meetings, notifications, Google productivity integrations, reporting, global search, SEO, and deployment-ready configuration in one full-stack product.

This project was built as a Semester 2 full-stack project and is organized so evaluators can quickly verify the required frontend, backend, UI/UX, SEO, storage, and deployment criteria.

## Live Deployment Recommendation

Recommended deployment path: Render Web Service + MongoDB Atlas.

Why Render is the cleanest option for this repo:
- The backend can serve the built Vite frontend from `frontend/dist`.
- The included [render.yaml](/D:/PROJECTS/IdeaForge/render.yaml) builds both apps and starts the Express server.
- `/api/*` and React routes work from the same domain, so CORS and production API URLs stay simple.

Good alternative:
- Frontend on Vercel, backend on Render, database on MongoDB Atlas.
- Use `VITE_API_BASE_URL=https://your-backend.onrender.com/api` in the frontend environment.

## Tech Stack

- Frontend: React 18, Vite, Tailwind CSS, MUI, Redux Toolkit, React Router, React Helmet Async, Formik, Yup, Axios, Framer Motion, Lucide React
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser
- Integrations: Google OAuth, Gmail API, Google Calendar API
- Deployment: Render-ready monorepo setup with production static serving

## Core Features

- Authentication with JWT cookies, email/password login, registration, logout, and Google OAuth.
- Email-based avatar system using Google profile picture when available and generated fallback avatars from account identity.
- Protected dashboard routes and role-aware route guard structure.
- Dashboard overview with live stats, AI-style briefing, recent projects, today's tasks, upcoming meetings, and recent Gmail messages.
- Project management with personal/team projects and status columns: Planning, Active, Completed.
- Task management with personal/team filtering, assignments, due dates, optimistic completion updates, and notifications.
- Team management with owner/admin/member roles, email-based member invitations, role updates, and removal controls.
- Calendar and meetings with Google Calendar event sync plus local meeting creation using a Formik/Yup dynamic attendee form.
- Global search across projects, tasks, and teams with debounced search and session storage.
- Reports dashboard with custom canvas charts and workspace analytics.
- Notification bell with unread state, mark-as-read actions, and preferences UI.
- Settings area with Profile, Security, Notifications, and Billing-readiness tabs.
- Quick Action modal for creating tasks, projects, teams, and meetings from anywhere.
- SEO metadata, Open Graph tags, structured data, sitemap, and robots file.
- Local/session storage for auth profile cache, theme, notification preferences, page tracking, and temporary search state.

## Assignment Checklist Coverage

The project follows the required checklist from:
https://github.com/codinggita/CGxSU_Semester_1/blob/main/assignments/04.sem2_full_stack_60_Marks_Project_01/01.features_checklist.md

### 0. Design Approval

- Figma design was completed before implementation.
- Major screens are represented: landing, login, dashboard, projects, tasks, calendar, teams, reports, settings.
- A consistent visual system is used across colors, typography, spacing, cards, buttons, modals, forms, sidebar, and navigation.

### 1. Project Setup and Structure

- Vite React app is used in `frontend/`.
- Tailwind CSS is configured in [tailwind.config.js](/D:/PROJECTS/IdeaForge/frontend/tailwind.config.js).
- MUI is integrated through [AppThemeProvider.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/theme/AppThemeProvider.jsx).
- Clean structure exists: `components`, `pages`, `hooks`, `services`, `store`, `utils`.
- Reusable components include Modal, QuickActionModal, ProtectedRoute, SEO, ToastHost, forms, cards, team panels, and dashboard widgets.

### 2. Routing System

- React Router is implemented in [App.jsx](/D:/PROJECTS/IdeaForge/frontend/src/App.jsx).
- Public routes: `/`, `/login`.
- Protected routes: `/dashboard`, `/projects`, `/tasks`, `/calendar`, `/teams`, `/reports`, `/settings`.
- Route guard: [ProtectedRoute.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/common/ProtectedRoute.jsx).
- Lazy loading and Suspense are used for route-level code splitting.

### 3. State Management

- Redux Toolkit store is configured in [store/index.js](/D:/PROJECTS/IdeaForge/frontend/src/store/index.js).
- Slices are included for auth, user, and UI state.
- AuthContext remains for existing auth workflow, while Redux mirrors authenticated user and UI state.

### 4. API Integration

- Central Axios service is implemented in [services/api.js](/D:/PROJECTS/IdeaForge/frontend/src/services/api.js).
- Request interceptor adds session context.
- Response interceptor includes a retry fallback for transient failures.
- Loading, error, and empty states are present throughout dashboard, projects, tasks, teams, reports, calendar, and settings.

### 5. Forms and Validation

- Formik and Yup are integrated in [CreateMeetingForm.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/forms/CreateMeetingForm.jsx).
- Dynamic attendee fields make this a complex dynamic form.
- Other CRUD forms include CreateProjectForm, CreateTaskForm, CreateTeamForm, ProfileForm, and SecurityForm.

### 6. UI/UX Design

- Responsive layouts are implemented with Tailwind breakpoints.
- Core components included: navbar/topbar, sidebar, cards, modals, buttons, inputs, forms, and dashboard panels.
- Empty and error states are implemented across major data views.
- Quick Action improves workflow speed by letting users create core records from any dashboard page.

### 7. Theme System

- Light/dark preference is stored in localStorage.
- MUI theme and Tailwind dark class are synchronized through [useTheme.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/useTheme.js).
- Theme toggle is available in the dashboard topbar.

### 8. Performance Optimization

- Route-level lazy loading is implemented.
- Large bundle warning was removed after route splitting.
- Debounced search avoids unnecessary API calls.
- Canvas charts avoid extra chart dependencies.

### 9. SEO Implementation

- React Helmet Async is used through [SEO.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/common/SEO.jsx) and [RouteSEO.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/common/RouteSEO.jsx).
- Dynamic page titles and meta descriptions are configured per route.
- Open Graph and Twitter card tags are included.
- Structured data uses schema.org `SoftwareApplication`.
- Sitemap and robots files are included in `frontend/public/`.

### 10. Accessibility

- Semantic layout elements are used across pages.
- Buttons and links are keyboard-accessible.
- Form labels are present on settings, task, project, team, and meeting forms.
- Modal can be closed with Escape.

### 11. Error Handling

- Error boundary is implemented in [ErrorBoundary.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/common/ErrorBoundary.jsx).
- Backend uses centralized error middleware.
- Frontend views show local error states for failed API calls.

### 12. Custom Hooks

- [useAuth.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/useAuth.js)
- [useDebounce.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/useDebounce.js)
- [useTheme.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/useTheme.js)
- [useSessionStorage.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/useSessionStorage.js)
- [usePageTracking.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/usePageTracking.js)

### 13. Notifications System

- Notification bell fetches backend notifications and unread count.
- Mark single notification as read and mark all as read are implemented.
- Toast feedback is implemented through Redux UI state and [ToastHost.jsx](/D:/PROJECTS/IdeaForge/frontend/src/components/common/ToastHost.jsx).

### 14. Real-Time Ready Structure

- App-wide data refresh events are implemented in [appEvents.js](/D:/PROJECTS/IdeaForge/frontend/src/appEvents.js).
- Notifications currently poll every 30 seconds.
- The structure is ready for Socket.io replacement in the next phase.

### 15. File Upload Feature

- Profile settings include avatar file preview UI.
- Validation supports JPG, PNG, GIF and max 800K preview size.
- Google/email avatar remains the account source of truth.

### 16. Analytics and Tracking

- Page tracking is implemented in [usePageTracking.js](/D:/PROJECTS/IdeaForge/frontend/src/hooks/usePageTracking.js).
- Temporary page view history is stored in sessionStorage.
- Google Analytics can be connected by loading `gtag` and setting `VITE_GA_MEASUREMENT_ID`.

### 17. Storage

- localStorage: user profile cache, theme preference, notification preferences.
- sessionStorage: temporary search state and page tracking history.
- Logout clears user cache and session storage.
- Sensitive JWT is kept in an HTTP-only cookie, not manually stored in localStorage.

### 18. Code Quality

- ESLint script is configured in frontend `package.json`.
- Components are modular and grouped by feature area.
- Naming has been cleaned up, including `RecentEvaluations` renamed to `RecentProjects`.

### 19. Documentation

- This README includes setup, features, folder structure, checklist mapping, deployment, and environment variables.

## Folder Structure

```txt
IdeaForge/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    public/
    src/
      components/
      context/
      hooks/
      pages/
      services/
      store/
      appEvents.js
      calendarEvents.js
```

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas or local MongoDB
- Google Cloud OAuth credentials if testing Google login, Gmail, and Calendar

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Required backend environment variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend environment:

```env
VITE_API_BASE_URL=/api
VITE_GA_MEASUREMENT_ID=
```

Visit:

```txt
http://localhost:5173
```

## Production Deployment on Render

1. Push the repo to GitHub.
2. Create a MongoDB Atlas database.
3. In Render, create a new Blueprint or Web Service from this repository.
4. Use the included [render.yaml](/D:/PROJECTS/IdeaForge/render.yaml), or manually set:

```bash
Build Command: cd backend && npm install && cd ../frontend && npm install && npm run build
Start Command: cd backend && npm start
```

5. Add these Render environment variables:

```env
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_random_secret
FRONTEND_URL=https://your-render-app.onrender.com
CORS_ORIGIN=https://your-render-app.onrender.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-render-app.onrender.com/api/auth/google/callback
```

6. In Google Cloud Console, add the same production callback URL to Authorized redirect URIs.

## API Overview

- `/api/users` - register, login, logout, profile
- `/api/auth/google` - Google OAuth login and callback
- `/api/projects` - project CRUD
- `/api/tasks` - task CRUD
- `/api/teams` - team CRUD and member role management
- `/api/meetings` - local meeting CRUD
- `/api/calendar` - Google Calendar events
- `/api/gmail` - recent Gmail messages
- `/api/reports` - analytics metrics
- `/api/notifications` - notification inbox
- `/api/search` - global search

## Validation

Latest local validation:

```bash
cd frontend
npm run build
```

Build result: passed.

## AI Assistance Disclosure

This project was initially developed with Antigravity assistance and later refined with Codex assistance for final-phase implementation, checklist mapping, SEO, deployment readiness, README writing, and code quality improvements. All generated changes were reviewed and integrated into the project codebase.

## Author

Khush Patel
