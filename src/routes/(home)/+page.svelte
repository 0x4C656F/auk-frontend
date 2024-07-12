<script lang="ts">
	import SignUpPopup, { openPopup } from '$root/widgets/sign-up-popup';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<main class="w-screen h-screen flex flex-col items-center">
	<SignUpPopup {form} />
	<header class=" h-20 w-full flex z-20 font-sans-serif items-center max-w-screen-2xl px-8 2xl:p-0">
		<nav class="flex justify-between items-center w-full">
			<section>
				<h2 class="2xl:text-scalable-xl text-3xl">AUK-NEWS</h2>
			</section>
			<section class="flex gap-8 2xl:text-scalable-lg text-lg">
				<button>Sign in</button>
				<button
					on:click={openPopup}
					class="rounded-full bg-primary py-2 px-6 hover-intensify text-background"
					>Get started</button
				>
			</section>
		</nav>
	</header>
</main>
