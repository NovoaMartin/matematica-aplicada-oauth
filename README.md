# Google OAuth Demo

A demonstration of how to use Google OAuth for authentication and accessing Google Drive files, built with SvelteKit and Tailwind CSS.

## Features

- Google OAuth authentication
- Dark mode UI with Tailwind CSS
- Display user profile information (name, email, profile picture)
- Fetch and display Google Drive files

## Pages

- `/`: Root page that redirects to `/app` if authenticated, otherwise to `/login`
- `/login`: Simple login page with a Google login button
- `/app`: Authenticated page that displays user information and Google Drive files

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## OAuth Configuration

The application uses the Google OAuth 2.0 API for authentication. The OAuth flow is as follows:

1. User clicks the "Sign in with Google" button on the login page
2. User is redirected to Google's authentication page
3. After successful authentication, Google redirects back to the application with an access token
4. The application uses the access token to fetch user information and Google Drive files

The OAuth configuration is stored in the `.env` file:
- `PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

## Building for Production

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
