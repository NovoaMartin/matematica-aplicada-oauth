<script lang="ts">
  import {onMount} from 'svelte';
  import {goto} from '$app/navigation';
  import {getRedirectUrl} from '$lib/utils';
  import {isAuthenticated} from "$lib/stores/auth.svelte";

  onMount(() => {
    if (isAuthenticated()) {
      goto('/app');
    }
  });

  // Handle login with Google
  function loginWithGoogle() {
    window.location.href = getRedirectUrl();
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        <div class="text-center">
            <h1 class="text-3xl font-extrabold tracking-tight">Google OAuth Demo</h1>
            <p class="mt-2 text-gray-400">Sign in with your Google account to continue</p>
        </div>

        <div class="mt-8">
            <button
                    on:click={loginWithGoogle}
                    class="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                          fill="currentColor"/>
                </svg>
                Sign in with Google
            </button>
        </div>
    </div>
</div>