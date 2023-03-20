import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent, params }) => {
	const data = await parent();
	const program = data.charities
		.flatMap((c) => c.programs)
		.find((program) => program.serviceCode === params.program_code);

	if (program == undefined) throw error(404, 'Charity not found');
	return { charityProgram: program };
};
