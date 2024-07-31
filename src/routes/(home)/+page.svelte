<script lang="ts">
	import logo from '$lib/assets/auk.webp';
	import SignInPopup from '$root/widgets/sign-in-popup';
	import SignUpPopup, { signUpPopupController } from '$root/widgets/sign-up-popup';
	import type { LayoutData } from '../$types';
	import Footer from './ui/Footer.svelte';
	import Header from './ui/Header.svelte';
	export let data: LayoutData;
</script>

<SignUpPopup />
<SignInPopup />
<Header {data} />
<main class="container max-w-screen-xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
	<section class="flex flex-col md:flex-row justify-between items-center">
		<article class="flex flex-col gap-6 md:w-1/2">
			<h1 class="font-serif font-bold text-4xl md:text-5xl lg:text-6xl">
				<span class="text-5xl md:text-6xl lg:text-7xl">N</span>ews, stories & campus events
			</h1>
			<h2 class="font-serif text-base md:text-lg lg:text-xl">
				Your Hub for Insight and Inspiration
			</h2>
			{#if data.user}
				<a href="/read" class="btn btn-primary w-fit">Start reading</a>
			{:else}
				<button on:click={signUpPopupController.toggle} class="btn btn-primary btn-md w-fit"
					>Get started</button
				>
			{/if}
		</article>
		<img class="hidden md:block md:w-1/2 lg:w-auto" alt="The AUK logo" src={logo} />
	</section>
	<Footer />
</main>
