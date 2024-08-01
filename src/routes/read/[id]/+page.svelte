<script lang="ts">
	import Icon from '@iconify/svelte';
	import { formatDistanceToNow } from 'date-fns';
	import TagDisplay from '../ui/TagDisplay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ post } = data);

	function getReadingTime(content: string): number {
		const wordsPerMinute = 200;
		const wordCount = content.trim().split(/\s+/).length;
		return Math.ceil(wordCount / wordsPerMinute);
	}
</script>

<svelte:head>
	<title>{post.heading} | Auk Insider</title>
</svelte:head>

<main class="mt-16 max-w-screen-md mx-auto px-4 py-8 font-sans-serif">
	<div class="w-full flex">
		<a href="/read" class="btn btn-ghost"><Icon icon="mdi:arrow-left"></Icon>Go back</a>
	</div>

	<article class="prose lg:prose-xl flex flex-col gap-4">
		<TagDisplay tags={post.tags} />

		<div class="gap-0 space-y-4">
			<h1 class="text-4xl font-bold">{post.heading}</h1>
			<h2 class="text-xl text-base-content/70">{post.subheading}</h2>
		</div>

		<div class="flex items-center gap-4 mb-8">
			<div
				class="size-10 overflow-hidden flex items-center justify-center rounded-full relative border-2"
			>
				{#if post.author.avatar}
					<img
						src={post.author.avatar}
						alt={post.author.fullname}
						class="rounded-full w-full h-full object-cover"
					/>
				{:else}
					<div class="rounded-full w-full h-full object-cover bg-accent"></div>
				{/if}
			</div>
			<div>
				<div class="font-semibold">{post.author.fullname}</div>
				<div class="text-sm text-base-content/70">
					{formatDistanceToNow(new Date(post.createdAt))} ago ·
					{getReadingTime(post.content)} min read
				</div>
			</div>
		</div>

		<div class="post-content">
			{@html post.content}
		</div>

		<div class="border-t border-base-content/70 pt-8">
			<h3 class="text-xl font-semibold mb-4">About the author</h3>
			<div class="flex items-center space-x-4">
				<div
					class="size-10 overflow-hidden flex items-center justify-center rounded-full relative border-2"
				>
					{#if post.author.avatar}
						<img
							src={post.author.avatar}
							alt={post.author.fullname}
							class="rounded-full w-full h-full object-cover"
						/>
					{:else}
						<div class="rounded-full w-full h-full object-cover bg-accent"></div>
					{/if}
				</div>
				<div class="flex flex-col">
					<p class="font-semibold">{post.author.fullname}</p>
					{#if post.author.bio}
						<p class="text-sm text-base-content/70 italic max-w-md">"{post.author.bio}"</p>
					{:else}
						<p class="text-sm text-base-content">{'Here will be author`s biography'}</p>
					{/if}
				</div>
			</div>
		</div>
	</article>
</main>

<style lang="postcss">
	:global(body) {
		@apply bg-gray-100;
	}

	article {
		@apply bg-white shadow-md rounded-lg p-8;
	}

	.prose :global(h2) {
		@apply text-2xl font-semibold mt-8 mb-4;
	}

	.prose :global(p) {
		@apply mb-4 leading-relaxed;
	}

	.prose :global(ul),
	.prose :global(ol) {
		@apply ml-6 mb-4;
	}

	.prose :global(li) {
		@apply mb-2;
	}

	.prose :global(blockquote) {
		@apply border-l-4 border-gray-300 pl-4 italic my-4;
	}
</style>
