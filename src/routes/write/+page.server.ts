import type { Post } from '$root/lib/entities';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ fetch }) => {
		const res = await fetch('/posts', {
			method: 'POST'
		});

		const createdPost: Post = await res.json();
		redirect(302, `/write/${createdPost.id}`);
	}
} satisfies Actions;
