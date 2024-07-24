import type { PostWithAuthor } from '$root/lib/entities';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	params,
	fetch
}): Promise<{ post: PostWithAuthor }> => {
	const response = await fetch(`/posts/${params.id}`);
	const post = await response.json();

	return { post };
};
