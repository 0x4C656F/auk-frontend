import { setTokenCookies } from '$root/lib/helpers';
import type { TokenPair } from '$root/lib/types';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();

		const password = formData.get('password')?.toString();

		const emailError = validateEmail(email);

		if (emailError) {
			return fail(422, {
				success: false,
				message: emailError,
				target: 'email'
			});
		}

		if (!password)
			return fail(422, {
				target: 'password',
				message: 'Password is required',
				success: false
			});

		const res = await fetch('/auth/sign-up', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (!res.ok) {
			if (res.status === 409) {
				return fail(409, {
					target: 'email',
					message: 'Email is already in use',
					success: false
				});
			} else {
				return fail(500, {
					target: 'unknown',
					message: 'Unknown error',
					success: false
				});
			}
		}

		const pair: TokenPair = await res.json();

		setTokenCookies(pair, cookies);

		return {
			success: true,
			message: 'Account created'
		};
	},

	login: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		const emailError = validateEmail(email);

		if (emailError) {
			return fail(422, {
				success: false,
				message: emailError,
				target: 'email'
			});
		}

		if (!password) {
			return fail(422, {
				target: 'password',
				message: 'Password is required',
				success: false
			});
		}

		const res = await fetch('/auth/sign-in', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (!res.ok) {
			if (res.status === 401) {
				return fail(401, {
					target: 'credentials',
					message: 'Invalid email or password',
					success: false
				});
			} else {
				return fail(500, {
					target: 'unknown',
					message: 'Unknown error',
					success: false
				});
			}
		}

		const pair: TokenPair = await res.json();

		setTokenCookies(pair, cookies);

		return {
			success: true,
			message: 'Logged in'
		};
	}
} satisfies Actions;

function validateEmail(email: string | null | undefined): string | void {
	if (!email) {
		return 'Email is required';
	}

	if (!email.endsWith('@auk.edu.ua')) {
		return 'Use your AUK email';
	}

	const dags = Array.from(email).filter((syb) => {
		return syb === '@';
	});

	if (dags.length > 2) {
		return 'Incorrect email';
	}
}
