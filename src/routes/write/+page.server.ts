import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	'save-blog': async ({ request }) => {
		const data = await request.formData();
		console.table(data.get('title'));
		console.table(data.get('content'));
	}
};
