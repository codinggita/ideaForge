import asyncHandler from 'express-async-handler';
import { google } from 'googleapis';
import User from '../models/userModel.js';

// @desc    Get upcoming events from Google Calendar
// @route   GET /api/calendar/upcoming
// @access  Private
const getUpcomingEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user || !user.googleAccessToken) {
    res.status(401);
    throw new Error('Not connected to Google. Please sign in with Google.');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    if (events.length === 0) {
      return res.json([]);
    }

    const formattedEvents = events.map((event) => {
      // Find video conferencing links if available
      let meetingLink = event.hangoutLink || null;
      if (!meetingLink && event.location && event.location.includes('http')) {
        // Simple heuristic to extract link from location if it's Zoom/Teams etc.
        meetingLink = event.location;
      }

      return {
        _id: event.id,
        title: event.summary || 'Untitled Event',
        description: event.description || '',
        startTime: event.start.dateTime || event.start.date,
        endTime: event.end.dateTime || event.end.date,
        meetingLink,
        status: event.status,
      };
    });

    res.json(formattedEvents);
  } catch (error) {
    console.error('Google Calendar API Error:', error);
    
    if (error.code === 401) {
       res.status(401);
       throw new Error('Google authentication expired. Please sign in again.');
    }
    
    res.status(500);
    throw new Error('Failed to fetch events from Google Calendar');
  }
});

export { getUpcomingEvents };
