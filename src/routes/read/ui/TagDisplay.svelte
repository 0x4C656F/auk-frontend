<script lang="ts">
	import type { Tag } from '$root/lib/entities';

	export let tags: Tag[];

	const getTagColor = (tag: Tag) => {
		const colors = {
			Technology: 'bg-blue-100 text-blue-800',
			Event: 'bg-green-100 text-green-800',
			Lifestyle: 'bg-yellow-100 text-yellow-800',
			Announcement: 'bg-purple-100 text-purple-800',
			Research: 'bg-pink-100 text-pink-800',
			Achievement: 'bg-indigo-100 text-indigo-800',
			Career: 'bg-red-100 text-red-800',
			Internship: 'bg-orange-100 text-orange-800',
			News: 'bg-teal-100 text-teal-800',
			StudentLife: 'bg-cyan-100 text-cyan-800',
			Discussion: 'bg-amber-100 text-amber-800',
			Question: 'bg-lime-100 text-lime-800'
		};
		return colors[tag] || 'bg-gray-100 text-gray-800';
	};
</script>

<div class="flex flex-wrap gap-2">
	{#each tags as tag}
		<span class={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
			{tag.replace('_', ' ')}
		</span>
	{/each}
</div>
