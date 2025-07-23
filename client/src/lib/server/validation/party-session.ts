import type { PartySession } from '../../../types/party-session';
import { refreshSession } from '$lib/server/storage';
import { setValue, deleteValue } from '$lib/server/storage';

/**
 *
 * @param params object containing a PartySession object
 * @returns promise of a PartySession type or null
 *
 * This function take a param of a `PartySession` type and runs validation checks to ensure this is a valid object
 * validation has the following steps...
 *
 * -> Check `PartySession` object for expired tokens and refresh if needed.
 * 		-> Rebuild the `PartySession` object.
 * 		-> Delete the old `PartySession` from Redis storage
 * 		-> Save the updated `PartySession` with new access token.
 * -> Type-check the `PartySession` param.
 *
 * Once these have passed the `PartySession` is returned. If any step fails then null is returned.
 */
export async function validatePartySession(params: {
	session: PartySession;
}): Promise<PartySession | null> {
	// if the token is expired then refresh and reset
	if (params.session.spotifyExpiresAt < Date.now()) {
		console.log(
			`Expired spotify access token detected for partyCody ${params.session.partyCode} - Attempting token refresh`
		);
		const newSession = await refreshSession({
			session: params.session
		});
		if (!newSession) {
			console.error(`Failed to refresh token`);
			return null;
		}
		return newSession;
	}

	if (
		typeof params.session.partyCode !== 'string' ||
		typeof params.session.spotifyAccessToken !== 'string' ||
		typeof params.session.spotifyRefreshToken !== 'string' ||
		typeof params.session.spotifyExpiresAt !== 'number'
	) {
		console.warn(`Session with PartyCode ${params.session.partyCode} has incorrect typing`);
		return null;
	}

	return params.session;
}

/**
 *
 * @param params object containing partyCode string for validation
 * @returns string or null
 *
 * This function takes param of a partyCode and validates it. If the validation rules are met then the
 * partCode is returned to the user. Else if validation rules are not met then null is returned.
 */
export function validatePartyCode(params: { partyCode: string }): string | null {
	const partyCode = params.partyCode;

	if (typeof partyCode !== 'string') {
		console.warn(`PartyCode must be type string [${typeof partyCode}]`);
		return null;
	}
	if (partyCode.length != 10) {
		console.warn(`PartyCode must be 5 characters [${partyCode}]`);
		return null;
	}

	return partyCode;
}
