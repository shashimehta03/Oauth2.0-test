import React, { useState, useEffect } from 'react';
// import OAuthClient from './OAuthClient.mjs';
import OAuthClient from 'oauthclient-noscrubs';

const oauthClient = new OAuthClient({
    clientId: '***',
    clientSecret: '****',
    redirectUri: 'http://localhost:3000/callback',
    authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
});

const App = () => {
    const [userData, setUserData] = useState(null); // Store user data
    const [loading, setLoading] = useState(false);

    // Function to start the login process
    const login = () => {
        const authUrl = oauthClient.startAuthFlow();
        window.location.href = authUrl; // Redirect to the authorization URL
    };

    // Function to fetch user profile data
    const fetchUserProfile = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const profile = await response.json();
            console.log('User Profile:', profile);
            localStorage.setItem('user_data', JSON.stringify(profile)); // Persist user data
            setUserData(profile); // Set user data to state
        } catch (error) {
            console.error('Error fetching user profile:', error);
            alert('Failed to fetch user profile.');
        }
    };

    // Handle the OAuth callback
    const handleCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
            return;
        }

        try {
            setLoading(true);
            const tokens = await oauthClient.handleCallback({ code });
            console.log('Tokens received:', tokens);

            // Save tokens
            localStorage.setItem('access_token', tokens.access_token);

            // Fetch user profile
            await fetchUserProfile(tokens.access_token);

            // Clean up the URL
            window.history.replaceState({}, document.title, '/');
        } catch (error) {
            console.error('Error handling callback:', error.message);
            alert('Login failed.');
        } finally {
            setLoading(false);
        }
    };

    // Check if the user is already logged in
    useEffect(() => {
        const storedUserData = localStorage.getItem('user_data');
        const accessToken = localStorage.getItem('access_token');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else if (window.location.search.includes('code')) {
            handleCallback();
        }
    }, []);

    return (
        <div>
            <h1>OAuth Login</h1>
            {!userData ? (
                <button onClick={login} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login with Google'}
                </button>
            ) : (
                <div>
                    <h2>Welcome, {userData.name}!</h2>
                    <p>Email: {userData.email}</p>
                    <img
                        src={userData?.picture ?? "https://tse4.mm.bing.net/th?id=OIP.3KwoSMZHsRbutEnp8ChNDAHaHa&pid=Api&P=0&h=180"}
                        alt="Profile"
                        style={{ borderRadius: '50%' }}
                    />                
                </div>
            )}
        </div>
    );
};

export default App;
