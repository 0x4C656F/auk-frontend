<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import MyPost from './ui/MyPost.svelte';

	export let data: PageData;

	$: drafts = data.posts.filter((post) => !post.published);
	$: published = data.posts.filter((post) => post.published);

	let activeTab = 'drafts';
</script>

<div class="max-w-2xl mx-auto px-4 py-8 mt-40 min-w-[450px]">
	<h1 class="text-3xl font-bold mb-6 font-serif">Your stories</h1>

	<div class="flex space-x-4 mb-6">
		<a href="/read" class="btn btn-ghost">
			<Icon icon="mdi:arrow-back" class="mr-2" />
			Back to posts
		</a>
		<form action="/write" method="post">
			<button type="submit" class="btn btn-primary">Write a story</button>
		</form>
	</div>

	<div class="flex border-b mb-6">
		<button
			class="px-4 py-2 text-sm font-medium {activeTab === 'drafts'
				? 'border-b-2 border-primary text-primary'
				: 'text-base-content'}"
			on:click={() => (activeTab = 'drafts')}
		>
			Drafts {drafts.length}
		</button>
		<button
			class="px-4 py-2 text-sm font-medium {activeTab === 'published'
				? 'border-b-2 border-primary text-primary'
				: 'text-base-content'}"
			on:click={() => (activeTab = 'published')}
		>
			Published {published.length}
		</button>
		<button class="px-4 py-2 text-sm font-medium text-base-content">Responses</button>
	</div>

	{#if activeTab === 'drafts'}
		<ul class="flex flex-col gap-6">
			{#each drafts as post}
				<MyPost {post} />
			{/each}
		</ul>
	{:else if activeTab === 'published'}
		<ul class="flex flex-col gap-6">
			{#each published as post}
				<MyPost {post} />
			{/each}
		</ul>
	{/if}
</div>
