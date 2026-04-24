# IdeaForge (MERN Stack)

## 📌 Context
This repository contains the full **IdeaForge** project, structured as a clean **MERN Stack** (MongoDB, Express, React, Node.js) monorepo. The codebase is split into two top-level directories — `frontend/` and `backend/` — to enforce strict separation of concerns between the client-side SPA and the server-side API layer.

This Pull Request represents **Phase 1** of our development, establishing the complete `Landing Page` and `Login` UI flows on the frontend, utilizing a centralized data structure (`utils.js`) and UI timeout mockups to simulate backend behavior until the Node/Express server is wired up.

## 🏗️ Architecture & Philosophy

The primary objective of this architecture is velocity and clean decoupling. The monorepo structure ensures both the React client and the Express API are developed side by side, while remaining independently deployable.

- **Core Framework**: React 18 
- **Bundler**: Vite (Lightning fast HMR & production builds)
- **Styling Architecture**: Tailwind CSS (PostCSS)
- **Routing Layer**: `react-router-dom` v6
- **Animations**: `framer-motion` (Motion/React physics)
- **Types**: Vanilla JS / `.jsx`. We've strictly kept the stack lean with lightweight standard JavaScript components.

### 🛑 Routing Rules (For Senior Developers)
**CRITICAL:** Under no circumstances should native HTML anchor tags (`<a href="...">`) be used for internal app navigation. Our application relies entirely on client-side routing to maintain state and provide a seamless, SPA experience.
- Always use `react-router-dom`'s `<Link to="...">` component for declarative navigation.
- Use the `useNavigate()` hook for programmatic navigation (e.g., after form submissions).
- This ensures we avoid full page reloads and maintain the lightning-fast performance of Vite.

## 📂 Project Structure Overview

```text
ideaForge/
├── frontend/                     // React + Vite SPA Client
│   ├── src/
│   │   ├── components/                   // Domain-specific UI blocks
│   │   │   ├── auth/                     // Login & Signup components
│   │   │   │   ├── AuthLayout.jsx
│   │   │   │   ├── EmailForm.jsx
│   │   │   │   ├── GoogleAuthButton.jsx
│   │   │   │   ├── ModeToggle.jsx
│   │   │   │   └── SwapForm.jsx
│   │   │   ├── dashboard/                // Dashboard widgets & layout
│   │   │   │   ├── AIBriefing.jsx
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Greeting.jsx
│   │   │   │   ├── MobileNav.jsx
│   │   │   │   ├── RecentEmails.jsx
│   │   │   │   ├── RecentEvaluations.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── StatsOverview.jsx
│   │   │   │   ├── TodaysTasks.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   └── UpcomingMeetings.jsx
│   │   │   ├── landing/                  // Landing page components
│   │   │   │   ├── CoreFlow.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── ModulesSection.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── PricingSection.jsx
│   │   │   │   ├── SuiteGrid.jsx
│   │   │   │   └── Testimonials.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx             // Parent orchestrator for Dashboard components
│   │   │   ├── Landing.jsx               // Parent orchestrator for Landing components
│   │   │   └── Login.jsx                 // Parent orchestrator for Auth SwapForm
│   │   ├── utils.js                      // Centralized static data / content configs
│   │   ├── App.jsx                       // React Router configuration
│   │   ├── main.jsx                      // DOM root injection
│   │   └── index.css                     // Global Tailwind entry
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                      // Node.js + Express API (Phase 2)
│   └── .gitkeep                          // Placeholder — scaffolding coming soon
│
├── README.md                     // This file
└── .gitignore
```

### 🧠 The `utils.js` Philosophy (Content Management)
To prevent our view components (`Landing.jsx`, `PricingSection.jsx`, etc.) from becoming bloated with static marketing copy, pricing stats, and feature lists, **all static data has been extracted into `utils.js`**. 
- Our components are highly focused on React rendering, UI hooks, and view logic.
- `utils.js` acts as our pseudo-CMS. If marketing needs a verbiage change, we update the object arrays in this file safely without risking component breakage.

## 🔭 Notes for the Reviewer

When reviewing this PR, please pay attention to the following architectural milestones:

1. **Monorepo Structure**: The project is split into `frontend/` and `backend/` directories. All frontend dependencies, configs, and source code live exclusively inside `frontend/`. The `backend/` directory is reserved for the upcoming Express API layer.
2. **Clean JSX Environment**: Verify the clean layout of standard React `.jsx` syntax and modern hooks.
3. **Design Fidelity**: Examine `Landing.jsx`. The design specifications (glassmorphism boundaries, blur, shadows) have been built purely through Tailwind utility classes.
4. **Data Injection Model**: Observe how `kpiMetrics`, `productSuiteFeatures`, and `testimonialsData` are seamlessly imported and dynamically mapped from `utils.js`. This is the exact pattern we will use when mapping API payloads from our Express backend later.
5. **Mocked Authentication (No JWT Yet)**: The `Login` component features a fully built visual UI with timers wrapping the button states (`SwapForm.jsx`). No JWT or true auth is active yet. We will hook a Node/Express backend to this visual shell in a future iteration.

## 🚀 Setup & Local Execution

Since all frontend code now lives inside `frontend/`, run these commands from that directory:

```bash
# 1. Navigate to the frontend
cd frontend

# 2. Install fresh dependencies
npm install

# 3. Launch local dev server (HMR enabled)
npm run dev

# 4. Simulate production bundles
npm run build
```

The application mounts entirely on client-side and can be run instantly at `http://localhost:5173/`.
