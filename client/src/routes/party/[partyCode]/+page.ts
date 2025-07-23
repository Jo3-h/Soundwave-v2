import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	if (!params.partyCode) {
		throw redirect(303, '/party');
	}

	return {
		partyCode: params.partyCode
	};
};
