<script lang="ts">
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ Blogs } = data);
</script>

{@debug data}
<main class="w-screen h-screen border-2 max-w-screen-xl flex items-center justify-center">
	<div class="w-96 h-80 flex border-2">
		{#if $Blogs.data}
			{#each $Blogs.data.protected.blogs as blog (blog.id)}
				<div class="post">
					<h1>{blog.title}</h1>
					<p>{blog.content}</p>
				</div>
			{/each}
		{:else}
			<p>No blogs found</p>
		{/if}
	</div>
</main>

<style>
	.post {
		@apply flex p-4 rounded-lg;
	}
</style>
