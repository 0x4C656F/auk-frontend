import type { ActionResult, Cookies } from '@sveltejs/kit';
import type { TokenPair } from '../types';
const TOKEN_EXPIRATION_HOURS = 1;
const REFRESH_TOKEN_EXPIRATION_DAYS = 7;

export function clickOutside(node: HTMLElement, ignore?: string) {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement;
		if (!event.target || (ignore && target.closest(ignore))) {
			return;
		}
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export function setTokenCookies(pair: TokenPair, cookies: Cookies) {
	const expiresAt = new Date();
	expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRATION_HOURS);

	const refreshTokenExpiry = new Date();
	refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + REFRESH_TOKEN_EXPIRATION_DAYS);

	cookies.set('_at', pair._at, {
		expires: expiresAt,
		path: '/',
		httpOnly: true,
		sameSite: 'strict'
	});
	cookies.set('_rt', pair._rt, {
		expires: refreshTokenExpiry,
		path: '/',
		httpOnly: true,
		sameSite: 'strict'
	});
}

export function updateFormData<T>(
	formResult: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>
): T {
	const { data } = formResult as unknown as { data: T };
	return data;
}
