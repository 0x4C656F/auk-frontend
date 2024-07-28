<script lang="ts">
	import { Role, type PostWithAuthor } from '$root/lib/entities';
	import { format, formatDistanceToNow } from 'date-fns';
	import Pin from './Pin.svelte';
	import TagDisplay from './TagDisplay.svelte';
	function getWordCount(content: string): number {
		return content.trim().split(/\s+/).length;
	}
	const { post, canPin }: { post: PostWithAuthor; canPin: boolean } = $props();
</script>

<article class="post" class:teacher={post.author.role === Role.TEACHER}>
	{#if post.author.role === Role.TEACHER}
		<div class="absolute bottom-0 bg-gradient-to-t from-secondary w-full h-10 blur-xl"></div>
	{/if}
	<div class="flex justify-between text-xs">
		<div class="flex items-center gap-2 text-text-muted">
			<div class="size-5 rounded-full bg-secondary"></div>
			<p class="whitespace-nowrap">{post.author.fullname}</p>
			<span>·</span>
			<p class="whitespace-nowrap">{formatDistanceToNow(new Date(post.createdAt))} ago</p>
			<span>·</span>
			<p class="whitespace-nowrap">{getWordCount(post.content)} words</p>
			{#if post.pin && post.pin.unpinAt}
				<span class="max-md:hidden">·</span>
				<p class="max-md:hidden">pinned until {format(new Date(post.pin.unpinAt), 'MMM d')}</p>
			{/if}
		</div>
		{#if canPin}
			<Pin {post}></Pin>
		{/if}
	</div>
	<a href={`/read/${post.id}`} class="text-xl font-semibold 1">{post.heading}</a>
	<h3 class="text-base text-text-muted">{post.subheading}</h3>
	<TagDisplay tags={post.tags} />
</article>

<style lang="postcss">
	.post {
		@apply flex flex-col py-4 border-b-2 gap-2 border-b-text-muted/20 relative;
	}

	.teacher {
		@apply border-b-primary;
	}
</style>
