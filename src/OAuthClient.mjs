class OAuthClient {
    constructor({ clientId, clientSecret, redirectUri, authEndpoint, tokenEndpoint }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.authEndpoint = authEndpoint;
        this.tokenEndpoint = tokenEndpoint;
    }

    // Generate the authorization URL
    startAuthFlow() {
        const authUrl = `${this.authEndpoint}?response_type=code&client_id=${encodeURIComponent(this.clientId)}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile")}&access_type=offline`;
        return authUrl;
    }

    // Handle callback and exchange code for tokens
    async handleCallback({ code }) {
        console.log(code);
        try {
            const tokenData = await this.fetchTokens({ code });
            return tokenData;
        } catch (error) {
            console.error('Error in handleCallback:', error.message); //err
            throw new Error(`Error in handleCallback: ${error.message}`);
        }
    }

    // Fetch tokens from the token endpoint
    async fetchTokens({ code }) {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', this.redirectUri);
        formData.append('client_id', this.clientId);
        formData.append('client_secret', this.clientSecret);
        console.log('Authorization Code:', code);
        console.log('Redirect URI:', this.redirectUri);
        console.log('Client ID:', this.clientId);
        console.log('Client Secret:', this.clientSecret);
        console.log('Token Request Body:', formData.toString());
        

        try {
            const response = await fetch(this.tokenEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                // Log the full error response for better insight
                console.error('Error response from token exchange:', data); //err
                throw new Error(`Token exchange failed: ${data.error_description || 'Unknown error'}`);
            }

            return data; // Return the data containing the access token and refresh token
        } catch (error) {
            console.error('Error fetching tokens:', error.message); //err
            throw new Error(`Error fetching tokens: ${error.message}`);
        }
    }

    // Refresh token if expired
    async refreshToken(refreshToken) {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'refresh_token');
        formData.append('refresh_token', refreshToken);
        formData.append('client_id', this.clientId);
        formData.append('client_secret', this.clientSecret);

        try {
            const response = await fetch(this.tokenEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error response from token refresh:', data);
                throw new Error(`Token refresh failed: ${data.error_description || 'Unknown error'}`); //eeer
            }

            return data; // Return the refreshed token data
        } catch (error) {
            console.error('Error refreshing token:', error.message);
            throw new Error(`Error refreshing token: ${error.message}`);
        }
    }
}

export default OAuthClient;
