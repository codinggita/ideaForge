# IdeaForge 🚀

IdeaForge is a full-featured SaaS platform designed for operational planning, task execution, and team synchronization. It provides a beautiful, dynamic dashboard with real-time analytics, comprehensive project/task management, and seamless Google Calendar integration.

## ✨ Features

- **Dynamic Analytics Dashboard:** Live tracking of project health, task completion rates, and an AI-driven briefing banner.
- **Project Management:** Kanban-style columns to track projects through Planning, Active, and Completed phases.
- **Task Execution:** A fast, responsive task list with optimistic UI updates and completion toggles.
- **Google Calendar Integration:** A fully functional, mathematically accurate monthly calendar view that fetches your live schedule directly from Google. Includes an agenda panel and an upcoming meetings scroller with instant "Join Meeting" links.
- **Team Management:** Create teams, invite colleagues by email, assign roles (Owner, Admin, Member), and manage team membership with a sleek slide-out detail panel.
- **Secure Authentication:** JWT-based session management alongside seamless 1-click Google OAuth login.
- **Profile Management:** Update your display name and job title instantly across the entire application.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS (for modern UI utility styling), Axios, Lucide React (for iconography).
- **Backend:** Node.js, Express.js, MongoDB (Mongoose ORM).
- **Integrations:** Google APIs (`googleapis` package) for OAuth2 and Google Calendar data.
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Google Cloud Console project with OAuth 2.0 Credentials (for Calendar & Login)

### 1. Clone the repository
```bash
git clone https://github.com/KHUSHPATEL143/ideaForge.git
cd ideaForge
```

### 2. Environment Setup
Create a `.env` file in the `backend/` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Run the Application
You can run both the frontend and backend concurrently.
```bash
# In the backend directory
npm run dev

# In the frontend directory
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📁 Project Structure

IdeaForge is built with a clean, component-based architecture:
- `frontend/src/components/dashboard/`: Core layout wrappers and navigation.
- `frontend/src/components/calendar/`: Dynamic grid logic and agenda panels.
- `frontend/src/components/projects/`: Project columns and draggable cards.
- `frontend/src/components/tasks/`: Task lists, toolbars, and completion toggles.
- `frontend/src/components/settings/`: Profile configuration forms.
- `backend/controllers/`: Business logic for aggregating stats and handling API requests.
- `backend/routes/`: Express router definitions.

---
*Developed by Khush Patel*
