<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Program, Tag } from '$root/lib/entities';
	import { AukInsiderLogo } from '$shared/ui';
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
	import ProgramSelector from './ui/ProgramSelector.svelte';
	import SubheadingInput from './ui/SubheadingInput.svelte';
	import TagSelector from './ui/TagSelector.svelte';

	export let data: PageData;

	let element: Element;
	let editor: Editor;
	let saveForm: HTMLFormElement;
	let publishForm: HTMLFormElement;
	let content = '';
	let heading = data.post.heading;
	let subheading = data.post.subheading;
	let selectedTags: Tag[] = data.post.tags;
	let selectedPrograms: Program[] = data.post.relatedPrograms;

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
				saveForm.requestSubmit();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	function saveAndPublish() {
		saveForm.requestSubmit();
		setTimeout(() => {
			publishForm.requestSubmit();
		}, 200);
	}
</script>

<header class="header">
	<AukInsiderLogo />
	<section class="flex gap-4">
		<div class="hidden md:block">
			<button class="btn btn-primary" on:click={() => saveForm.requestSubmit()}>Save</button>
		</div>
		{#if data.post.published}
			<a href={`/read/${data.post.id}`} class="btn btn-ghost">
				<Icon icon="mdi:eye" class="mr-2" />
				View in posts
			</a>
		{:else}
			<form method="post" use:enhance bind:this={publishForm} action="?/publish">
				<button class="btn btn-ghost" on:click={saveAndPublish}>
					<Icon icon="mdi:publish" class="mr-2" />
					Save & Publish
				</button>
			</form>
		{/if}
	</section>
</header>

<div
	class="flex flex-col md:flex-row mt-40 gap-10 mb-20 w-full max-w-screen-xl px-4 md:px-8 xl:px-16"
>
	{#if editor}
		<ControlButtonGroup {editor} />
	{/if}

	<form
		action="?/save"
		bind:this={saveForm}
		autocomplete="off"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		method="POST"
		class="flex flex-col md:flex-row w-full gap-20"
	>
		<div class="flex flex-col gap-8 w-full">
			<div class="text-sm text-base-content font-sans-serif flex items-center p-1 gap-1">
				<Icon icon="mdi:information-outline" />
				<span>Hint: use ctrl+s to save</span>
			</div>
			<HeadingInput bind:value={heading} />
			<SubheadingInput bind:value={subheading} />

			<input type="hidden" name="tags" bind:value={selectedTags} class="hidden" />
			<input type="hidden" name="programs" bind:value={selectedPrograms} class="hidden" />

			<input type="hidden" name="content" bind:value={content} class="hidden" />
			<div bind:this={element} class="post-content"></div>
			<div class="md:hidden pl-2">
				<button class="btn btn-outline btn-primary" on:click={() => saveForm.requestSubmit()}>
					Save
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-8">
			<TagSelector bind:selectedTags />
			<ProgramSelector bind:selectedPrograms />
		</div>
	</form>
</div>

<style lang="postcss" global>
	.article-container {
		@apply outline-none  gap-8 font-sans-serif flex-col flex  w-full;
	}

	:global(.tiptap) {
		@apply w-full text-lg border-l-2 pl-2 ml-0 border-transparent font-light focus:border-secondary focus:outline-none focus:ring-0;
	}
</style>
