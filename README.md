# Oauth2.0-test for browser in react

A lightweight JavaScript library for handling OAuth 2.0 authentication flows. This package simplifies the OAuth process, providing methods to generate authorization URLs, exchange authorization codes for access tokens, and refresh expired tokens.

## Features

- Generate OAuth 2.0 authorization URLs for authentication.
- Handle callback and exchange authorization code for tokens.
- Refresh expired access tokens using a refresh token.
- Easy integration with OAuth 2.0 endpoints.

---

## Prerequisites

Before running the project, ensure you have the following:

1. **Google API Credentials**:
   - Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the **Google+ API** or **Google People API**.
   - Create OAuth 2.0 credentials and obtain:
     - `Client ID`
     - `Client Secret`
   - Set the redirect URI to `http://localhost:3000/callback`.

2. **Node.js and npm/yarn**:
   - Download and install [Node.js](https://nodejs.org/) (LTS version recommended).

3. **Dependencies**:
   - Install required dependencies as mentioned below.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shashimehta03/Oauth2.0-test.git
```
```bash
cd Oauth2.0-test
```


##### Configure OAuthClient:
Update the OAuthClient configuration in the App.js file with your Google API credentials:
```bash
const oauthClient = new OAuthClient({
    clientId: '<YOUR_CLIENT_ID>',
    clientSecret: '<YOUR_CLIENT_SECRET>',
    redirectUri: 'http://localhost:3000/callback',
    authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
});

```
#### Install Dependencies
```bash
npm install
```
```bash
npm i oauthclient-noscrubs
```
#### Start the Development Server
```
npm start
```
The app will be served at http://localhost:3000.




