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
		return () => {};
	}
</script>

<div class="flex flex-col gap-4 mt-4 max-w-md h-fit">
	<h3 class="text-lg font-semibold flex gap-2 items-center">
		<Icon icon="mdi:tag" class="text-xl" />
		<p>Tags</p>
	</h3>
	<section class="flex flex-wrap gap-2">
		{#each tags as tag}
			<button
				type="button"
				class:btn-primary={selectedTags.includes(tag)}
				class={'btn btn-sm'}
				onclick={toggleTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</section>
</div>
