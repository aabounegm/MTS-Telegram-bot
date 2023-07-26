import type { TFines } from '$lib/api/fines';
import { API_BASE } from '$lib/api/mts';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, cookies, params }) => {
	const accessToken = cookies.get('accessToken');
	if (accessToken === undefined) {
		throw error(401, {
			message: 'No access token found in cookies',
		});
	}
	const finesRes = await fetch(API_BASE + '/rnip2/charges/response/' + params.requestId, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const fines: TFines = await finesRes.json();
	if (fines.resultCode === '9996') {
		throw error(503, {
			message: 'The server is still processing your request, please try again later.',
		});
	}
	if (fines.resultCode === '9999') {
		throw error(500, {
			message: 'An unknown error occurred: ' + fines.resultDescription,
		});
	}

	return json({
		fines: fines.chargeResponseList,
	});
};
