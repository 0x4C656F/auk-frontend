<script lang="ts">
	import type { Tag } from '$root/lib/entities';
	import { AukInsiderLogo, Button } from '$shared/ui';
	import { Editor } from '@tiptap/core';
	import { Color } from '@tiptap/extension-color';
	import Heading from '@tiptap/extension-heading';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ControlButtonGroup from './ui/ControlButtonGroup.svelte';
	import TagSelector from './ui/TagSelector.svelte';
	export let data: PageData;

	let element: Element;
	let editor: Editor;
	let form: HTMLFormElement;
	let content = '';
	let heading = data.post.heading;
	let subheading = data.post.subheading;
	let selectedTags: Tag[] = data.post.tags;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				TextStyle.configure(),
				StarterKit,
				Heading.configure({ levels: [3, 4] })
			],

			content: data.post.content,

			onTransaction: (e) => {
				content = e.editor.getHTML();
				editor = editor;
			}
		});
	});
</script>

<header class="header">
	<AukInsiderLogo></AukInsiderLogo>
	<section class="flex gap-4">
		<Button on:click={() => form.requestSubmit()}>Save</Button>
		{#if data.post.published}
			<Button variant="ghost" href={`/read/${data.post.id}`}>View in posts</Button>
		{:else}
			<form method="post" action="?/publish">
				<Button variant="ghost" type="submit">Publish</Button>
			</form>
		{/if}
	</section>
</header>

<div class="flex mt-40 gap-16 mb-20 w-full max-w-screen-xl px-16">
	{#if editor}
		<ControlButtonGroup {editor}></ControlButtonGroup>
	{/if}

	<form
		action="?/save"
		bind:this={form}
		autocomplete="off"
		method="POST"
		class="flex justify-between w-full gap-40"
	>
		<div class="article-container">
			<input type="text" name="heading" bind:value={heading} placeholder="Title" class="heading" />
			<input
				type="text"
				autocomplete="off"
				name="subheading"
				bind:value={subheading}
				placeholder="Subheading"
				class="subheading"
			/>
			<input type="hidden" name="tags" bind:value={selectedTags} class="hidden" />
			<input type="hidden" name="content" bind:value={content} class="hidden" />
			<div bind:this={element} class="post-content"></div>
		</div>
		<TagSelector bind:selectedTags />
	</form>
</div>

<style lang="postcss" global>
	.article-container {
		@apply text-gray-900 outline-none max-w-screen-xl  gap-8 font-sans-serif flex-col flex  w-full;

		input.heading {
			@apply bg-background text-5xl font-heading font-semibold border-l-2 focus:outline-none border-transparent focus:border-secondary pl-2;
		}
		input.subheading {
			@apply bg-background text-text/60 text-2xl font-heading  border-l-2 focus:outline-none border-transparent focus:border-secondary pl-2;
		}
	}

	:global(.tiptap) {
		@apply w-full text-lg border-l-2 pl-2 ml-0 border-transparent font-light focus:border-secondary focus:outline-none focus:ring-0;
	}
</style>
