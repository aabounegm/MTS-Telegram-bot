import type { Handle } from '@sveltejs/kit';
import postgres from 'postgres';
import { POSTGRES_URL } from '$env/static/private';
import type { Doc } from '$lib/api/document';
import { startBot } from './telegram';

startBot().then(() => {
	console.log('Bot started successfully!');
});

export const handle: Handle = async function ({ event, resolve }) {
	const accessToken = event.url.searchParams.get('accessToken');
	if (accessToken) {
		event.cookies.set('accessToken', accessToken, { path: '/' });
	}

	const sql = postgres(POSTGRES_URL);
	event.locals = {
		sql: sql,
	};

	const response = await resolve(event);
	return response;
};
