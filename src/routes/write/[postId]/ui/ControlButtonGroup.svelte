<script>
	import Icon from '@iconify/svelte';
	export let editor;
</script>

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

<style lang="postcss">
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
