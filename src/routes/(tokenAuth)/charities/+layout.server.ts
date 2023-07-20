import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { sampleCharities, type TCharity } from '$lib/api/charity';
import { API_BASE } from '$lib/api/mts';

export const load: LayoutServerLoad = async ({ fetch, cookies, url, locals }) => {
	const { accessToken } = locals;
	const res = await fetch(API_BASE + '/rnip2/charges/charitycatalog', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (!res.ok) {
		if (res.status === 401) {
			// Token expired. Redirect to MTS login to renew
			const redirectUrl = url.href.replace('http:', 'https:');
			throw redirect(307, `/login?redirectUrl=${redirectUrl}`);
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
