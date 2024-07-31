<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Editor } from '@tiptap/core';
	export let editor: Editor;
</script>

<div class="btn-group">
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
		disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
		class:active={editor.isActive('h3')}
		title="H3"
		class="btn btn-sm"
	>
		H3
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
		disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
		class:active={editor.isActive('h4')}
		title="H4"
		class="btn btn-sm"
	>
		H4
	</button>
	<button
		on:click={() => editor.chain().focus().toggleBold().run()}
		disabled={!editor.can().chain().focus().toggleBold().run()}
		class:active={editor.isActive('bold')}
		title="Bold"
		class="btn btn-sm"
	>
		<Icon icon="mdi:format-bold" />
	</button>

	<button
		on:click={() => editor.chain().focus().toggleItalic().run()}
		disabled={!editor.can().chain().focus().toggleItalic().run()}
		class:active={editor.isActive('italic')}
		title="Italic"
		class="btn btn-sm"
	>
		<Icon icon="mdi:format-italic" />
	</button>

	<button
		on:click={() => editor.chain().focus().toggleStrike().run()}
		disabled={!editor.can().chain().focus().toggleStrike().run()}
		class:active={editor.isActive('strike')}
		title="Strike"
		class="btn btn-sm"
	>
		<Icon icon="mdi:format-strikethrough" />
	</button>

	<button
		on:click={() => editor.chain().focus().toggleBulletList().run()}
		disabled={!editor.can().chain().focus().toggleBulletList().run()}
		class:active={editor.isActive('bulletList')}
		title="Bullet list"
		class="btn btn-sm"
	>
		<Icon icon="mdi:format-list-bulleted" />
	</button>

	<button
		on:click={() => editor.chain().focus().toggleOrderedList().run()}
		disabled={!editor.can().chain().focus().toggleOrderedList().run()}
		class:active={editor.isActive('orderedList')}
		title="Ordered list"
		class="btn btn-sm"
	>
		<Icon icon="mdi:format-list-numbered" />
	</button>

	<button
		on:click={() => editor.chain().focus().toggleBlockquote().run()}
		disabled={!editor.can().chain().focus().toggleBlockquote().run()}
		class:active={editor.isActive('blockquote')}
		title="Blockquote"
		class="btn btn-sm"
	>
		<Icon icon="mdi:format-quote-close" />
	</button>

	<button
		on:click={() => editor.chain().focus().undo().run()}
		disabled={!editor.can().chain().focus().undo().run()}
		class:active={editor.isActive('undo')}
		title="Undo"
		class="btn btn-sm"
	>
		<Icon icon="mdi:undo" />
	</button>

	<button
		on:click={() => editor.chain().focus().redo().run()}
		disabled={!editor.can().chain().focus().redo().run()}
		class:active={editor.isActive('redo')}
		title="Redo"
		class="btn btn-sm"
	>
		<Icon icon="mdi:redo" />
	</button>
</div>

<style lang="postcss">
	.btn-group {
		@apply flex flex-col max-md:flex-row gap-4;
	}

	.btn-group button {
		@apply btn btn-sm btn-ghost transition-all flex items-center justify-center text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 p-2 rounded-md hover:bg-secondary/80;
	}
	.btn-group button:disabled {
		@apply cursor-not-allowed bg-secondary/50;
	}

	.btn-group button.active {
		@apply btn btn-sm btn-primary;
	}
</style>
