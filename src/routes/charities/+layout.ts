import type { LayoutLoad } from './$types';
import { API_BASE, sampleCharities, type TCharity } from '$lib/api/charity';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch(API_BASE + '/rnip2/charges/charitycatalog');
	if (!res.ok) {
		console.error(await res.text());
		return {
			charities: sampleCharities,
		};
	}
	const charities: TCharity[] = await res.json();
	return { charities };
};
