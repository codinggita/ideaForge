import asyncHandler from 'express-async-handler';
import { google } from 'googleapis';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const getOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
  );
};

const getFrontendUrl = () => process.env.FRONTEND_URL || 'http://localhost:5173';
const getGoogleCallbackUrl = () =>
  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';
const maskClientId = (clientId = '') =>
  clientId ? `${clientId.slice(0, 10)}...${clientId.slice(-12)}` : 'missing';

// @desc    Redirect to Google OAuth consent screen
// @route   GET /api/auth/google
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
  const oauth2Client = getOAuth2Client();
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Get refresh token
    scope: scopes,
    include_granted_scopes: true,
    prompt: 'consent', // Force consent screen to always get refresh token
  });

  res.redirect(authorizationUrl);
});

// @desc    Show safe Google OAuth configuration for deployment debugging
// @route   GET /api/auth/google/debug
// @access  Public
const googleDebug = asyncHandler(async (req, res) => {
  res.json({
    googleCallbackUrl: getGoogleCallbackUrl(),
    frontendUrl: getFrontendUrl(),
    googleClientId: maskClientId(process.env.GOOGLE_CLIENT_ID),
  });
});

// @desc    Handle Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code is missing.');
  }

  const oauth2Client = getOAuth2Client();

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const userInfo = await oauth2.userinfo.get();
    const { id: googleId, email, name, picture } = userInfo.data;

    let user = await User.findOne({ email });

    if (user) {
      // Update existing user with Google tokens
      user.googleId = googleId;
      user.googleAccessToken = tokens.access_token;
      if (tokens.refresh_token) {
        user.googleRefreshToken = tokens.refresh_token;
      }
      if (!user.name) user.name = name;
      if (picture) user.avatarUrl = picture;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        avatarUrl: picture,
      });
    }

    // Generate our internal JWT for session management
    generateToken(res, user._id);

    // Redirect back to frontend dashboard
    res.redirect(`${getFrontendUrl()}/dashboard`);
  } catch (error) {
    console.error('Error in Google OAuth callback:', error);
    res.redirect(`${getFrontendUrl()}/login?error=google_auth_failed`);
  }
});

export { googleAuth, googleCallback, googleDebug };
