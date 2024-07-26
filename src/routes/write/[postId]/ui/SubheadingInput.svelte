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
	name="subheading"
	placeholder="Subheading"
	autocomplete="off"
	class="w-full resize-none overflow-hidden bg-background text-text/60 text-2xl font-heading border-l-2 focus:outline-none border-transparent focus:border-secondary pl-2"
	rows="1"
></textarea>
