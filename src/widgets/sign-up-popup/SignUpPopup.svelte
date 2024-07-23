<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { clickOutside, updateFormData } from '$lib/helpers';
	import { Button } from '$shared/ui';
	import { quintOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import MaterialSymbolsLightClose from 'virtual:icons/material-symbols-light/close';
	import type { ActionData } from '../../routes/auth/$types';
	import { signInPopupController } from '../sign-in-popup';
	import { signUpPopupController } from './sign-up-popup-controller.svelte';

	function togglePopups() {
		signUpPopupController.toggle();
		signInPopupController.toggle();
	}

	let form: ActionData;

	$: {
		console.table(form);
		if (form?.success) {
			signUpPopupController.toggle();

			invalidateAll();
		}
	}
</script>

{#if signUpPopupController.isOpen}
	<div transition:fade={{ duration: 300 }} class="overlay">
		<div
			use:clickOutside
			on:click_outside={signUpPopupController.toggle}
			transition:scale={{ duration: 500, opacity: 0, start: 0.4, easing: quintOut }}
			class="popup-container"
		>
			<button class="close-button" on:click={signUpPopupController.toggle}>
				<MaterialSymbolsLightClose scale="2" color="black" class="w-full h-full" />
			</button>
			<h2 class="text-5xl font-serif">Join AUK-NEWS.</h2>
			<form
				method="POST"
				action="/auth?/register"
				use:enhance={({}) => {
					return async ({ result }) => {
						form = updateFormData(result);
					};
				}}
			>
				<section class="input-section">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" autocomplete="email" />
					{#if form?.target === 'email'}
						<p>{form.message}</p>
					{/if}
				</section>
				<section class="input-section">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" autocomplete="new-password" />
					{#if form?.target === 'password'}
						<p>{form.message}</p>
					{/if}
				</section>
				<Button type="submit" class=" mr-2 mt-2">Sign up</Button>
				{#if form?.target === 'unknown'}
					<p>{form.message}</p>
				{/if}
			</form>
			<article class="signin-text">
				Already have an account? <button on:click={togglePopups} class="signin-link hover-intensify"
					>Sign in</button
				>
			</article>
		</div>
		{#if form?.success}
			<div class="success-message-box">
				<h2>Welcome, {form.name}!</h2>
				<p>You have successfully signed up.</p>
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.overlay {
		@apply fixed left-0 top-0 w-screen h-screen bg-opacity-90 z-50 bg-background flex items-center justify-center transition-all duration-300;
	}

	.popup-container {
		@apply h-screen w-1/2 rounded-lg  relative flex items-center justify-center gap-20 flex-col font-sans-serif transition-all duration-300 bg-background;
		box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
	}

	.close-button {
		@apply w-8 h-8 absolute top-4 right-4;
	}

	form {
		@apply flex flex-col gap-4 p-2 items-end;
	}

	form p {
		@apply text-red-500 text-right;
	}

	.input-section {
		@apply flex flex-col gap-1;
	}

	.input-section input {
		@apply p-2 bg-text/5 w-80 ring-0 hover:ring-0 rounded-md;
	}

	.input-section label {
		@apply ml-2 italic;
	}

	.signin-text {
		@apply text-lg;
	}

	.signin-text button {
		@apply text-red-500;
	}

	.success-message-box {
		@apply absolute right-8 bottom-8 z-50 border-2 space-y-2 rounded-md bg-text/5 p-4;
	}

	.success-message-box h2 {
		@apply text-lg font-semibold;
	}

	.success-message-box p {
		@apply text-base font-light;
	}
</style>
