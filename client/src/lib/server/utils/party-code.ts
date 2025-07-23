/**
 *
 * @returns `partyCode`
 *
 * This function generates a statistically unique `partyCode` for a new party
 *
 * IMPROVE: this function can be improved by increasing the length of the code for increased traffic
 * 			since this will reduce collision possibilities. We could also check for the code existing
 * 			already in Redis but this would introduce some latency.
 */
export function generatePartyCode(): string {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	let code = '';
	for (let i = 0; i < 10; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return code;
}
