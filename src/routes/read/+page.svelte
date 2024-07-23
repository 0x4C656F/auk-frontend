<script lang="ts">
	import { AukInsiderLogo, Button } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	function getWordCount(content: string): number {
		return content.trim().split(/\s+/).length;
	}
</script>

<header class="header">
	<AukInsiderLogo />
	<section class="flex gap-4">
		<Button href={`/read/my`} variant="ghost">My posts</Button>
		<form action="/write" method="POST">
			<Button type="submit"><Icon icon="jam:write"></Icon>Write</Button>
		</form>
	</section>
</header>
<main class="w-screen h-screen max-w-screen-xl font-sans-serif px-16 mt-40 flex">
	<div class="w-full max-w-xl flex-col flex mt-16 gap-6">
		{#each data.posts as post (post.id)}
			<a href={`/read/${post.id}`} class="post">
				<h2 class="text-xl font-semibold mb-1">{post.heading}</h2>
				<h3 class="text-base text-text-muted mb-2">{post.subheading}</h3>
				<div class="flex items-center gap-2 text-sm text-text-muted">
					<div class="size-5 rounded-full bg-secondary"></div>
					<p>{post.author.fullname}</p>
					<span>·</span>
					<p>{formatDistanceToNow(new Date(post.createdAt))} ago</p>
					<span>·</span>
					<p>{getWordCount(post.content)} words</p>
				</div>
			</a>
		{/each}
	</div>
</main>

<style lang="postcss">
	.post {
		@apply flex flex-col py-6 border-b-2  border-b-text;
	}

	.post:last-child {
		@apply border-b-0;
	}
</style>
