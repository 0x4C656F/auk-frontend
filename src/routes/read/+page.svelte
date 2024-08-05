<script lang="ts">
	import { Role } from '$root/lib/entities';
	import { AukInsiderLogo } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import type { PageData } from './$types';
	import Post from './ui/Post.svelte';

	const { data }: { data: PageData } = $props();

	let showPostsForOtherPrograms = $state(false);
	const pinnedPosts = $derived(() => {
		return data.posts.filter((post) => post.pin);
	});
	const regularPosts = $derived(() => {
		if (!showPostsForOtherPrograms) {
			return data.posts.filter((post) => !post.pin);
		} else {
			const user = data.user;

			return user
				? data.posts.filter((post) => !post.pin && post.relatedPrograms.includes(user.program))
				: [];
		}
	});
	const [send, receive] = crossfade({ easing: quintOut });
</script>

<header class="header">
	<AukInsiderLogo />
	<section class="flex gap-4">
		<a href={`/read/my`} class="btn btn-ghost">My posts</a>
		<form action="/write" method="POST">
			<button type="submit" class="btn btn-primary flex items-center gap-2">
				<Icon icon="jam:write"></Icon>Write
			</button>
		</form>
	</section>
</header>

<main class="w-screen max-w-screen-xl font-sans-serif px-6 lg:px-16 my-40">
	<div class="lg:flex-row flex gap-8 flex-col-reverse">
		<div class="w-full lg:w-1/2 flex-col flex mt-16 gap-6">
			<div class="flex gap-8">
				<h2 class="text-2xl font-bold py-4 items-center">Latest Posts</h2>

				{#if data.user?.role == Role.STUDENT}
					<label class="label text-xs cursor-pointer flex gap-2">
						<span class="label-text">Show posts only for {data.user?.program}</span>
						<input
							type="checkbox"
							class="toggle toggle-xs"
							bind:checked={showPostsForOtherPrograms}
						/>
					</label>
				{/if}
			</div>
			{#each regularPosts() as post (post.id)}
				<div animate:flip in:receive={{ key: post.id }} out:send={{ key: post.id }}>
					<Post {post} canPin={data.user?.role != Role.STUDENT} />
				</div>
			{/each}
		</div>
		<div class="w-full lg:w-1/2 flex-col flex mt-16 gap-6">
			<div class="bg-accent p-4 rounded-lg mb-4 relative">
				<Icon class="absolute top-1 right-1 text-accent-content size-5" icon="mdi:info"></Icon>
				<h2 class="text-2xl font-bold mb-2">Pinned Posts</h2>
				<p class="text-sm text-accent-content/70">Important posts from teachers and developers</p>
			</div>
			{#if pinnedPosts().length === 0}
				<p class="text-base-content/70">No pinned posts yet</p>
			{/if}
			{#each pinnedPosts() as post (post.id)}
				<div animate:flip in:receive={{ key: post.id }} out:send={{ key: post.id }}>
					<Post {post} canPin={data.user?.role != Role.STUDENT} />
				</div>
			{/each}
		</div>
	</div>
</main>
