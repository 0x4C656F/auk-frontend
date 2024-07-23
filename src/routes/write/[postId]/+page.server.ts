import type { Post } from '$root/lib/entities';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({
	params,
	fetch
}: PageServerLoadEvent): Promise<Post> => {
	const postId = params.postId;
	const res = await fetch('/posts/' + postId);
	return res.json();
};

export const actions: Actions = {
	save: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const heading = data.get('heading')?.toString();
		const subheading = data.get('subheading')?.toString();
		const content = data.get('content')?.toString();

		if (!heading || !subheading || !content) {
			return fail(406, {
				message: 'All fields must be present',
				success: false
			});
		}
		if (params.postId === undefined) {
			return fail(406, {
				message: 'Post ID must be present',
				success: false
			});
		}
		const dto = {
			heading,
			subheading,
			content
		};
		try {
			const response = await fetch('/posts/' + +params.postId, {
				method: 'PATCH',
				body: JSON.stringify(dto)
			});

			if (response.ok) {
				return {
					message: 'Post created',
					success: true
				};
			}
		} catch {
			return fail(500, {
				message: 'Unknown error',
				success: false
			});
		}
	},
	publish: async ({ fetch, params }) => {
		if (params.postId === undefined) {
			return fail(406, {
				message: 'Post ID must be present',
				success: false
			});
		}
		try {
			const response = await fetch('/posts/' + +params.postId + '/publish', {
				method: 'PATCH'
			});

			if (response.ok) {
				return {
					message: 'Post published',
					success: true
				};
			}
		} catch {
			return fail(500, {
				message: 'Unknown error',
				success: false
			});
		}
	}
};
