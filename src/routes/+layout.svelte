<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ui/theme-toggle.svelte';
</script>

<svelte:head>
	<script>
		// Immediately invoked function to avoid global scope pollution
		(function () {
			try {
				const theme = localStorage.getItem('theme') || 'system';
				if (
					theme === 'dark' ||
					(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
				) {
					document.documentElement.classList.add('dark');
				}
			} catch (e) {
				// Handle cases where localStorage is not available
				console.error('Error setting theme:', e);
			}
		})();
	</script>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Poppins:wght@400;500&family=Roboto:wght@500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<header class="container mx-auto flex items-center justify-between px-4 py-6">
		<div>
			<h1 class="font-heading text-4xl text-primary">Murmurations</h1>
			<p class="font-body text-xl">Offers & Wants Service</p>
		</div>
		<ThemeToggle />
	</header>

	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>
</div>
