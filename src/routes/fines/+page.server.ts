import type { PageServerLoad } from './$types';

interface User {
	email: string;
	password: string;
}

export const load: PageServerLoad = (event) => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		user: JSON.parse(event.cookies.get('user')!) as User,
	};
};
