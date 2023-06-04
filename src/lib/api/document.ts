export enum DocType {
	PASSPORT = 'passport',
}

export interface Doc {
	chatId: number;
	docType: DocType;
	docValue: string;
}
