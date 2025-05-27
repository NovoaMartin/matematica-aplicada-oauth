import {PUBLIC_GOOGLE_CLIENT_ID as GOOGLE_CLIENT_ID} from "$env/static/public";

/**
 * Generates the Google OAuth 2 URL for authentication.
 */
export function getRedirectUrl() {
  const scopes = [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/drive.readonly'
  ];
  const redirectUrl = `http://localhost:5174/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUrl,
    response_type: 'token',
    scope: scopes.join(' '),
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Fetches user data from Google using the provided access token.
 */
export async function getGoogleUserData(token: string) {
  const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {Authorization: `Bearer ${token}`}
  });
  return await userInfo.json();
}

/**
 * Gets the latest files from Google Drive using the provided access token.
 */
export async function getGoogleDriveFiles(token: string) {
  const response = await fetch('https://www.googleapis.com/drive/v3/files', {
    headers: {Authorization: `Bearer ${token}`}
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch files: ${response.statusText}`);
  }

  return await response.json();
}