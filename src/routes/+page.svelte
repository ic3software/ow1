<script lang="ts">
	import { X } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { generateKeywords } from '$lib/gemini';

	let titleText = '';
	let keywordText = '';
	let tagInput = '';
	let tags: string[] = [];
	let isGenerating = false;

	async function generateTags() {
		if (!titleText.trim() && !keywordText.trim()) return;

		isGenerating = true;
		try {
			const combinedText = `${titleText.trim()}\n\n${keywordText.trim()}`;
			const keywords = await generateKeywords(combinedText);
			tags = [...new Set(keywords)]; // Remove duplicates
		} catch (error) {
			console.error('Failed to generate tags:', error);
		} finally {
			isGenerating = false;
		}
	}

	function handleTagInput(event: KeyboardEvent) {
		if (event.key === 'Enter' && tagInput.trim()) {
			event.preventDefault();
			addTag(tagInput.trim());
			tagInput = '';
		}
	}

	function addTag(tag: string) {
		if (tag && !tags.includes(tag)) {
			tags = [...tags, tag];
		}
	}

	function removeTag(index: number) {
		tags = tags.filter((_, i) => i !== index);
	}

	function handleSubmit() {
		// Handle form submission here
		console.log('Submitting tags:', tags);
	}
</script>

<div class="space-y-8">
	<section class="space-y-4">
		<h2 class="font-heading text-3xl text-primary">Tag Generator</h2>
		<p class="font-body">
			Enter a description of your offer or want and click the button to get a list of AI-generated
			tags.
		</p>

		<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
			<div class="space-y-2">
				<label
					for="title-text"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Title</label
				>
				<input
					id="title-text"
					type="text"
					bind:value={titleText}
					class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Enter a title..."
				/>
			</div>

			<div class="space-y-2">
				<label
					for="input-text"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Description</label
				>
				<textarea
					id="input-text"
					bind:value={keywordText}
					class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Enter your text here..."
				></textarea>
			</div>

			<div class="flex justify-end">
				<Button type="button" variant="secondary" on:click={generateTags} disabled={isGenerating}>
					{#if isGenerating}
						Generating Tags...
					{:else}
						Generate Tags
					{/if}
				</Button>
			</div>

			<div class="space-y-2">
				<label
					for="tags"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>Tags</label
				>
				<div
					class="flex min-h-[60px] w-full flex-wrap gap-2 rounded-md border border-input bg-background p-3"
				>
					{#each tags as tag, index (tag + index)}
						<span
							class="inline-flex items-center rounded-lg bg-secondary/25 py-0 pl-5 pr-3 text-sm"
						>
							{tag}
							<button
								type="button"
								class="ml-2 rounded-full p-0.5 hover:bg-secondary/20"
								on:click={() => removeTag(index)}
							>
								<X class="h-4 w-4" />
								<span class="sr-only">Remove {tag}</span>
							</button>
						</span>
					{/each}
					<input
						type="text"
						bind:value={tagInput}
						on:keydown={handleTagInput}
						class="flex-1 bg-transparent text-sm focus:outline-none"
						placeholder="Type and press Enter to add tags..."
					/>
				</div>
			</div>
			{#if tags.length > 0}
				<p class="font-body">
					You can then adjust the tags (add new ones and remove existing ones) to fit your needs.
				</p>
			{/if}
			<!-- <Button type="submit">Submit Data</Button> -->
		</form>
	</section>
</div>
