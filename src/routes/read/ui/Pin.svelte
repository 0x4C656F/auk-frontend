<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Post } from '$root/lib/entities';
	import { clickOutside } from '$root/lib/helpers';
	import Icon from '@iconify/svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	const { post }: { post: Post } = $props();

	let showOptions = $state(false);
	let unpinAt: Date = $state(new Date());
	let formElem: HTMLFormElement;
	let hovering = $state(false);

	const durations = [
		{ label: '30min', value: 30 * 60 * 1000 },
		{ label: '1h', value: 60 * 60 * 1000 },
		{ label: '12h', value: 12 * 60 * 60 * 1000 },
		{ label: '24h', value: 24 * 60 * 60 * 1000 },
		{ label: '7 days', value: 7 * 24 * 60 * 60 * 1000 },
		{ label: '1 month', value: 30 * 24 * 60 * 60 * 1000 },
		{ label: '1 year', value: 365 * 24 * 60 * 60 * 1000 }
	];

	function setDuration(durationMs: number) {
		unpinAt = new Date(Date.now() + durationMs);
		showOptions = false;
		setTimeout(() => formElem.requestSubmit(), 300);
	}
</script>

<form
	bind:this={formElem}
	use:enhance
	method="POST"
	action={post.pin ? `/write/${post.id}?/unpin` : `/write/${post.id}?/pin`}
	class="relative inline-block h-fit overflow-visible"
>
	<input type="hidden" name="unpinAt" bind:value={unpinAt} />
	<button
		onmouseenter={() => (hovering = true)}
		onmouseleave={() => (hovering = false)}
		onclick={() => (post.pin ? formElem.requestSubmit() : (showOptions = !showOptions))}
		type="button"
		class=" text-base-content focus:outline-none flex items-center p-1 h-8 relative"
	>
		<div class="transition-transform duration-300 ease-out" class:translate-x-[-8px]={hovering}>
			<Icon icon={post.pin ? 'mdi:pin' : 'mdi:pin-outline'} class="w-5 h-5" />
		</div>
		<div
			class="absolute left-6 transition-all duration-300 ease-out whitespace-nowrap"
			class:not-hovering={!hovering}
			class:hovering
		>
			{post.pin ? 'Unpin' : 'Pin'}
		</div>
	</button>
	{#if showOptions}
		<div
			use:clickOutside
			onclick_outside={() => (showOptions = false)}
			transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
			class="absolute z-10 mt-2 bg-base-200 border border-base-300 rounded-md shadow-lg p-2 w-32"
		>
			{#each durations as duration}
				<button
					onclick={() => setDuration(duration.value)}
					class="block w-full text-left px-2 py-1 text-sm transition-colors hover:bg-base-300 rounded"
				>
					{duration.label}
				</button>
			{/each}
		</div>
	{/if}
</form>

<style lang="postcss">
	.not-hovering {
		@apply opacity-0 translate-x-[-10px] max-w-0;
	}
	.hovering {
		@apply opacity-100 translate-x-0 max-w-[80px];
	}
</style>
