<script lang="ts">
	import { Role } from '$root/lib/entities';
	import { getInitials } from '$root/lib/helpers';
	import Post from '$root/routes/read/ui/Post.svelte';
	import { AukInsiderLogo } from '$shared/ui';
	import Icon from '@iconify/svelte';
	import BioEditForm from '../ui/BioEditForm.svelte';
	import type { PageData } from './$types';
	import ProfilePicEditForm from './ui/ProfilePicEditForm.svelte';

	export let data: PageData;

	let isEditBioOpen = false;

	// Random background color generator
	function getRandomColor(): string {
		const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
		return colors[Math.floor(Math.random() * colors.length)];
	}
</script>

<div class="bg-base-200 h-fit rounded-b-lg">
	<header class="bg-base-100 shadow-md p-4">
		<div class="container mx-auto flex justify-between items-center">
			<AukInsiderLogo />
			<a href="/read" class="btn btn-secondary btn-ghost">
				<Icon icon="mdi:arrow-left" class="mr-2" />
				Back
			</a>
		</div>
	</header>

	<main class="container mx-auto py-8 px-4">
		<div class="bg-base-100 rounded-lg shadow-lg p-8">
			<div class="flex flex-col md:flex-row gap-8">
				<section class="md:w-1/3">
					<div class="flex flex-col items-center">
						<div class="w-fit relative mb-4">
							<div class="right-0 bottom-0 absolute z-10">
								{#if data.user?.id === data.viewedUser.id}
									<ProfilePicEditForm userId={data.user.id} />
								{/if}
							</div>
							{#if data.viewedUser.avatar}
								<img
									src={data.viewedUser.avatar}
									alt={data.viewedUser.fullname}
									class="w-48 h-48 rounded-full object-cover mb-4"
								/>
							{:else}
								<div
									class={`w-48 h-48 rounded-full flex items-center justify-center text-4xl font-bold text-white ${getRandomColor()} mb-4`}
								>
									{getInitials(data.viewedUser.fullname)}
								</div>
							{/if}
						</div>
						<h2 class="text-3xl font-semibold text-base-content mb-2">
							{data.viewedUser.fullname}
						</h2>
						<p class="text-lg text-base-content mb-4">@{data.viewedUser.name}</p>
						<div class="flex items-center text-base-content mb-4">
							<Icon icon="mdi:account-group" class="mr-2" />
							<span>{data.viewedUser.followerIds.length} followers</span>
						</div>
						{#if data.viewedUser.bio}
							<p class="text-base-content text-left italic max-w-80 mb-4">
								"{data.viewedUser.bio}"
							</p>
						{/if}
						<div class="flex gap-4">
							{#if data.user?.id !== data.viewedUser.id}
								<a href="/" class="btn btn-primary">
									<Icon icon="mdi:account-plus" class="mr-2" />
									Follow
								</a>
							{:else}
								<button class="btn btn-primary btn-md" on:click={() => (isEditBioOpen = true)}>
									<Icon icon="mdi:account-edit" class="mr-2" />
									Edit profile
								</button>
							{/if}
						</div>
					</div>
				</section>

				<section class="md:w-2/3 min-w-80">
					<h3 class="text-2xl font-semibold text-base-content mb-6">
						{data.viewedUser.name}'s posts
					</h3>
					{#if data.posts.length > 0}
						<div class="space-y-6">
							{#each data.posts as post (post.id)}
								<Post {post} canPin={data.user?.role !== Role.STUDENT} />
							{/each}
						</div>
					{:else}
						<p class="text-base-content">No posts available.</p>
					{/if}
				</section>
			</div>
		</div>
	</main>
</div>

<BioEditForm
	userId={data.viewedUser.id}
	currentBio={data.viewedUser.bio || ''}
	bind:isOpen={isEditBioOpen}
/>
