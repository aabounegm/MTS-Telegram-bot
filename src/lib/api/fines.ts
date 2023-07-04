export type TFines = {
	chargeResponseList: TFine[];
};

export type TFine = {
	billFor: string;
	billDate: string;
	amountToPay: number;
};

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
