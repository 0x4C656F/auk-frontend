import { SignUpStore, graphql } from '$houdini';
import type { TokenPair } from '$lib/types';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const email = formData.get('email')?.toString();

		const name = email?.split('.')[0] || '';

		const password = formData.get('password')?.toString();

		if (!email)
			return fail(422, {
				target: 'email',
				message: 'Email is required',
				success: false
			});

		if (!password)
			return fail(422, {
				target: 'password',
				message: 'Password is required',
				success: false
			});

		const registerMutation: SignUpStore = graphql`
			mutation SignUp($dto: SignUpDto!) {
				public {
					signUp(signUpDto: $dto) {
						accessToken
						refreshToken
					}
				}
			}
		`;

		const response = await registerMutation.mutate({ dto: { email, password } }, { event });
		if (!response.data) {
			if (response.errors) {
				return fail(500, {
					target: 'unknown',
					message: response.errors[0].message,
					success: false
				});
			}
		} else {
			const { accessToken, refreshToken }: TokenPair = response.data.public.signUp;
			const cookies = event.cookies;
			cookies.set('at', accessToken, {
				expires: new Date(new Date().setHours(new Date().getHours() + 1)),
				path: '/'
			});
			cookies.set('rt', refreshToken, {
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				path: '/'
			});

			return { success: true, name };
		}
	}
} satisfies Actions;
