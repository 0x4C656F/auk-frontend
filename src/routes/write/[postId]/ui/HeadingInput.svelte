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
	class="bg-background text-5xl font-heading font-semibold border-l-2 border-transparent focus:border-secondary pl-2 w-full resize-none overflow-hidden bg-transparent focus:outline-none"
	rows="1"
></textarea>
