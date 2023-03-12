import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	return {
		user: event.cookies.get('user'),
	};
};
