import { sampleFines } from '$lib/api/fines';
import { validateTelegramData } from '$lib/server/validateTelegramData';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { initData } = await request.json();

	let chatId: number;
	try {
		const data = validateTelegramData(initData);
		chatId = data.user!.id;
	} catch {
		throw error(401, {
			message: 'Invalid initData received from client',
		});
	}

	// TODO: retrieve documents information from database using chatId
	// TODO: use the document to request fines from MTS backend

	return json({
		fines: sampleFines,
	});
};
