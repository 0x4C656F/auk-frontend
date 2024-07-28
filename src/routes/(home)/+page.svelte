<script lang="ts">
	import logo from '$lib/assets/auk.webp';
	import SignInPopup from '$root/widgets/sign-in-popup';
	import SignUpPopup, { signUpPopupController } from '$root/widgets/sign-up-popup';
	import Button from '$shared/ui/Button.svelte';
	import type { LayoutData } from '../$types';
	import Footer from './ui/Footer.svelte';
	import Header from './ui/Header.svelte';
	export let data: LayoutData;
</script>

<SignUpPopup />
<SignInPopup />
<Header {data} />
<main
	class="w-screen h-screen flex flex-col items-center justify-center max-w-screen-xl px-6 xl:px-16"
>
	<section class="flex w-full justify-between items-center">
		<article class="flex-col flex gap-6 xl:gap-12">
			<h1 class=" 2xl:text-7xl xl:text-6xl md:text-5xl text-4xl font-serif font-semibold">
				<span class="2xl:text-8xl xl:text-7xl md:text-6xl text-5xl">N</span>ews, stories & campus
				events
			</h1>
			<h2 class="xl:text-2xl lg:text-xl md:text-lg text-base font-serif">
				Your Hub for Insight and Inspiration
			</h2>
			{#if data.user}
				<Button href="/read" class="w-fit px-8" size="lg">Start reading</Button>
			{:else}
				<Button on:click={signUpPopupController.toggle} class="w-fit px-8" size="lg"
					>Get started</Button
				>
			{/if}
		</article>
		<img class="max-md:hidden max-lg:w-1/2" alt="The AUK logo" src={logo} />
	</section>
	<Footer />
</main>

<style lang="postcss">
	footer a {
		@apply text-text/70 hover:underline transition-colors duration-300;
	}
	footer {
		@apply max-md:hidden;
	}
</style>
