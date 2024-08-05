<script lang="ts">
	import { clickOutside } from '$lib/helpers';
	import Icon from '@iconify/svelte';
	import { quintOut } from 'svelte/easing';
	import { blur, fade, scale } from 'svelte/transition';
	import MaterialSymbolsLightClose from 'virtual:icons/material-symbols-light/close';
	import type { ActionData } from '../../routes/auth/$types';
	import { signInPopupController } from '../sign-in-popup';
	import { signUpPopupController } from './sign-up-popup-controller.svelte';
	import StudentForm from './ui/StudentForm.svelte';
	import TeacherForm from './ui/TeacherForm.svelte';

	let stage: 'role' | 'student' | 'teacher' = 'role';

	function togglePopups() {
		signUpPopupController.toggle();
		signInPopupController.toggle();
	}

	const studentStage = () => {
		stage = 'student';
	};

	const teacherStage = () => {
		stage = 'teacher';
	};

	const roleStage = () => {
		stage = 'role';
	};

	let form: ActionData;
</script>

{#if signUpPopupController.isOpen}
	<div
		transition:fade={{ duration: 300 }}
		class="fixed inset-0 bg-opacity-90 z-50 bg-base-100 flex items-center justify-center"
	>
		<div
			use:clickOutside
			onclick_outside={signUpPopupController.toggle}
			transition:scale={{ duration: 500, opacity: 0, start: 0.4, easing: quintOut }}
			class="w-full lg:w-1/2 h-screen rounded-lg relative flex items-center justify-between py-20 flex-col p-8 bg-base-200 shadow-lg"
		>
			<div class="w-full absolute top-0 flex items-center justify-end">
				<button class="btn btn-circle btn-sm" onclick={signUpPopupController.toggle}>
					<MaterialSymbolsLightClose scale="2" color="black" class="w-full h-full" />
				</button>
			</div>

			<h2 class="text-5xl font-serif text-center">Join AUK Insider.</h2>
			{#if stage === 'student'}
				<div in:blur={{ duration: 500, delay: 50 }}>
					<button class="btn-ghost rounded-md mb-4" onclick={roleStage}
						><Icon icon="mdi:arrow-left" class="size-5" /></button
					>
					<StudentForm {form} />
				</div>
			{:else if stage === 'role'}
				<div in:blur={{ duration: 500, delay: 50 }} class="flex flex-col gap-8 items-center">
					<h3 class="text-2xl font-semibold">Who are You?</h3>
					<div class="flex gap-4">
						<button
							onclick={studentStage}
							class="btn btn-outline rounded-btn btn-square btn-lg size-40"
						>
							<Icon icon="mdi:account-student" />Student
						</button>
						<button
							onclick={teacherStage}
							class="btn btn-outline rounded-btn btn-square btn-lg size-40"
							><Icon icon="mdi:teacher" /> Teacher
						</button>
					</div>
				</div>
			{:else if stage === 'teacher'}
				<div in:blur={{ duration: 500, delay: 50 }}>
					<button class="btn-ghost rounded-md mb-4" onclick={roleStage}
						><Icon icon="mdi:arrow-left" class="size-5" /></button
					>
					<TeacherForm {form} />
				</div>
			{/if}

			<article class="text-lg">
				Already have an account? <button
					onclick={togglePopups}
					class="link link-hover text-secondary">Sign in</button
				>
			</article>
		</div>
	</div>
{/if}
