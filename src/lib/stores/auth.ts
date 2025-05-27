import {writable} from 'svelte/store';
import {browser} from '$app/environment';
import {getGoogleUserData} from '$lib/utils';
import {goto} from "$app/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
};

const createAuthStore = () => {
  const initialValue = browser
    ? JSON.parse(localStorage.getItem('auth') || 'null')
    : null;

  const {subscribe, set} = writable<User | null>(initialValue);

  return {
    subscribe,
    logout: () => {
      if (browser) {
        localStorage.removeItem('auth');
      }

      set(null);
      return goto('/login')
    },
    isAuthenticated: () => {
      if (browser) {
        return localStorage.getItem('auth') !== null;
      }
      return false;
    },
    initFromHash: async () => {
      if (browser && window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get('access_token');

        if (token) {
          try {
            const userData = await getGoogleUserData(token);
            const user: User = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              picture: userData.picture,
              token
            };

            localStorage.setItem('auth', JSON.stringify(user));
            set(user);

            history.replaceState(null, '', window.location.pathname);

            return true;
          } catch (error) {
            console.error('Failed to get user data:', error);
          }
        }
      }

      return false;
    }
  };
};

export const auth = createAuthStore();