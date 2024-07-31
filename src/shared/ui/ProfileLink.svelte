<script lang="ts">
	import type { User } from '$root/lib/entities';
	import { getInitials } from '$root/lib/helpers';

	export let user: User;
</script>

<a
	href={`/profile/${user.id}`}
	class="btn btn-circle border-secondary transition-colors hover:bg-secondary"
>
	{#if user.avatar}
		<img src={user.avatar} alt={user.name} class="rounded-full" />
	{:else}
		<span class="text-base-content">{getInitials(user.fullname)}</span>
	{/if}
</a>
