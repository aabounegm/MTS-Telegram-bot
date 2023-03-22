import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { API_BASE, getAccessTokenUrl, sampleCharities, type TCharity } from '$lib/api/charity';

export const load: LayoutServerLoad = async ({ fetch, cookies, url }) => {
	let accessToken = url.searchParams.get('accessToken') ?? cookies.get('accessToken');
	if (accessToken == undefined) {
		// No access token found. Go to the MTS login page, and redirect to the same page again
		throw redirect(307, getAccessTokenUrl(url.href));
	}
	const res = await fetch(API_BASE + '/rnip2/charges/charitycatalog', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (!res.ok) {
		if (res.status === 401) {
			// Token expired. Redirect to MTS login to renew
			throw redirect(307, getAccessTokenUrl(url.href));
		}
		// Otherwise (some other error)
		console.error(await res.text());
		return {
			charities: sampleCharities,
		};
	}
	const charities: TCharity[] = await res.json();
	return { charities };
};
