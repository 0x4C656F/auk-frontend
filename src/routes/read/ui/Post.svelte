<script lang="ts">
	import type { PostWithAuthor } from '$root/lib/entities';
	import { formatDistanceToNow } from 'date-fns';
	import TagDisplay from './TagDisplay.svelte';
	function getWordCount(content: string): number {
		return content.trim().split(/\s+/).length;
	}
	export let post: PostWithAuthor;
</script>

<a href={`/read/${post.id}`} class="post">
	<h2 class="text-xl font-semibold mb-1">{post.heading}</h2>
	<h3 class="text-base text-text-muted mb-2">{post.subheading}</h3>
	<TagDisplay tags={post.tags} />
	<div class="flex items-center gap-2 text-sm text-text-muted mt-2">
		<div class="size-5 rounded-full bg-secondary"></div>
		<p>{post.author.fullname}</p>
		<span>·</span>
		<p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
		<span>·</span>
		<p>{getWordCount(post.content)} words</p>
	</div>
</a>

<style lang="postcss">
	.post {
		@apply flex flex-col py-6 border-b-2  border-b-text-muted/20;
	}

	.post:last-child {
		@apply border-b-0;
	}
</style>
