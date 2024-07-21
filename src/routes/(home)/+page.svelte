<script lang="ts">
	import logo from '$lib/assets/auk.webp';
	import Button from '$shared/ui/Button.svelte';
</script>

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
	<footer class="fixed bottom-0 flex p-8 justify-center gap-8 w-full">
		<a href="/">Help</a>
		<a href="/">Status</a>
		<a href="/">About</a>
		<a href="/">Careers</a>
		<a href="/">Press</a>
		<a href="/">Blog</a>
		<a href="/">Privacy</a>
		<a href="/">Terms</a>
		<a href="/">Teams</a>
	</footer>
</main>

<style lang="postcss">
	footer a {
		@apply text-text/70 hover:underline transition-colors duration-300;
	}
</style>
