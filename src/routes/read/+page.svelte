<script lang="ts">
	import { Role } from '$root/lib/entities';
	import { AukInsiderLogo, Button } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import Post from './ui/Post.svelte';

	const { data }: { data: PageData } = $props();

	const pinnedPosts = $derived(() => {
		return data.posts.filter((post) => post.pin);
	});
	const regularPosts = $derived(() => {
		return data.posts.filter((post) => !post.pin);
	});
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
<main class="w-screen max-w-screen-xl font-sans-serif px-6 lg:px-16 my-40">
	<div class="lg:flex-row flex gap-8 flex-col-reverse">
		<div class="w-full lg:w-1/2 flex-col flex mt-16 gap-6">
			<h2 class="text-2xl font-bold mb-4">Latest Posts</h2>
			{#each regularPosts() as post (post.id)}
				<Post {post} canPin={data.user?.role != Role.STUDENT} />
			{/each}
		</div>
		<div class="w-full lg:w-1/2 flex-col flex mt-16 gap-6">
			<div class="bg-secondary p-4 rounded-lg mb-4 relative">
				<Icon class="absolute top-1 right-1 text-text size-5" icon="mdi:info"></Icon>
				<h2 class="text-2xl font-bold mb-2">Pinned Posts</h2>
				<p class="text-sm text-text-muted">Important posts from teachers and developers</p>
			</div>
			{#if pinnedPosts().length === 0}
				<p class="text-text-muted">No pinned posts yet</p>
			{/if}
			{#each pinnedPosts() as post (post.id)}
				<Post {post} canPin={data.user?.role != Role.STUDENT} />
			{/each}
		</div>
	</div>
</main>
