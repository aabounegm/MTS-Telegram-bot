export type TFines = {
	chargeResponseList: TFine[];
};

export type TFine = {
	billFor: string;
	billDate: string;
	amountToPay: number;
};

// export const FINES_ASSETS_BASE = API_BASE + '/newportal/assets/images/charity/';

export const sampleFines: TFines = {
	chargeResponseList: [
		{
			billFor: 'Aliqua enim cillum qui culpa cupidatat amet do est amet cupidatat.',
			billDate: new Date().toISOString(),
			amountToPay: 100,
		},
		{
			billFor: 'Aliqua enim cillum qui culpa cupidatat amet do est amet cupidatat.',
			billDate: new Date().toISOString(),
			amountToPay: 100,
		},
		{
			billFor: 'Aliqua enim cillum qui culpa cupidatat amet do est amet cupidatat.',
			billDate: new Date().toISOString(),
			amountToPay: 100,
		},
		{
			billFor: 'Aliqua enim cillum qui culpa cupidatat amet do est amet cupidatat.',
			billDate: new Date().toISOString(),
			amountToPay: 100,
		},
	],
};
