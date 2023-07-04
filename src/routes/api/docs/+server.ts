import { validateTelegramData } from '$lib/server/validateTelegramData';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	// const { initData } = await request.json();
	const initData = url.searchParams.toString();
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
	const result = await sql`
        SELECT * FROM documents
        WHERE chat_id = ${chatId};`;

	if (result.length === 0) {
		return json(null);
	}
	return json(result[0]);
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	const { initData, docType, docValue } = await request.json();

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
	const result = await sql`
        INSERT INTO documents
        VALUES (${chatId}, ${docType}, ${docValue})
        ON CONFLICT (chat_id) DO UPDATE
        SET doc_type = ${docType}, doc_value = ${docValue}
        RETURNING chat_id, doc_type, doc_value`;

	return json(result[0]);
};
