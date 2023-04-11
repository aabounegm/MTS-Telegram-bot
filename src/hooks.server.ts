import type { Handle } from '@sveltejs/kit';
import { startBot } from './telegram';

startBot().then(() => {
	console.log('Bot started successfully!');
});

export const handle: Handle = async function ({ event, resolve }) {
	const accessToken = event.url.searchParams.get('accessToken');
	if (accessToken) {
		event.cookies.set('accessToken', accessToken, { path: '/' });
	}

	const response = await resolve(event);
	return response;
};
