import type { User } from '$root/lib/entities';
import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ fetch }) => {
	const response = await fetch('/users/me');
	const user: User = await response.json();
	return { user };
};
