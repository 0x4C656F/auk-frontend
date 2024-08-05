<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { updateFormData } from '$root/lib/helpers';
	import type { ActionData } from '../../../routes/auth/$types';
	import { signUpPopupController } from '../sign-up-popup-controller.svelte';
	export let form: ActionData;
	$: {
		if (form?.success) {
			signUpPopupController.toggle();
			goto('/read');
		}
	}
</script>

<form
	method="POST"
	action="/auth?/register-teacher"
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
		{#if form?.target === 'email'}
			<p class="text-error">{form.message}</p>
		{/if}
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
		{#if form?.target === 'password'}
			<p class="text-error">{form.message}</p>
		{/if}
	</section>
	<button type="submit" class="btn btn-primary w-full max-w-xs mt-2">Sign up</button>
	{#if form?.target === 'unknown'}
		<p class="text-error">{form.message}</p>
	{/if}
</form>
