export type TCharityProgram = {
	serviceName: string;
	serviceCode: string;
	fundName: string;
	serviceDescription: string;
	fundUrl: string;
	/** The name of the logo file to be appended to the base URL (https://test.mospay.mos.ru/mospaynew/newportal/assets/images/charity/) after URL encoding */
	fundLogo: string;
	minimum: number;
};

export type TCharity = {
	code: string;
	name: string;
	programs: TCharityProgram[];
};

export const API_BASE = 'https://test.mospay.mos.ru/mospaynew';
export const FUNDS_ASSETS_BASE = API_BASE + '/newportal/assets/images/charity/';
export const getAccessTokenUrl = (redirectUrl: string) => {
	const AUTH_URL_BASE = 'https://login.mos.ru/sps/oauth/ae';
	const params = new URLSearchParams({
		scope: 'openid+profile',
		response_type: 'code',
		redirect_uri: 'https://test.mospay.mos.ru/sudir/auth',
		client_id: 'test.mospay.mos.ru',
		state: redirectUrl,
	});
	return AUTH_URL_BASE + '?' + params.toString();
};

export const sampleCharities: TCharity[] = [
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
