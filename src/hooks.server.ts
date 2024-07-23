import { SERVER_URL } from '$env/static/private';
import { setTokenCookies } from './lib/helpers';
import type { TokenPair } from './lib/types';

export async function handleFetch({ event, request, fetch }) {
	console.log('======== handleFetch Start ========');

	const path = parsePathFromUrl(request.url);
	const url = SERVER_URL + path;
	console.log(request.method + ' ' + url);

	const c = event.cookies;
	request = new Request(url, request);

	console.log('Checking for access token...');
	const token = c.get('_at');

	if (token) {
		console.log('Access token found. Setting Authorization header.');
		request.headers.set('Authorization', `Bearer ${token}`);
	} else {
		console.log('No access token found. Checking for refresh token...');
		const refresh_token = c.get('_rt');
		if (refresh_token) {
			console.log('Refresh token found. Attempting to refresh...');
			try {
				const res = await fetch(SERVER_URL + '/auth/refresh', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						refreshToken: refresh_token
					})
				});

				if (!res.ok) {
					throw new Error(`Refresh failed with status: ${res.status}`);
				}

				const pair: TokenPair = await res.json();
				console.log('Tokens refreshed successfully.');
				setTokenCookies(pair, c);

				request.headers.set('Authorization', `Bearer ${pair._at}`);
			} catch (error) {
				console.error('Error during token refresh:', error);
			}
		} else {
			console.log('No refresh token found.');
		}
	}

	request.headers.set('Content-Type', 'application/json');

	console.log('Sending request to server...');
	const response = await fetch(request);

	console.log('Response received. Status:', response.status);

	console.log('======== handleFetch End ========');

	return response;
}

function parsePathFromUrl(url: string) {
	const [, ...path] = url.slice(7).split('/');
	const parsedPath = '/' + path.join('/');
	return parsedPath;
}
