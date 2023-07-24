import type { TFines } from '$lib/api/fines';
import { API_BASE } from '$lib/api/mts';
import { validateTelegramData } from '$lib/server/validateTelegramData';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, request, locals, cookies }) => {
	const { initData } = await request.json();

	let chatId: number;
	try {
		const data = validateTelegramData(initData);
		chatId = data.user!.id;
	} catch {
		throw error(400, {
			message: 'Invalid initData received from client',
		});
	}

	const { sql } = locals;
	const result = await sql`SELECT * FROM documents WHERE chat_id = ${chatId}`;
	if (result.length === 0) {
		throw error(403, {
			message: 'No documents found. Please add your document information first.',
		});
	}
	const { doc_type, doc_value } = result[0];

	const accessToken = cookies.get('accessToken');
	if (accessToken === undefined) {
		throw error(401, {
			message: 'No access token found in cookies',
		});
	}

	const linkRes = await fetch(API_BASE + '/rnip2/charges/request', {
		method: 'POST',
		body: JSON.stringify({
			chargeType: 'FINES',
			payerIdList: [
				{
					idType: doc_type,
					idNumber: doc_value,
				},
			],
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const requestPath = await linkRes.text();

	const finesRes = await fetch(API_BASE + '/rnip2' + requestPath, {
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

	return json({
		fines: fines.chargeResponseList,
	});
};
