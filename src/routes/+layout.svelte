<script lang="ts">
	import Header from '$root/widgets/header/Header.svelte';
	import '../app.css';
	import SignInPopup from '../widgets/sign-in-popup';
	import SignUpPopup from '../widgets/sign-up-popup';
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData } = $props();
</script>

<div class="flex flex-col items-center">
	<SignUpPopup />
	<SignInPopup />
	<Header ldata={data} />
	<slot />
</div>
