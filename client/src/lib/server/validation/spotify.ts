export interface SpotifyTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	token_type: string;
	scope?: string;
}

export interface SpotifyErrorResponse {
	error: string;
	error_description?: string;
}

export function validateSpotifyTokenResponse(params: {
	response: Response;
	data: any;
}): SpotifyTokenResponse {
	if (!params.response.ok) {
		const errorData = params.data as SpotifyErrorResponse;
		throw new Error(
			errorData.error_description || errorData.error || 'Spotify API request failed.'
		);
	}

	// validate that required fields are present
	const requiredFields = ['access_token', 'refresh_token', 'expires_in'];
	for (const field of requiredFields) {
		if (!params.data[field]) {
			throw new Error(`Missing required field: ${field}`);
		}
	}

	// type validation
	if (
		typeof params.data.access_token !== 'string' ||
		typeof params.data.refresh_token !== 'string' ||
		typeof params.data.expires_in !== 'number'
	) {
		throw new Error('Invalid field types in Spotify response.');
	}

	return params.data as SpotifyTokenResponse;
}
