export type TFines = {
	requestUID: string;
	/** if resultCode is 9996 you have to re-request after some time. if you get resultCode=0, then it is ready. */
	resultCode: string;
	resultDescription: string;
	chargeResponseList: TFine[];
};

export type TFine = {
	/** ISO timestamp (with timezone) */
	validUntil: string;
	supplierOrgInfo: {
		name: string;
		inn: string;
		kpp: string;
		orgn: string;
		account: {
			accountNumber: string;
			bank: {
				bik: string;
				correspondentBankAccount: string;
			};
		};
	};
	/** Title */
	billFor: string;
	/** In kopek. Divide by 100 to get rubles */
	totalAmount: string;
	changeStatus: {
		meaning: string;
	};
	additionalData: Array<{ name: string; value: string }>;
	supplierBillID: string;
	/** ISO timestamp (with timezone) */
	billDate: string;
	amountToPay: number;
	chargeType: 'FINES';
	revoked: boolean;
};
