import { setValue, getValue, deleteValue } from './session-store';
import { generatePartyCode } from '../utils';
import { validatePartySession } from '../validation';
import type { PartySession } from '../../../types/party-session';
import { env } from '$env/dynamic/private';

export async function createPartySession(params: {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}): Promise<string | null> {
	const partyCode: string = generatePartyCode();

	const partySession: PartySession = {
		partyCode: partyCode,
		spotifyAccessToken: params.accessToken,
		spotifyRefreshToken: params.refreshToken,
		spotifyExpiresAt: Date.now() + params.expiresIn * 1000
	};

	const validSession: PartySession | null = await validatePartySession({
		session: partySession
	});

	if (!validSession) {
		console.error(`Failed to validate the session: ${partySession}`);
		return null;
	}

	const response = await setValue({
		partySession: validSession
	});

	console.log('Created a party session: ', validSession);

	return response;
}

/**
 *
 * @param params param object containing the expired `PartySession` object
 * @returns refreshed `PartySession` object
 *
 * This function takes as a param the `PartySession` which has expired tokens.
 * It contacts the Spotify API to request a new access token using the `refreshToken`
 * which is stored as part of the `PartySession` object
 */
export async function refreshSession(params: {
	session: PartySession;
}): Promise<PartySession | null> {
	const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
	const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

	try {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: params.session.spotifyRefreshToken
			})
		});

		if (!response.ok) {
			console.error(`Failed to fresh token`, await response.text());
			return null;
		}

		const data = await response.json();

		const newSession: PartySession = {
			...params.session,
			spotifyAccessToken: data.access_token,
			spotifyExpiresAt: Date.now() + data.expires_in * 1000,
			spotifyRefreshToken: data.refresh_token ?? params.session.spotifyRefreshToken
		};

		await deleteValue({ partyCode: params.session.partyCode });

		await setValue({
			partySession: newSession
		});

		return newSession;
	} catch (err) {
		console.error(`Failed to resolve token refresh with Spotify`);
		return null;
	}
}
