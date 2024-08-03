import { config } from 'dotenv';
import { setTokenCookies } from './lib/helpers';
import type { TokenPair } from './lib/types';
config();

export async function handleFetch({ event, request, fetch }) {
	const path = parsePathFromUrl(request.url);
	const SERVER_URL = process.env.BACKEND_URL;
	const url = SERVER_URL + path;

	console.log(`======== ${request.method + ' ' + url} ========`);
	const c = event.cookies;
	request = new Request(url, request);

	const token = c.get('_at');

	if (token) {
		request.headers.set('Authorization', `Bearer ${token}`);
	} else {
		const refresh_token = c.get('_rt');
		if (refresh_token) {
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
				setTokenCookies(pair, c);

				request.headers.set('Authorization', `Bearer ${pair._at}`);
			} catch (error) {
				console.error('Error during token refresh:', error);
			}
		}
	}

	request.headers.set('Content-Type', 'application/json');

	const response = await fetch(request);

	console.log(`Response for ${path} received. Status:`, response.status);

	return response;
}

function parsePathFromUrl(url: string) {
	const [, ...path] = url.slice(9).split('/');
	console.log('this is the path:', path);
	const parsedPath = '/' + path.join('/');
	console.log('Parsed path:', parsedPath);
	return parsedPath;
}
