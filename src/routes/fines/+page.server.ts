import type { PageServerLoad } from './$types';

interface User {
	email: string;
	password: string;
}

export const load: PageServerLoad = (event) => {
	return {
		user: JSON.parse(event.cookies.get('user')!) as User,
	};
};
