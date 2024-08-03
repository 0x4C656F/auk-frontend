<script lang="ts">
	import { type PostWithAuthor, Role } from '$root/lib/entities';
	import { format, formatDistanceToNow } from 'date-fns';
	import Pin from './Pin.svelte';
	import TagDisplay from './TagDisplay.svelte';

	function getWordCount(content: string): number {
		return content.trim().split(/\s+/).length;
	}

	export let post: PostWithAuthor;
	export let canPin: boolean;
</script>

<article
	class="flex flex-col py-4 border-b-2 gap-2 border-base-content/20 relative"
	class:border-primary={post.author.role === Role.TEACHER}
>
	{#if post.author.role === Role.TEACHER}
		<div
			class="absolute bottom-0 bg-gradient-to-t from-secondary w-full h-10 blur-xl opacity-50"
		></div>
	{/if}
	<div class="flex justify-between text-xs text-base-content">
		<div class="flex items-center gap-2">
			<a href={`/profile/${post.author.id}`} class="flex items-center gap-2 group">
				<div class="size-6">
					{#if post.author.avatar}
						<img
							src={post.author.avatar}
							alt={post.author.fullname}
							class="rounded-full w-full h-full object-cover"
						/>
					{:else}
						<div class="avatar avatar-sm bg-secondary"></div>
					{/if}
				</div>
				<p class="whitespace-nowrap group-hover:underline underline-offset-2 decoration-primary">
					{post.author.fullname}
				</p>
			</a>
			<span>·</span>
			<p class="whitespace-nowrap">{formatDistanceToNow(new Date(post.createdAt))} ago</p>
			<span>·</span>
			<p class="whitespace-nowrap">{getWordCount(post.content)} words</p>
			{#if post.pin && post.pin.unpinAt}
				<span class="hidden max-md:inline">·</span>
				<p class="hidden max-md:inline">
					pinned until {format(new Date(post.pin.unpinAt), 'MMM d')}
				</p>
			{/if}
		</div>
		{#if canPin}
			<Pin {post}></Pin>
		{/if}
	</div>
	<a href={`/read/${post.id}`} class="text-xl font-semibold">{post.heading}</a>
	<h3 class="text-base text-base-content/70">{post.subheading}</h3>
	<TagDisplay tags={post.tags} />
</article>
