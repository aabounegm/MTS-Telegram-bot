import crypto from 'node:crypto';
import { TELEGRAM_BOT_TOKEN } from '$env/static/private';

export const validateTelegramData = (initData: string) => {
	const data = new URLSearchParams(initData);

	const hash = data.get('hash');
	data.delete('hash');
	data.sort();
	const dataCheckString = decodeURIComponent(data.toString()).split('&').join('\n');

	const secret = crypto.createHmac('SHA256', 'WebAppData').update(TELEGRAM_BOT_TOKEN);
	const checkHash = crypto
		.createHmac('SHA256', secret.digest())
		.update(dataCheckString)
		.digest('hex');

	if (checkHash !== hash) {
		throw new Error('Invalid hash');
	}

	const safeData = Object.fromEntries(data.entries());
	safeData.user = JSON.parse(safeData.user);
	return safeData as unknown as WebAppInitData;
};
