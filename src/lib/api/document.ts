export enum DocType {
	PASSPORT = 'Passport',
}

export type Doc = {
	type: string;
	value: string;
};

type DocResponse = {
	chat_id: number;
	doc_type: string;
	doc_value: string;
};

export async function getDoc(initData: string): Promise<Doc | null> {
	const res = await fetch('/api/docs?' + initData);
	if (!res.ok) {
		throw new Error((await res.json()).message);
	}
	const data: DocResponse | null = await res.json();
	if (data == null) return null;
	return {
		type: data.doc_type,
		value: data.doc_value,
	};
}

export async function updateDoc(initData: string, docType: string, docValue: string): Promise<Doc> {
	const res = await fetch('/api/docs', {
		method: 'PUT',
		body: JSON.stringify({
			initData,
			docType,
			docValue,
		}),
		headers: {
			'content-type': 'application/json',
		},
	});
	// To reflect exactly what is stored in the database in case the backend transform the data
	const data: DocResponse = await res.json();
	return {
		type: data.doc_type,
		value: data.doc_value,
	};
}
