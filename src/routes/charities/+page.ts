import type { PageLoad } from './$types';
import { FUNDS_ASSETS_BASE, type TCharity } from '$lib/types/charity';

export const load: PageLoad = async () => {
	return charityPrograms;
};

const charityPrograms: TCharity[] = [
	{
		code: 'ADULTS0001',
		name: 'Взрослые',
		programs: [
			{
				serviceName: 'Наука, образование и технологии',
				serviceCode: 'AAAA99341800000000001',
				fundName: 'Фонд поддержки слепоглухих «Со-единение»',
				serviceDescription:
					'Обеспечение нового качества жизни и реабилитации слепоглухих путем развития инновационных отечественных ассистивных технологий и проведения перспективных исследований в области комплексной социализации инвалидов с нарушенным слухом и зрением',
				fundUrl: 'https://so-edinenie.org/o-fonde/programmi/nauka-obrazovanie-i-tehnologii',
				fundLogo: FUNDS_ASSETS_BASE + encodeURIComponent('logo color-1@2x.png'),
				minimum: 1,
			},
		],
	},
];
