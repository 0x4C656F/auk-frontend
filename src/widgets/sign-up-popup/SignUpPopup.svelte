<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { isOpen, closePopup } from './sign-up-popup-controller';
	import MaterialSymbolsLightClose from 'virtual:icons/material-symbols-light/close';
	import { quintOut } from 'svelte/easing';
	import { clickOutside } from '$lib/helpers';
	import { Button } from '$shared/ui';
	import type { ActionData } from '../../routes/(home)/$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

{#if $isOpen}
	<div transition:fade={{ duration: 300 }} class="overlay">
		<div
			use:clickOutside
			on:click_outside={closePopup}
			transition:scale={{ duration: 500, opacity: 0, start: 0.4, easing: quintOut }}
			class="popup-container"
		>
			<button class="close-button" on:click={closePopup}>
				<MaterialSymbolsLightClose scale="2" color="black" class="icon" />
			</button>
			<h2 class="header">Join AUK-NEWS.</h2>
			<form method="POST" action="/" use:enhance>
				<section class="input-section">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" />
					{#if form?.target === 'email'}
						<p>{form.message}</p>
					{/if}
				</section>
				<section class="input-section">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" />
					{#if form?.target === 'password'}
						<p>{form.message}</p>
					{/if}
				</section>
				<Button type="submit" class="submit-button">Sign up</Button>
				{#if form?.target === 'unknown'}
					<p>{form.message}</p>
				{/if}
			</form>
			<p class="signin-text">
				Already have an account? <a href="/" class="signin-link hover-intensify">Sign in</a>
			</p>
		</div>
		{#if form?.success}
			<div class="success-message-box">
				<h2>Welcome, {form.name}!</h2>
				<p>You have successfully signed up.</p>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.overlay {
		@apply fixed left-0 top-0 w-screen h-screen bg-opacity-90 z-50 bg-background flex items-center justify-center transition-all duration-300;
	}

	.popup-container {
		@apply h-screen w-1/2 rounded-lg z-50 relative flex items-center justify-center gap-20 flex-col side-shadow font-sans-serif transition-all duration-300;
	}

	.close-button {
		@apply w-8 h-8 absolute top-4 right-4;
	}

	.icon {
		@apply w-full h-full;
	}

	.header {
		@apply text-5xl font-serif;
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

	.submit-button {
		@apply mr-2 mt-2;
	}

	.signin-text {
		@apply text-lg;

		a {
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

	.side-shadow {
		box-shadow: 0px 0px 20px -10px rgba(0, 0, 0, 0.75);
	}
</style>
