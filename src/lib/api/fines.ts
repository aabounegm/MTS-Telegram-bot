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
	/** Title */
	billFor: string;
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
