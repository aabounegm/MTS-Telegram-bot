import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { API_BASE, getAccessTokenUrl, sampleCharities, type TCharity } from '$lib/api/charity';

export const load: LayoutServerLoad = async ({ fetch, cookies, url }) => {
	let accessToken = url.searchParams.get('accessToken') ?? cookies.get('accessToken');
	if (accessToken == undefined) {
		// No access token found. Go to the MTS login page, and redirect to the same page again
		// SvelteKit seems to default it to HTTP during dev
		const redirectUrl = getAccessTokenUrl(url.href.replace('http:', 'https:'));
		throw redirect(307, redirectUrl);
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
	} else {
		cookies.set('accessToken', accessToken, { path: '/' });
	}
	const charities: TCharity[] = (await res.json()).charityCatalog;
	return { charities };
};
