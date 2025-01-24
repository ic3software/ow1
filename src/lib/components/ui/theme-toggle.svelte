<script lang="ts">
	import { Sun, Moon, Laptop } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { browser } from '$app/environment';
	import DropdownMenu from './dropdown-menu/dropdown-menu.svelte';

	type Theme = 'light' | 'dark' | 'system';

	let theme = $state<Theme>(
		browser ? (localStorage.getItem('theme') as Theme) || 'system' : 'system'
	);

	$effect(() => {
		if (!browser) return;

		localStorage.setItem('theme', theme);

		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		} else {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			document.documentElement.classList.add(systemTheme);
			document.documentElement.classList.remove(systemTheme === 'dark' ? 'light' : 'dark');
		}
	});

	const themeIcons = {
		light: Sun,
		dark: Moon,
		system: Laptop
	} as const;
</script>

<!-- Show buttons on larger screens -->
<div class="hidden gap-2 sm:flex">
	<Button
		variant="ghost"
		size="icon"
		class={cn('h-9 w-9', theme === 'light' && 'bg-secondary/10')}
		on:click={() => (theme = 'light')}
	>
		<Sun class="h-4 w-4" />
		<span class="sr-only">Light mode</span>
	</Button>

	<Button
		variant="ghost"
		size="icon"
		class={cn('h-9 w-9', theme === 'dark' && 'bg-secondary/10')}
		on:click={() => (theme = 'dark')}
	>
		<Moon class="h-4 w-4" />
		<span class="sr-only">Dark mode</span>
	</Button>

	<Button
		variant="ghost"
		size="icon"
		class={cn('h-9 w-9', theme === 'system' && 'bg-secondary/10')}
		on:click={() => (theme = 'system')}
	>
		<Laptop class="h-4 w-4" />
		<span class="sr-only">System theme</span>
	</Button>
</div>

<!-- Show dropdown on smaller screens -->
<div class="sm:hidden">
	<DropdownMenu>
		<div slot="trigger">
			<Button variant="ghost" size="sm" class="h-9 w-9 p-0">
				{@const Icon = themeIcons[theme]}
				<Icon class="h-4 w-4" />
				<span class="sr-only capitalize">{theme}</span>
			</Button>
		</div>

		<button
			class={cn(
				'flex h-8 w-8 items-center justify-center rounded-sm hover:bg-accent hover:text-accent-foreground',
				theme === 'light' && 'bg-secondary/10'
			)}
			onclick={() => (theme = 'light')}
		>
			<Sun class="h-3.5 w-3.5" />
			<span class="sr-only">Light</span>
		</button>

		<button
			class={cn(
				'flex h-8 w-8 items-center justify-center rounded-sm hover:bg-accent hover:text-accent-foreground',
				theme === 'dark' && 'bg-secondary/10'
			)}
			onclick={() => (theme = 'dark')}
		>
			<Moon class="h-3.5 w-3.5" />
			<span class="sr-only">Dark</span>
		</button>

		<button
			class={cn(
				'flex h-8 w-8 items-center justify-center rounded-sm hover:bg-accent hover:text-accent-foreground',
				theme === 'system' && 'bg-secondary/10'
			)}
			onclick={() => (theme = 'system')}
		>
			<Laptop class="h-3.5 w-3.5" />
			<span class="sr-only">System</span>
		</button>
	</DropdownMenu>
</div>
