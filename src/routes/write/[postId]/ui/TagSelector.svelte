<script lang="ts">
	import { tags, type Tag } from '$root/lib/entities';
	import Icon from '@iconify/svelte';

	export let selectedTags: Tag[] = [];

	function toggleTag(tag: Tag) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}
</script>

<div class="flex flex-wrap flex-col gap-4 mt-4 max-w-lg">
	<h3 class="text-lg font-semibold flex gap-2 items-center">
		<Icon icon="mdi:tag"></Icon>
		<p>Tags</p>
	</h3>
	<section class="flex flex-wrap gap-2">
		{#each tags as tag}
			<button
				type="button"
				class={`px-3 py-1 h-fit rounded-full text-sm font-medium ${
					selectedTags.includes(tag)
						? 'bg-primary text-white'
						: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
				}`}
				on:click={() => toggleTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</section>
</div>
