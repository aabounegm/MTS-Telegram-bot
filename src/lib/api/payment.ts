import { goto } from '$app/navigation';
import type { TCharityProgram } from './charity';
import { API_BASE } from './mts';

const PAYMENT_URL = API_BASE + '/payment/register';

interface PaymentRequestResult {
	/** "0" if success */
	resultCode: string;
	resultDescription: string;
	paymentUrl: string;
}

export async function pay(program: TCharityProgram, amount: number) {
	const res = await fetch(PAYMENT_URL, {
		method: 'POST',
		body: JSON.stringify({
			portal: {
				portalId: 'SUPERAPP',
			},
			amount,
			service: {
				paymentType: 'CHARITY',
				serviceCode: program.serviceCode,
			},
			serviceParams: {
				Narrative: program.serviceName,
				id1Formatted: program.fundName,
				id1: '0',
			},
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data: PaymentRequestResult = await res.json();
	if (data.resultCode != '0') {
		throw new Error(data.resultDescription);
	}
	goto(data.paymentUrl);
}
