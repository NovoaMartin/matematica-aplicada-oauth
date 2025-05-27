<script lang="ts">
  import {onMount} from 'svelte';
  import {goto} from '$app/navigation';
  import {auth} from '$lib/stores/auth';

  onMount(async () => {
    const initialized = await auth.initFromHash();

    if (initialized) {
      await goto('/app');
    } else {
      await goto('/login');
    }
  });
</script>

<div class="flex justify-center items-center h-screen">
    <div class="text-center">
        <h1 class="text-2xl font-bold mb-4">Processing authentication...</h1>
        <div class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
    </div>
</div>