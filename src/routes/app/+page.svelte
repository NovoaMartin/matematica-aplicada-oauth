<script lang="ts">
  import {onMount} from 'svelte';
  import {goto} from '$app/navigation';
  import {authState, isAuthenticated, logout, type User} from '$lib/stores/auth.svelte';
  import {getGoogleDriveFiles} from '$lib/utils';

  let user: User | null = $derived(authState.user);

  let driveFiles: any[] | null = $state(null);
  let isLoadingFiles: boolean = $state(false);
  let fileError: string | null= $state(null);

  onMount(() => {
    if (!isAuthenticated()) {
      goto('/login');
      return;
    }
  });

  async function fetchDriveFiles() {
    if (!user) return;

    isLoadingFiles = true;
    fileError = null;

    try {
      const response = await getGoogleDriveFiles(user.token);
      driveFiles = response.files;
    } catch {
      fileError = 'Failed to fetch Google Drive files';
    } finally {
      isLoadingFiles = false;
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
    {#if user}
        <div class="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-gray-800 rounded-lg shadow-md">
            <div class="flex items-center mb-4 md:mb-0">
                <img
                        src={user.picture}
                        alt="Profile"
                        class="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
                />
                <div>
                    <h1 class="text-2xl font-bold">{user.name}</h1>
                    <p class="text-gray-400">{user.email}</p>
                </div>
            </div>
            <button
                    onclick={logout}
                    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            >
                Logout
            </button>
        </div>

        <!-- Google Drive Files Section -->
        <div class="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Google Drive Files</h2>
                <button
                        onclick={fetchDriveFiles}
                        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 flex items-center"
                        disabled={isLoadingFiles}
                >
                    {#if isLoadingFiles}
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    {:else}
                        Fetch Files
                    {/if}
                </button>
            </div>

            {#if fileError}
                <div class="p-4 mb-4 bg-red-900 bg-opacity-50 text-white rounded">
                    <p>{fileError}</p>
                </div>
            {/if}

            {#if driveFiles && driveFiles.length > 0}
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-700">
                        <thead>
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-700">
                        {#each driveFiles as file}
                            <tr class="hover:bg-gray-700">
                                <td class="px-6 py-4 whitespace-nowrap">{file.name}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{file.mimeType}</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            {:else if driveFiles && driveFiles.length === 0}
                <div class="text-center py-8">
                    <p class="text-gray-400">No files found in your Google Drive</p>
                </div>
            {:else if !isLoadingFiles}
                <div class="text-center py-8">
                    <p class="text-gray-400">Click the "Fetch Files" button to view your Google Drive files</p>
                </div>
            {/if}
        </div>
    {:else}
        <div class="flex justify-center items-center h-64">
            <div class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
    {/if}
</div>