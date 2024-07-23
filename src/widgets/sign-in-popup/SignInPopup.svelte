<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { clickOutside, updateFormData } from '$lib/helpers';
	import { Button } from '$shared/ui';
	import { quintOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import MaterialSymbolsLightClose from 'virtual:icons/material-symbols-light/close';
	import type { ActionData } from '../../routes/auth/$types';
	import { signUpPopupController } from '../sign-up-popup';
	import { signInPopupController } from './sign-in-popup-controller.svelte';

	function togglePopups() {
		signInPopupController.toggle();
		signUpPopupController.toggle();
	}
	let form: ActionData;

	$: {
		if (form?.success) {
			invalidateAll();
			signInPopupController.toggle();
		}
	}
</script>

{#if signInPopupController.isOpen}
	<div transition:fade={{ duration: 300 }} class="overlay">
		<div
			use:clickOutside
			on:click_outside={signInPopupController.toggle}
			transition:scale={{ duration: 500, opacity: 0, start: 0.4, easing: quintOut }}
			class="popup-container"
		>
			<button class="close-button" on:click={signInPopupController.toggle}>
				<MaterialSymbolsLightClose scale="2" color="black" class="w-full h-full" />
			</button>
			<h2 class=" text-5xl font-serif">Welcome back!</h2>
			<form
				method="POST"
				action="/auth?/login"
				use:enhance={({}) => {
					return async ({ result }) => {
						form = updateFormData(result);
					};
				}}
			>
				<section class="input-section">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" autocomplete="email" />
				</section>
				<section class="input-section">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" autocomplete="new-password" />
				</section>
				{#if form?.target === 'unknown'}
					<p>{form.message}</p>
				{/if}
				<Button type="submit" class=" mr-2 mt-2">Sign in</Button>
			</form>
			{#if form?.success}
				<div class="success-message-box">
					<h2>Welcome back!</h2>
					<p>You have successfully logged in.</p>
				</div>
			{/if}
			<article class="signin-text">
				Don't have an account yet? <button
					on:click={togglePopups}
					class="signin-link hover-intensify">Sign up</button
				>
			</article>
		</div>
	</div>
{/if}

<style lang="scss">
	.overlay {
		@apply fixed left-0 top-0 w-screen h-screen bg-opacity-90 z-50 bg-background flex items-center justify-center transition-all duration-300;
	}

	.popup-container {
		@apply h-screen w-1/2 rounded-lg z-50  flex items-center justify-center gap-20 flex-col bg-background font-sans-serif transition-all duration-300;
		box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
	}

	.close-button {
		@apply w-8 h-8 absolute top-4 right-4;
	}

	form {
		@apply flex flex-col gap-4 p-2 items-end;

		p {
			@apply text-red-500 text-right;
		}
	}

	.input-section {
		@apply flex flex-col gap-1;

		input {
			@apply p-2 bg-text/5 w-80 ring-0 hover:ring-0 rounded-md;
		}

		label {
			@apply ml-2 italic;
		}
	}
	.signin-text {
		@apply text-lg;

		button {
			@apply text-red-500;
		}
	}

	.success-message-box {
		@apply absolute right-8 bottom-8 z-50 border-2 space-y-2 rounded-md bg-text/5 p-4;

		h2 {
			@apply text-lg font-semibold;
		}

		p {
			@apply text-base font-light;
		}
	}
</style>
