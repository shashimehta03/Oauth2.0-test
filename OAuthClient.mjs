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
        return this.fetchTokens({ code });
    }

    // Fetch tokens from the token endpoint
    async fetchTokens({ code }) {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', this.redirectUri);
        formData.append('client_id', this.clientId);
        formData.append('client_secret', this.clientSecret);

        const response = await fetch(this.tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Token exchange failed');
        }

        const data = await response.json();
        return data;
    }

    // Refresh token if expired
    async refreshToken(refreshToken) {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'refresh_token');
        formData.append('refresh_token', refreshToken);
        formData.append('client_id', this.clientId);
        formData.append('client_secret', this.clientSecret);

        const response = await fetch(this.tokenEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        return data;
    }
}

export default OAuthClient;
