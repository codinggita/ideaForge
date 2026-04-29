import asyncHandler from 'express-async-handler';
import { google } from 'googleapis';
import User from '../models/userModel.js';

// @desc    Get recent emails from Gmail API
// @route   GET /api/gmail/recent
// @access  Private
const getRecentEmails = asyncHandler(async (req, res) => {
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

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5,
      labelIds: ['INBOX'],
    });

    const messages = response.data.messages || [];
    
    if (messages.length === 0) {
      return res.json([]);
    }

    const emailDetailsPromises = messages.map(async (msg) => {
      const msgData = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'Date'],
      });

      const headers = msgData.data.payload.headers;
      const subject = headers.find(header => header.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(header => header.name === 'From')?.value || 'Unknown Sender';
      const date = headers.find(header => header.name === 'Date')?.value;

      // Extract name and email from "From" string
      // Format usually: "Name <email@domain.com>" or just "email@domain.com"
      let senderName = from;
      let senderEmail = from;
      const match = from.match(/(.*)<(.*)>/);
      if (match) {
        senderName = match[1].replace(/"/g, '').trim() || match[2];
        senderEmail = match[2];
      }

      return {
        _id: msgData.data.id, // Use gmail ID as _id for React key
        subject,
        snippet: msgData.data.snippet,
        senderName,
        senderEmail,
        isRead: !msgData.data.labelIds.includes('UNREAD'),
        receivedAt: date ? new Date(date) : new Date(),
      };
    });

    const recentEmails = await Promise.all(emailDetailsPromises);
    res.json(recentEmails);
  } catch (error) {
    console.error('Gmail API Error:', error);
    
    // Check if token is invalid/expired
    if (error.code === 401) {
       res.status(401);
       throw new Error('Google authentication expired. Please sign in again.');
    }
    
    res.status(500);
    throw new Error('Failed to fetch emails from Google');
  }
});

export { getRecentEmails };
