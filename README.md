# Oauth2.0-test for browswer in react
This project demonstrates how to implement OAuth 2.0 login functionality in a React application using a custom `OAuthClient` class. The app enables users to authenticate via their Google account, fetches their profile data, and displays it.

---

## Features

- **Login with Google OAuth 2.0**: Users can log in securely via their Google accounts.
- **User Profile Display**: Fetches and displays user details like name, email, and profile picture.
- **Token Management**: Manages access and refresh tokens with proper error handling.
- **Fallback Profile Image**: Displays a default profile picture if the user has none.

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




