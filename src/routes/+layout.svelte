<script lang="ts">
  import '../app.css';

  let {children} = $props();
</script>

<svelte:head>
    <title>Google OAuth Demo</title>
</svelte:head>

<div class="dark min-h-screen bg-gray-900 text-white">
    {@render children()}
</div>
