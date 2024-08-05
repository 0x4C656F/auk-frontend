import type { Post, PostWithAuthor } from '$root/lib/entities';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({
	params,
	fetch
}: PageServerLoadEvent): Promise<{ post: Post }> => {
	const postId = params.postId;
	const res = await fetch('/posts/' + postId);
	const post: PostWithAuthor = await res.json();
	return { post };
};

export const actions: Actions = {
	save: async ({ fetch, request, params }) => {
		const data = await request.formData();

		const heading = data.get('heading')?.toString();
		const subheading = data.get('subheading')?.toString();
		const content = data.get('content')?.toString();
		let tags = data
			.get('tags')
			?.toString()
			.split(',')
			.map((tag) => tag.trim());

		let relatedPrograms = data
			.get('programs')
			?.toString()
			.split(',')
			.map((program) => program.trim());
		console.log(relatedPrograms);
		if (relatedPrograms && relatedPrograms[0] === '') {
			relatedPrograms = [];
		}
		if (tags && tags[0] === '') {
			tags = [];
		}
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
			content,
			tags,
			relatedPrograms
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
			const response = await fetch('/posts/publish/' + +params.postId, {
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
	},
	pin: async ({ fetch, params, request }) => {
		if (params.postId === undefined) {
			return fail(406, {
				message: 'Post ID must be present',
				success: false
			});
		}
		try {
			const formdata = await request.formData();

			const unpinAt = new Date(formdata.get('unpinAt')?.toString() as string).toISOString();

			const response = await fetch('/posts/pin/' + +params.postId, {
				method: 'PATCH',
				body: JSON.stringify({ unpinAt })
			});

			if (response.ok) {
				return {
					message: 'Post pinned',
					success: true,
					action: 'pin'
				};
			}
		} catch {
			return fail(500, {
				message: 'Unknown error',
				success: false
			});
		}
	},
	unpin: async ({ fetch, params }) => {
		if (params.postId === undefined) {
			return fail(406, {
				message: 'Post ID must be present',
				success: false
			});
		}
		try {
			const response = await fetch('/posts/unpin/' + +params.postId, {
				method: 'PATCH'
			});

			if (response.ok) {
				return {
					message: 'Post unpinned',
					action: 'unpin',
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
	mock: () => {}
};
