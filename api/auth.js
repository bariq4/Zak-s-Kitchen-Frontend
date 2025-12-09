const { google } = require('googleapis');
const credentials = require('../credentials.json');

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/oauth2callback';

module.exports = async (req, res) => {
  const { state } = req.query;

  const oauth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    REDIRECT_URI
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state: state || ''
  });

  res.redirect(authUrl);
};
