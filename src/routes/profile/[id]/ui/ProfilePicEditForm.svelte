<script lang="ts">
	import { clickOutside } from '$root/lib/helpers';
	import UploadAvatarForm from '$root/widgets/upload-avatar-form/UploadAvatarForm.svelte';
	import Icon from '@iconify/svelte';
	const { userId }: { userId: number } = $props();
	let isOpen = $state(false);
	const togglePopup = () => {
		isOpen = !isOpen;
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	};
</script>

{#if isOpen}
	<div
		class="w-screen h-screen bg-black/50 z-50 pointer-events-none fixed left-0 top-0 flex items-center justify-center"
	>
		<div
			onclick_outside={togglePopup}
			use:clickOutside
			class=" bg-accent pointer-events-auto rounded-lg p-4 relative"
		>
			<button onclick={togglePopup} class="btn btn-square btn-ghost btn-xs top-2 right-2 absolute"
				><Icon icon="mdi:close" class="size-4"></Icon></button
			>
			<UploadAvatarForm {userId} />
		</div>
	</div>
{/if}
<button onclick={togglePopup} class="btn btn-square btn-ghost btn-sm rounded-full"
	><Icon icon="mdi:edit" class="size-4 "></Icon></button
>
