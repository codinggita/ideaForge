import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js';
import googleAuthRoutes from './routes/googleAuthRoutes.js';
import gmailRoutes from './routes/gmailRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import teamRoutes from './routes/teamRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/auth/google', googleAuthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/gmail', gmailRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/teams', teamRoutes);

// Basic Route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'IdeaForge API is running...' });
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
