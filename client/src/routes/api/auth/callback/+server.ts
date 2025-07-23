import { redirect, error, fail } from '@sveltejs/kit';
import { validateSpotifyTokenResponse } from '$lib/server/validation/spotify.js';
import { createPartySession } from '$lib/server/storage';
import { env } from '$env/dynamic/private';

const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = env.SPOTIFY_CLIENT_ID;

export async function GET({ url }) {
	const errorParam = url.searchParams.get('error');

	if (errorParam) {
		throw error(400, `Authentication Failed`);
	}

	const code = url.searchParams.get('code') || '';

	console.log(`received callback with code: ${code}`);
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
			content_type: 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: REDIRECT_URI
		})
	});

	const body = await response.json();
	let partyCode: string | null;
	try {
		const validatedResponse = await validateSpotifyTokenResponse({
			response: response,
			data: body
		});

		partyCode = await createPartySession({
			accessToken: validatedResponse.access_token,
			refreshToken: validatedResponse.refresh_token,
			expiresIn: validatedResponse.expires_in
		});
	} catch (err) {
		console.log('Spotify validation failed: ', err);
		throw fail(500);
	}

	throw redirect(302, `/party/${partyCode}`);
}
