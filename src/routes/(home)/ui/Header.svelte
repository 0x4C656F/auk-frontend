<script lang="ts">
	import { signInPopupController } from '$root/widgets/sign-in-popup';
	import { signUpPopupController } from '$root/widgets/sign-up-popup';
	import { Button } from '$shared/ui';
	import AukInsiderLogo from '$shared/ui/AukInsiderLogo.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<header class="header">
	<AukInsiderLogo />
	{#if !data.user}
		<section class="flex gap-8 2xl:text-scalable-lg text-lg">
			<button onclick={signInPopupController.toggle}>Sign in</button>
			<button
				onclick={signUpPopupController.toggle}
				class="rounded-full bg-primary py-2 px-6 hover-intensify text-background"
				>Get started</button
			>
		</section>
	{:else}
		<Button href="/read">Read</Button>
	{/if}
</header>
