<script lang="ts">
	import { AukInsiderLogo, Button } from '$shared/ui';
	import { Editor } from '@tiptap/core';
	import { Color } from '@tiptap/extension-color';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import StarterKit from '@tiptap/starter-kit';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ControlButtonGroup from './ui/ControlButtonGroup.svelte';
	export let data: PageData;

	let element: Element;
	let editor: Editor;
	let form: HTMLFormElement;
	let content = '';
	let heading = data.heading;
	let subheading = data.subheading;
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				TextStyle.configure(),
				StarterKit
			],

			content: data.content,

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
		<form method="post" action="?/publish">
			<Button variant="ghost" type="submit">Publish</Button>
		</form>
	</section>
</header>

<div class="flex mt-40 gap-16 w-full max-w-screen-xl px-16">
	{#if editor}
		<ControlButtonGroup {editor}></ControlButtonGroup>
	{/if}

	<form action="?/save" bind:this={form} autocomplete="off" method="POST" class="article-container">
		<input type="text" name="heading" bind:value={heading} placeholder="Title" class="heading" />
		<input
			type="text"
			autocomplete="off"
			name="subheading"
			bind:value={subheading}
			placeholder="Subheading"
			class="subheading"
		/>

		<input name="content" bind:value={content} class=" hidden" />
		<div bind:this={element}></div>
	</form>
</div>

<style lang="postcss" global>
	.article-container {
		@apply text-gray-900 outline-none gap-8 font-sans-serif flex flex-col w-full;

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

	:global(.tiptap > *:first-child) {
		@apply mt-0;
	}

	:global(.tiptap ul, .tiptap ol) {
		@apply pl-4 my-5 ml-1;
	}

	:global(.tiptap ul li p, .tiptap ol li p) {
		@apply my-1;
	}

	:global(.tiptap h1, .tiptap h2, .tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6) {
		@apply leading-tight mt-10;
	}

	:global(.tiptap h1, .tiptap h2) {
		@apply mt-14 mb-6;
	}

	:global(.tiptap code) {
		@apply bg-purple-100 rounded text-black text-sm px-1 py-0.5;
	}

	:global(.tiptap pre) {
		@apply bg-black rounded-lg text-white font-mono my-6 p-3;
	}

	:global(.tiptap pre code) {
		@apply bg-transparent text-inherit text-xs p-0;
	}

	:global(.tiptap blockquote) {
		@apply border-l-4 border-gray-300 my-6 pl-4;
	}

	:global(.tiptap hr) {
		@apply border-none border-t border-gray-200 my-8;
	}
	:global(.tiptap strong) {
		@apply font-bold text-black;
	}
</style>
