import type { User } from '$root/lib/entities';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/users/me');
		const user: User = await response.json();

		if (user.id) {
			return { user };
		}
	} catch (error) {
		console.error('Error during token refresh:', error);
	}
};
