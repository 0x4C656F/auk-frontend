<script lang="ts">
	import { Color } from '@tiptap/extension-color';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	let element: Element;
	let editor: Editor;
	let value = '';

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				TextStyle.configure(),
				StarterKit
			],

			content: `
				<i style='opacity:20%'>Tell your story...</i>
		`,

			onTransaction: (e) => {
				// force re-render so `editor.isActive` works as expected
				value = e.editor.getHTML();
				editor = editor;
			}
		});
	});
</script>

<div class="flex mt-40 gap-16 w-full max-w-screen-xl px-16">
	{#if editor}
		<div class="button-group">
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
				title="Bold"
			>
				<Icon icon="mdi:format-bold" />
			</button>

			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class:active={editor.isActive('italic')}
				title="Italic"
			>
				<Icon icon="mdi:format-italic" />
			</button>

			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class:active={editor.isActive('strike')}
				title="Strike"
			>
				<Icon icon="mdi:format-strikethrough" />
			</button>

			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				disabled={!editor.can().chain().focus().toggleBulletList().run()}
				class:active={editor.isActive('bulletList')}
				title="Bullet list"
			>
				<Icon icon="mdi:format-list-bulleted" />
			</button>

			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				disabled={!editor.can().chain().focus().toggleOrderedList().run()}
				class:active={editor.isActive('orderedList')}
				title="Ordered list"
			>
				<Icon icon="mdi:format-list-numbered" />
			</button>

			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				disabled={!editor.can().chain().focus().toggleBlockquote().run()}
				class:active={editor.isActive('blockquote')}
				title="Blockquote"
			>
				<Icon icon="mdi:format-quote-close" />
			</button>

			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				class:active={editor.isActive('undo')}
				title="Undo"
			>
				<Icon icon="mdi:undo" />
			</button>

			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				class:active={editor.isActive('redo')}
				title="Redo"
			>
				<Icon icon="mdi:redo" />
			</button>
		</div>
	{/if}

	<form action="?/save-blog" method="POST" use:enhance class="article-container">
		<input type="text" name="title" placeholder="Title" />
		<input name="content" bind:value class=" hidden" />
		<div bind:this={element} class="tiptap" />
		<button>Publish</button>
	</form>
</div>

<style lang="scss" global>
	.article-container {
		@apply text-gray-900 outline-none gap-8 font-sans-serif flex flex-col  w-full;
		input {
			@apply bg-background text-5xl font-heading font-semibold border-l-2 focus:outline-none border-transparent focus:border-secondary pl-2;
		}
	}
	:global(.tiptap) {
		@apply w-full text-lg border-l-2 border-transparent font-light focus:border-secondary focus:outline-none focus:ring-0;
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

	.button-group {
		@apply gap-4 flex flex-col;
	}

	.button-group button {
		@apply focus:outline-none bg-secondary transition-all text-text focus:ring-2 focus:bg-accent focus:ring-opacity-50 p-2 rounded-md hover:bg-secondary/80;
	}
	.button-group button:disabled {
		@apply cursor-auto bg-secondary/50;
	}

	.button-group button.active {
		@apply bg-accent text-white;
	}
</style>
