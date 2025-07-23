import { error } from '@sveltejs/kit';
import { client } from './connect';
import type { PartySession } from '../../../types/party-session';
import { validatePartySession, validatePartyCode } from '$lib/server/validation';

/**
 *
 * @param params object containing PartySession type
 * @returns partyCode for session or null on failure
 *
 * This function is used to set a value in Redis storage.
 */
export async function setValue(params: { partySession: PartySession }): Promise<string | null> {
	const validatedPartySession = await validatePartySession({
		session: params.partySession
	});

	if (!validatedPartySession) {
		console.warn(`Invalid PartySession ${params.partySession}`);
		return null;
	}

	try {
		await client.set(validatedPartySession.partyCode, JSON.stringify(params.partySession), {
			ex: 24 * 60 * 60
		});
		return validatedPartySession.partyCode;
	} catch (err) {
		console.log(`Error saving PartySession [${params.partySession}] to Redis: `, err);
	}

	return null;
}

/**
 *
 * @param params object containing `partyCode` string
 * @returns promise of either a `PartySession` object or null
 *
 * This function is used to retrieve a `partySession` object from the Redis storage if it exists.
 * If the storage object does not exist with the `partyCode` as its key, then return null;
 */
export async function getValue(params: { partyCode: string }): Promise<PartySession | null> {
	// validate the partyCode
	const validatedPartyCode = validatePartyCode({
		partyCode: params.partyCode
	});
	if (!validatedPartyCode) {
		console.error(`Error validating partyCode [${params.partyCode}]`);
		return null;
	}

	try {
		const value = await client.get(validatedPartyCode);
		if (!value) {
			return null;
		}
		const session = value as PartySession;
		return session;
	} catch (err) {
		console.error(`Failed to retrieve or parse PartySession with code [${validatedPartyCode}]`);
		return null;
	}
}

/**
 *
 * @param params param object containing a `partyCode`
 * @returns boolean
 *
 * This function is used to delete an object from Redis storage. It attempts to delete a value with key
 * which is equal to the `partyCode` param. On success, it will return `true` otherwise, it
 * returns `false`.
 */
export async function deleteValue(params: { partyCode: string }): Promise<boolean> {
	try {
		const response = await client.del(params.partyCode);
		if (response === 1) {
			return true;
		} else {
			console.warn(`Key [${params.partyCode}] did not exist in Redis`);
			return false;
		}
	} catch (err) {
		console.error(`Failed to delete partyCode [${params.partyCode}] from Redis storage`);
		return false;
	}
}
