<script lang="ts">
	import { onMount } from 'svelte';

	let { value = $bindable() } = $props();
	let input: HTMLTextAreaElement;

	function autoResize() {
		input.style.height = 'auto';
		input.style.height = input.scrollHeight + 'px';
	}

	onMount(() => {
		autoResize();
	});
</script>

<textarea
	bind:this={input}
	bind:value
	oninput={autoResize}
	name="heading"
	placeholder="Title"
	class="textarea text-5xl font-bold font-serif pl-2 w-full resize-none overflow-hidden"
	rows="1"
></textarea>
