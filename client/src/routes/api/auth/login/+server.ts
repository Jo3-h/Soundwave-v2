import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI;
const SCOPES = [
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-read-currently-playing'
].join(' ');

export function GET() {
	const state = crypto.randomUUID();

	const url = new URL('https://accounts.spotify.com/authorize');
	url.searchParams.set('client_id', CLIENT_ID);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('redirect_uri', REDIRECT_URI);
	url.searchParams.set('state', state);
	url.searchParams.set('scope', SCOPES);
	console.log(`redirecting to: ${url.toString()}`);

	throw redirect(302, url.toString());
}
