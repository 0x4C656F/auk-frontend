<script lang="ts">
	type ButtonVariant = 'primary' | 'secondary' | 'ghost';
	type ButtonSize = 'sm' | 'md' | 'lg';
	type ButtonType = 'button' | 'submit' | 'reset' | null | undefined;
	export let type: ButtonType = 'button';
	export let variant: ButtonVariant = 'primary';
	export let disabled = false;
	export let size: ButtonSize = 'md';
	export let href: string | null | undefined = null;
</script>

{#if href}
	<a
		{href}
		class:sm={size == 'sm'}
		class:md={size == 'md'}
		class:lg={size == 'lg'}
		class:primary={variant == 'primary'}
		class:secondary={variant == 'secondary'}
		class:ghost={variant == 'ghost'}
		{...$$restProps}><slot>Click me</slot></a
	>
{:else}
	<button
		class:sm={size == 'sm'}
		class:md={size == 'md'}
		class:lg={size == 'lg'}
		class:primary={variant == 'primary'}
		class:secondary={variant == 'secondary'}
		class:ghost={variant == 'ghost'}
		{type}
		{disabled}
		on:click
		{...$$restProps}
		{...$$props}
	>
		<slot>Click me</slot>
	</button>
{/if}

<style lang="postcss">
	.hover-intensify {
		@apply opacity-90 hover:opacity-100 transition-opacity;
	}
	button,
	a {
		@apply focus:outline-none rounded-full hover-intensify font-sans-serif flex items-center justify-center gap-2;
	}
	.sm {
		@apply text-xs px-2 py-1 
               sm:text-sm sm:px-3 sm:py-1.5 
               md:text-sm md:px-3 md:py-2;
	}
	.md {
		@apply text-sm px-3 py-1.5 
               sm:text-base sm:px-4 sm:py-2 
               md:text-base md:px-5 md:py-2.5;
	}
	.lg {
		@apply text-base px-4 py-2 
               sm:text-lg sm:px-5 sm:py-2.5 
               md:text-xl md:px-6 md:py-3;
	}
	.primary {
		@apply text-text-light bg-primary;
	}
	.secondary {
		@apply text-primary bg-transparent;
	}
	.ghost {
		@apply bg-background bg-opacity-0 hover:bg-opacity-30 text-text;
	}
</style>
