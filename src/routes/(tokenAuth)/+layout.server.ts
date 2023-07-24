import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url, locals }) => {
	const accessToken = url.searchParams.get('accessToken') ?? cookies.get('accessToken');
	if (accessToken == undefined) {
		// No access token found. Go to the MTS login page, and redirect to the same page again
		// SvelteKit seems to default it to HTTP during dev
		const redirectUrl = url.href.replace('http:', 'https:');
		throw redirect(307, `/login?redirectUrl=${redirectUrl}`);
	}
	locals.accessToken = accessToken;
};
