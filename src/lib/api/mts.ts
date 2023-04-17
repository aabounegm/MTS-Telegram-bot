const BASE_URL = 'https://test.mospay.mos.ru';
const AUTH_URL_BASE = 'https://login.mos.ru/sps/oauth/ae';
export const API_BASE = BASE_URL + '/mospaynew';

export const getAccessTokenUrl = (redirectUrl: string) => {
	const params = new URLSearchParams({
		scope: 'openid profile',
		response_type: 'code',
		redirect_uri: BASE_URL + '/sudir/auth',
		client_id: 'test.mospay.mos.ru',
		state: redirectUrl,
	});
	return AUTH_URL_BASE + '?' + params.toString();
};
