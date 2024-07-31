import type { PostWithAuthor, User } from '$root/lib/entities';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	fetch,
	params
}): Promise<{ viewedUser: User; posts: PostWithAuthor[] }> => {
	console.log('fetching load');
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
			console.log('Updating bio:', bio);
			await fetch('/users/bio', {
				method: 'PATCH',
				body: JSON.stringify({ bio })
			});
			return { success: true };
		} catch (error) {
			console.error('Error updating bio:', error);
			return { error: 'Failed to update bio. Please try again.' };
		}
	}
};
