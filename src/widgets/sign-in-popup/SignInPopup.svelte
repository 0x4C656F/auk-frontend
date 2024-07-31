<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { clickOutside, updateFormData } from '$lib/helpers';
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
			signUpPopupController.toggle();
			goto('/read');
		}
	}
</script>

{#if signInPopupController.isOpen}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed inset-0 bg-opacity-90 z-50 bg-base-100 flex items-center justify-center"
	>
		<div
			use:clickOutside
			onclick_outside={signInPopupController.toggle}
			transition:scale={{ duration: 500, opacity: 0, start: 0.4, easing: quintOut }}
			class="w-full lg:w-1/2 rounded-lg relative flex items-center justify-center gap-20 flex-col p-8 bg-base-200 shadow-lg"
		>
			<div class="w-full absolute top-0 flex items-center justify-end">
				<button class="btn btn-circle btn-sm" onclick={signInPopupController.toggle}>
					<MaterialSymbolsLightClose scale="2" color="black" class="w-full h-full" />
				</button>
			</div>
			<h2 class="text-5xl font-serif">Welcome back!</h2>
			<form
				method="POST"
				action="/auth?/login"
				use:enhance={({}) => {
					return async ({ result }) => {
						form = updateFormData(result);
					};
				}}
				class="w-full flex flex-col gap-4 items-center"
			>
				<section class="form-control w-full max-w-xs">
					<label for="email" class="label">
						<span class="label-text">Email</span>
					</label>
					<input
						type="email"
						name="email"
						id="email"
						autocomplete="email"
						class="input input-bordered w-full max-w-xs"
					/>
				</section>
				<section class="form-control w-full max-w-xs">
					<label for="password" class="label">
						<span class="label-text">Password</span>
					</label>
					<input
						type="password"
						name="password"
						id="password"
						autocomplete="new-password"
						class="input input-bordered w-full max-w-xs"
					/>
				</section>
				{#if form?.target === 'unknown'}
					<p class="text-error">{form.message}</p>
				{/if}
				<button type="submit" class="btn btn-primary w-full max-w-xs mt-2">Sign in</button>
			</form>
			{#if form?.success}
				<div class="absolute right-8 bottom-8 z-50 border-2 space-y-2 rounded-md bg-base-300 p-4">
					<h2 class="text-lg font-semibold">Welcome back!</h2>
					<p class="text-base font-light">You have successfully logged in.</p>
				</div>
			{/if}
			<article class="text-lg">
				Don't have an account yet? <button
					onclick={togglePopups}
					class="link link-hover text-secondary">Sign up</button
				>
			</article>
		</div>
	</div>
{/if}
