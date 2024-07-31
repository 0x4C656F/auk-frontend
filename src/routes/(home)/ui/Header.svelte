<script lang="ts">
	import { signInPopupController } from '$root/widgets/sign-in-popup';
	import { signUpPopupController } from '$root/widgets/sign-up-popup';
	import AukInsiderLogo from '$shared/ui/AukInsiderLogo.svelte';
	import ProfileLink from '$shared/ui/ProfileLink.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<header class="header bg-base-100 px-4 py-2">
	<div class="flex-1">
		<AukInsiderLogo />
	</div>
	<div class="flex-none">
		{#if !data.user}
			<div class="flex items-center gap-4">
				<button class="btn btn-ghost" on:click={signInPopupController.toggle}>Sign in</button>
				<button class="btn btn-primary" on:click={signUpPopupController.toggle}>
					Get started
				</button>
			</div>
		{:else}
			<div class="flex items-center gap-4">
				<a href="/read" class="btn btn-secondary">To posts</a>
				<ProfileLink user={data?.user} />
			</div>
		{/if}
	</div>
</header>
