import type { PostWithAuthor, User } from '$root/lib/entities';
import { fail } from '@sveltejs/kit';
import { config } from 'dotenv';
import nodeFetch from 'node-fetch';
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async ({
	fetch,
	params
}): Promise<{ viewedUser: User; posts: PostWithAuthor[] }> => {
	const id = +params.id;
	const userRequest = await fetch(`/users/${id}`);
	const postsRequests = await fetch(`/posts/author/${id}`);

	const user: User = await userRequest.json();
	const posts: PostWithAuthor[] = await postsRequests.json();
	return { posts, viewedUser: user };
};

export const actions: Actions = {
	updateBio: async ({ request, fetch }) => {
		const formData = await request.formData();
		const bio = formData.get('bio') as string;

		try {
			// await updateUserBio(locals.user.id, bio);
			await fetch('/users/bio', {
				method: 'PATCH',
				body: JSON.stringify({ bio })
			});
			return { success: true };
		} catch (error) {
			console.error('Error updating bio:', error);
			return { error: 'Failed to update bio. Please try again.' };
		}
	},
	avatar: async ({ request, cookies }) => {
		try {
			const formData = await request.formData();
			const image = formData.get('image') as File;

			if (!image) {
				return fail(400, { error: 'No image provided' });
			}

			const body = new FormData();
			body.append('image', image);
			config();
			const response = await nodeFetch(`${process.env.BACKEND_URL}/images/upload`, {
				method: 'POST',
				body,
				headers: {
					Authorization: `Bearer ${cookies.get('_at')}`
				}
			});

			if (!response.ok) {
				console.error('Failed to upload image:', response.status, await response.text());
				return fail(response.status, { error: 'Failed to upload image' });
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			return fail(500, { error: 'Internal server error' });
		}
	},
	follow: async ({ fetch, params }) => {
		const id = +params.id;
		try {
			await fetch(`/users/follow/${id}`, { method: 'POST' });
			return { success: true };
		} catch (error) {
			console.error('Error following user:', error);
			return { error: 'Failed to follow user. Please try again.' };
		}
	}
};
