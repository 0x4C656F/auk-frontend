<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Tag } from '$root/lib/entities';
	import { AukInsiderLogo, Button } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import { Editor } from '@tiptap/core';
	import { Color } from '@tiptap/extension-color';
	import Heading from '@tiptap/extension-heading';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ControlButtonGroup from './ui/ControlButtonGroup.svelte';
	import HeadingInput from './ui/HeadingInput.svelte';
	import SubheadingInput from './ui/SubheadingInput.svelte';
	import TagSelector from './ui/TagSelector.svelte';

	export let data: PageData;
	let element: Element;
	let editor: Editor;
	let formElem: HTMLFormElement;
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

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === 's') {
				e.preventDefault();
				formElem.requestSubmit();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<header class="header">
	<AukInsiderLogo></AukInsiderLogo>
	<section class="flex gap-4">
		<Button on:click={() => formElem.requestSubmit()}>Save</Button>
		{#if data.post.published}
			<Button variant="ghost" href={`/read/${data.post.id}`}>View in posts</Button>
		{:else}
			<form method="post" action="?/publish">
				<Button variant="ghost" type="submit">Save & Publish</Button>
			</form>
		{/if}
	</section>
</header>
<div class="flex mt-40 gap-10 mb-20 w-full max-w-screen-xl px-16">
	{#if editor}
		<ControlButtonGroup {editor}></ControlButtonGroup>
	{/if}

	<form
		action="?/save"
		bind:this={formElem}
		autocomplete="off"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		method="POST"
		class="flex justify-between w-full gap-20"
	>
		<div class="article-container">
			<div class="text-text-muted flex items-center p-1 gap-1">
				<Icon icon="mdi:info" class="mb-1"></Icon>Hint: use ctrl+s to save
			</div>
			<HeadingInput bind:value={heading} />
			<SubheadingInput bind:value={subheading} />

			<input type="hidden" name="tags" bind:value={selectedTags} class="hidden" />
			<input type="hidden" name="content" bind:value={content} class="hidden" />
			<div bind:this={element} class="post-content"></div>
		</div>
		<TagSelector bind:selectedTags />
	</form>
</div>

<style lang="postcss" global>
	.article-container {
		@apply text-text outline-none  gap-8 font-sans-serif flex-col flex  w-full;
	}

	:global(.tiptap) {
		@apply w-full text-lg border-l-2 pl-2 ml-0 border-transparent font-light focus:border-secondary focus:outline-none focus:ring-0;
	}
</style>
