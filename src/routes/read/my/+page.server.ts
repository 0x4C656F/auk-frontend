import type { Post } from '$root/lib/entities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }): Promise<{ posts: Post[] }> => {
	const res = await fetch('/posts/my');
	return { posts: await res.json() };
};
