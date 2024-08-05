<script lang="ts">
	import { enumToString, programIterator, programs, type Program } from '$root/lib/entities';
	import Icon from '@iconify/svelte';

	export let selectedPrograms: Program[] = [];
	let allSelected = false;

	function toggleProgram(program: Program) {
		if (selectedPrograms.includes(program)) {
			selectedPrograms = selectedPrograms.filter((p) => p !== program);
		} else {
			selectedPrograms = [...selectedPrograms, program];
		}
		updateAllSelectedState();
	}

	function toggleAllPrograms() {
		if (allSelected) {
			selectedPrograms = [];
		} else {
			selectedPrograms = [...programs];
		}
		allSelected = !allSelected;
	}

	function updateAllSelectedState() {
		allSelected = selectedPrograms.length === programs.length;
	}

	$: {
		selectedPrograms;
		updateAllSelectedState();
	}
</script>

<div class="flex flex-col gap-4 mt-4 max-w-md h-fit">
	<h3 class="text-lg font-semibold flex gap-2 items-center">
		<Icon icon="mdi:school" class="text-xl" />
		<p>Related programs</p>
	</h3>
	<div class="flex gap-2 mb-2">
		<button type="button" class="btn btn-sm btn-outline" onclick={toggleAllPrograms}>
			{allSelected ? 'Deselect All' : 'Select All'}
		</button>
	</div>
	<section class="flex flex-wrap gap-2">
		{#each programIterator() as program}
			<button
				type="button"
				class:btn-primary={selectedPrograms.includes(program)}
				class={'btn btn-sm'}
				onclick={() => toggleProgram(program)}
			>
				{enumToString(program)}
			</button>
		{/each}
	</section>
</div>
