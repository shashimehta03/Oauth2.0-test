// src/App.js
import React, { useEffect, useState } from 'react';

const App = () => {
    const [authUrl, setAuthUrl] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    // Google OAuth details
    const clientId = '283444730904-83mepg5ovg7cb5pufn47aes9uc8dmtrp.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/callback';
    const authEndpoint = 'https://accounts.google.com/o/oauth2/auth';

    useEffect(() => {
        const url = `${authEndpoint}?response_type=code&client_id=${encodeURIComponent(
            clientId
        )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(
            'https://www.googleapis.com/auth/userinfo.profile'
        )}&access_type=offline`;
        setAuthUrl(url);
    }, []);

    const handleLogin = () => {
        window.location.href = authUrl; // Redirect to Google OAuth
    };

    const handleCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            try {
                // Exchange code for tokens via the server
                const tokenResponse = await fetch('http://localhost:5000/auth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });

                const tokenData = await tokenResponse.json();
                const { access_token } = tokenData;

                // Fetch user info
                const userResponse = await fetch(
                    `http://localhost:5000/auth/userinfo?accessToken=${access_token}`
                );

                const userData = await userResponse.json();
                setUserInfo(userData);
            } catch (error) {
                console.error('OAuth callback failed:', error);
            }
        }
    };

    useEffect(() => {
        if (window.location.search.includes('code=')) {
            handleCallback(); // Handle callback when redirected with code
        }
    }, []);

    return (
        <div>
            <h1>Google OAuth 2.0 Demo</h1>
            {userInfo ? (
                <div>
                    <h2>Welcome, {userInfo.name}</h2>
                    <img src={userInfo.picture} alt="Profile" />
                    <p>Email: {userInfo.email}</p>
                </div>
            ) : (
                <button onClick={handleLogin}>Login with Google</button>
            )}
        </div>
    );
};

export default App;
