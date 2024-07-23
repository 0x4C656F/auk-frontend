import type { PostWithAuthor } from '$root/lib/entities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }): Promise<{ posts: PostWithAuthor[] }> => {
	const res = await fetch('/posts');
	return { posts: await res.json() };
};
