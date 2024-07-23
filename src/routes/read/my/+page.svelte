<script lang="ts">
	import { Button } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	function getWordCount(content: string): number {
		return content.trim().split(/\s+/).length;
	}

	$: drafts = data.posts.filter((post) => !post.published);
	$: published = data.posts.filter((post) => post.published);

	let activeTab = 'drafts';
</script>

<div class="max-w-2xl mx-auto px-4 py-8 mt-40 font-sans-serif min-w-[450px]">
	<h1 class="text-3xl font-bold mb-6 font-serif">Your stories</h1>

	<div class="flex space-x-4 mb-6">
		<Button variant="ghost" href="/read"><Icon icon="mdi:arrow-back"></Icon>Back to posts</Button>
		<form action="/write" method="post"><Button type="submit">Write a story</Button></form>
	</div>

	<div class="flex border-b mb-6">
		<button
			class="px-4 py-2 text-sm font-medium {activeTab === 'drafts'
				? 'border-b-2 border-text'
				: 'text-text-muted'}"
			on:click={() => (activeTab = 'drafts')}
		>
			Drafts {drafts.length}
		</button>
		<button
			class="px-4 py-2 text-sm font-medium {activeTab === 'published'
				? 'border-b-2 border-text'
				: 'text-text-muted'}"
			on:click={() => (activeTab = 'published')}
		>
			Published {published.length}
		</button>
		<button class="px-4 py-2 text-sm font-medium text-text-muted">Responses</button>
	</div>

	{#if activeTab === 'drafts'}
		<ul class="flex flex-col gap-6">
			{#each drafts as post}
				<a href={`/write/${post.id}`} class=" group post">
					<h3 class="group-hover:translate-x-2">
						{post.heading}
					</h3>
					<p class="group-hover:translate-x-2">
						Last edited {formatDistanceToNow(new Date(post.updatedAt))} ago ·
						{getWordCount(post.content)} words so far
					</p>
				</a>
			{/each}
		</ul>
	{:else if activeTab === 'published'}
		<ul class="flex flex-col gap-6">
			{#each published as post}
				<a href={`/read/${post.id}`} class="group post">
					<h3 class="group-hover:translate-x-2">{post.heading}</h3>
					<p class="group-hover:translate-x-2">
						Published {formatDistanceToNow(new Date(post.updatedAt))} ago ·
						{getWordCount(post.content)} words
					</p>
				</a>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.post {
		@apply w-[400px];

		h3 {
			@apply text-lg  font-semibold mb-1   transition-all duration-[250ms] break-words;
		}

		p {
			@apply text-sm text-text-muted group-hover:translate-x-2 transition-all duration-[350ms] break-words;
		}
	}
</style>
