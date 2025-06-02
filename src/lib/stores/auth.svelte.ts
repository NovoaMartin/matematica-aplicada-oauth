import {getGoogleUserData} from '$lib/utils';
import {goto} from "$app/navigation";
import {page} from "$app/state";

export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
};
const initialValue: User | null = JSON.parse(localStorage.getItem('auth') || "null");

export const authState: {user: User | null} = $state({
  user: initialValue
});

export function logout() {
  localStorage.removeItem('auth');
  authState.user = null;
  return goto('/login');
}

export function isAuthenticated() {
  return authState.user !== null ;
}

export async function initFromHash() {
  const params = new URLSearchParams(page.url.hash.substring(1))
  const token = params.get('access_token');

  if(!token) {
    return false;
  }

  const userData: User = await getGoogleUserData(token);
  const newUser: User = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    picture: userData.picture,
    token
  };

  localStorage.setItem('auth', JSON.stringify(newUser));
  authState.user = newUser

  history.replaceState(null, '', window.location.pathname);

  return true;
}