// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import OAuthClient from '../OAuthClient.mjs'; // Import the OAuthClient class
 //import OAuthClient from 'oauthclient-noscrubs'; //package
import OAuthClient from '../src/OAuthClient.mjs'; //src

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for local development

// Google OAuth details
const oauthClient = new OAuthClient({
    // clientId: '283444730904-83mepg5ovg7cb5pufn47aes9uc8dmtrp.apps.googleusercontent.com', //uncomment
    // clientSecret: '', // code:-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
    redirectUri: 'http://localhost:3000/callback',
    authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
});
// Route to exchange authorization code for tokens
app.post('/auth/token', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required' });
    }

    try {
        const tokenData = await oauthClient.handleCallback({ code });
        res.json(tokenData);
    } catch (error) {
        console.error('Error exchanging tokens:', error);
        res.status(500).json({ error: 'Token exchange failed' });
    }
});

// Route to fetch user information
app.get('/auth/userinfo', async (req, res) => {
    const { accessToken } = req.query;

    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    try {
        const userInfoEndpoint = 'https://www.googleapis.com/oauth2/v1/userinfo';
        const response = await fetch(userInfoEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        res.json(userInfo);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
