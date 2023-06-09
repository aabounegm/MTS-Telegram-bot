import { sampleFines } from '$lib/api/fines';
import { validateTelegramData } from '$lib/server/validateTelegramData';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
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
	// TODO: use the document to request fines from MTS backend

	return json({
		fines: sampleFines,
	});
};
