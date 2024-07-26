import type { PostWithAuthor } from '$root/lib/entities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }): Promise<{ posts: PostWithAuthor[] }> => {
	const res = await fetch('/posts');
	const posts: PostWithAuthor[] = await res.json();
	const sortedPosts = posts.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);
	return { posts: sortedPosts };
};
