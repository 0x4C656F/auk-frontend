<script lang="ts">
	import logo from '$lib/assets/auk.webp';
	import SignInPopup from '$root/widgets/sign-in-popup';
	import SignUpPopup from '$root/widgets/sign-up-popup';
	import Button from '$shared/ui/Button.svelte';
	import type { LayoutData } from '../$types';
	import Footer from './ui/Footer.svelte';
	import Header from './ui/Header.svelte';
	export let data: LayoutData;
</script>

<SignUpPopup />
<SignInPopup />
<Header {data} />
<main class="w-screen h-screen flex flex-col items-center justify-center max-w-screen-xl px-16">
	<section class="flex w-full justify-between items-center">
		<article class="flex-col flex gap-12">
			<h1 class=" 2xl:text-7xl font-serif font-semibold">
				<span class="text-8xl">N</span>ews, stories & campus events
			</h1>
			<h2 class="xl:text-2xl lg:text-xl md:text-lg text-base font-serif">
				Your Hub for Insight and Inspiration
			</h2>
			<Button href="/read" class="w-fit px-8" size="lg">Start reading</Button>
		</article>
		<img alt="The AUK logo" src={logo} />
	</section>
	<Footer />
</main>

<style lang="postcss">
	footer a {
		@apply text-text/70 hover:underline transition-colors duration-300;
	}
</style>
