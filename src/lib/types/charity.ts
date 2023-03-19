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

export const FUNDS_ASSETS_BASE =
	'https://test.mospay.mos.ru/mospaynew/newportal/assets/images/charity/';
