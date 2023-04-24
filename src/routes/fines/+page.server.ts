import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type TFines, sampleFines } from '$lib/api/fines';

export const load: PageServerLoad = async () => {
	const fines: TFines = sampleFines;

	return { fines };
};
