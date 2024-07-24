<script lang="ts">
	import type { PostWithAuthor } from '$root/lib/entities';
	import { getWordCount } from '$root/lib/helpers';
	import { formatDistanceToNow } from 'date-fns';
	import TagDisplay from '../../ui/TagDisplay.svelte';

	export let post: PostWithAuthor;
</script>

<a href={`/write/${post.id}`} class="group post">
	<h3 class="group-hover:translate-x-2">{post.heading}</h3>
	<p class="group-hover:translate-x-2">
		Published {formatDistanceToNow(new Date(post.updatedAt))} ago ·
		{getWordCount(post.content)} words
	</p>
	<div class="group-hover:translate-x-2"><TagDisplay tags={post.tags} /></div>
</a>

<style lang="postcss">
	.post {
		@apply w-[400px] border-b border-b-secondary pb-4;

		h3 {
			@apply text-lg  font-semibold mb-1   transition-all duration-[250ms] break-words;
		}

		p {
			@apply text-sm text-text-muted  mb-2 transition-all duration-[350ms] break-words;
		}

		div {
			@apply transition-all duration-[450ms];
		}
	}
</style>
