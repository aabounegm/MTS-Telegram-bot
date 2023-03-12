import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		cookies.set(
			'user',
			JSON.stringify({
				email: data.get('email'),
				password: data.get('password'),
			}),
		);
		throw redirect(302, '/fines');
	},
};
