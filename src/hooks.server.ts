import type { Handle } from '@sveltejs/kit';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { startBot } from './telegram';

startBot().then(() => {
	console.log('Bot started successfully!');
});

export const handle: Handle = async function ({ event, resolve }) {
	const accessToken = event.url.searchParams.get('accessToken');
	if (accessToken) {
		event.cookies.set('accessToken', accessToken, { path: '/' });
	}

	const sql = postgres(env.POSTGRES_URL);
	event.locals = {
		sql: sql,
	};
	// await sql`CREATE TABLE IF NOT EXISTS documents (
	// 	chat_id BIGINT PRIMARY KEY NOT NULL,
	// 	doc_type TEXT NOT NULL,
	// 	doc_value TEXT NOT NULL
	// )`;

	const response = await resolve(event);
	await sql.end();
	return response;
};
