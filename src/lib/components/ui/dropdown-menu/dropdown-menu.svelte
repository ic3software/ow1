<script lang="ts">
	import { cn } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { clickOutside } from '$lib/utils/click-outside';

	export let class_: string | undefined = undefined;
	export { class_ as class };

	let isOpen = false;

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}
</script>

<div class="relative" use:clickOutside={{ handler: close }}>
	<button on:click={toggle} class={cn('', class_)}>
		<slot name="trigger" />
	</button>

	{#if isOpen}
		<div
			transition:fade={{ duration: 100 }}
			class="absolute right-1/2 mt-2 w-10 translate-x-1/2 overflow-hidden rounded-md border bg-popover p-0.5 text-popover-foreground shadow-md"
		>
			<div class="flex flex-col items-center gap-0.5">
				<slot />
			</div>
		</div>
	{/if}
</div>
