import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { API_BASE } from '$lib/api/mts';

export const load: LayoutServerLoad = async ({ fetch, cookies, url, locals }) => {
	const { accessToken } = locals;
	// Just to check that the token is still valid
	const res = await fetch(API_BASE + '/rnip2/charges/request', {
		method: 'POST',
		body: JSON.stringify({
			chargeType: 'FINES',
			payerIdList: [],
		}),
		headers: {
			'Content-Type': 'application/json',
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
	} else {
		cookies.set('accessToken', accessToken, { path: '/' });
	}
};
