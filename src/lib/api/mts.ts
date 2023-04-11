export const API_BASE = 'https://test.mospay.mos.ru/mospaynew';
export const getAccessTokenUrl = (redirectUrl: string) => {
	const AUTH_URL_BASE = 'https://login.mos.ru/sps/oauth/ae';
	const params = new URLSearchParams({
		scope: 'openid profile',
		response_type: 'code',
		redirect_uri: 'https://test.mospay.mos.ru/sudir/auth',
		client_id: 'test.mospay.mos.ru',
		state: redirectUrl,
	});
	return AUTH_URL_BASE + '?' + params.toString();
};
