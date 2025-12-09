const { google } = require('googleapis');
const credentials = require('../credentials.json');

const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/oauth2callback';
const RECIPIENT_EMAIL = 'info@zakskitchenau.com'; // Restaurant email to receive reservations

module.exports = async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Parse reservation data from state
    const reservationData = state ? JSON.parse(decodeURIComponent(state)) : null;

    if (reservationData) {
      // Send email
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      
      const emailContent = generateEmailContent(reservationData);
      const message = createMessage(
        reservationData.email,
        RECIPIENT_EMAIL,
        `New Reservation from ${reservationData.name}`,
        emailContent
      );

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: message
      });

      // Redirect back to success page
      res.send(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #000;
                color: #ffa800;
              }
              .message {
                text-align: center;
                padding: 40px;
                background: rgba(255, 168, 0, 0.1);
                border: 2px solid #ffa800;
                border-radius: 10px;
              }
              h1 { margin-bottom: 20px; }
              p { font-size: 18px; }
            </style>
          </head>
          <body>
            <div class="message">
              <h1>✅ Reservation Sent!</h1>
              <p>We have received your booking.</p>
              <p>Redirecting you back...</p>
            </div>
            <script>
              setTimeout(() => {
                window.location.href = '/';
              }, 3000);
            </script>
          </body>
        </html>
      `);
    } else {
      res.status(400).json({ error: 'No reservation data provided' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process OAuth callback', details: error.message });
  }
};

function generateEmailContent(data) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table width="100%" cellspacing="0" cellpadding="10" style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #ffa800; color: white; text-align: center; font-size: 24px; padding: 15px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              🍽️ New Reservation - Zak's Kitchen
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 16px; color: #333;">
              <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Reservation Details</p>
              <table width="100%" cellspacing="0" cellpadding="12" style="border-collapse: collapse; text-align: left;">
                <tr>
                  <th style="background-color: #ffa800; color: white; padding: 12px; border: 1px solid #ddd; width: 40%;">Field</th>
                  <th style="background-color: #ffa800; color: white; padding: 12px; border: 1px solid #ddd;">Details</th>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">👤 Name</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">${data.name}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">📧 Email</td>
                  <td style="border: 1px solid #ddd; padding: 12px;"><a href="mailto:${data.email}">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">📱 Phone</td>
                  <td style="border: 1px solid #ddd; padding: 12px;"><a href="tel:${data.phone}">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">📅 Date</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">${data.date}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">🕐 Time</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">${data.time}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold;">👥 Guests</td>
                  <td style="border: 1px solid #ddd; padding: 12px;">${data.guests}</td>
                </tr>
              </table>
              <p style="margin-top: 25px; font-size: 14px; color: #555; font-style: italic;">
                Please confirm this reservation with the customer.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffa800; color: white; text-align: center; padding: 15px; font-size: 14px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              &copy; 2025 Zak's Kitchen. All Rights Reserved.
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function createMessage(from, to, subject, htmlContent) {
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlContent
  ].join('\n');

  return {
    raw: Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  };
}
