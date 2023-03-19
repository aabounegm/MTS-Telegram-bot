export type TCharityProgram = {
	serviceName: string;
	serviceCode: string;
	fundName: string;
	serviceDescription: string;
	fundUrl: string;
	fundLogo: string;
	minimum: number;
};

export type TCharity = {
	code: string;
	name: string;
	programs: TCharityProgram[];
};
