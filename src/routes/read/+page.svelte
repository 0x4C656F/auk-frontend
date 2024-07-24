<script lang="ts">
	import { AukInsiderLogo, Button } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import Post from './ui/Post.svelte';

	export let data: PageData;
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
			<Post {post} />
		{/each}
	</div>
</main>
