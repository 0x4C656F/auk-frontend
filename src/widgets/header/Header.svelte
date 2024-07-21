<script lang="ts">
	import type { LayoutData } from '../../routes/$types';
	import { signInPopupController } from '../sign-in-popup';
	import { signUpPopupController } from '../sign-up-popup';

	export let ldata: LayoutData;
</script>

<header class=" h-20 fixed flex z-20 font-sans-serif items-center w-screen max-w-screen-xl px-16">
	<nav class="flex justify-between items-center w-full">
		<section>
			<h2 class="2xl:text-scalable-xl text-3xl font-serif">AUK Insider</h2>
		</section>
		{#if !ldata.name}
			<section class="flex gap-8 2xl:text-scalable-lg text-lg">
				<button onclick={signInPopupController.toggle}>Sign in</button>
				<button
					onclick={signUpPopupController.toggle}
					class="rounded-full bg-primary py-2 px-6 hover-intensify text-background"
					>Get started</button
				>
			</section>
		{:else}
			<p class="2xl:text-scalable-lg text-xl font-sans-serif">
				Hello, {ldata.name}
			</p>
		{/if}
	</nav>
</header>
