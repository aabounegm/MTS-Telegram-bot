import { Telegraf, Markup, type TelegramError } from 'telegraf';
import { dev, building } from '$app/environment';
import { TELEGRAM_BOT_TOKEN, BASE_URL } from '$env/static/private';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
	ctx.reply(
		'Welcome!',
		// Normal Keyboard Buttons do not support initData, so we have to use inlineKeyboard
		// More info: https://core.telegram.org/bots/webapps#webappinitdata
		Markup.inlineKeyboard([
			Markup.button.webApp('Fines', `${BASE_URL}/fines`),
			Markup.button.webApp('Charities', `${BASE_URL}/charities`),
		]),
	);
});

export async function startBot() {
	if (building) return;
	console.log('Starting Telegram bot...');
	// This hack is to get hot reloading to work with the bot during development
	try {
		await bot.launch();
	} catch (error) {
		const err = error as TelegramError;
		if (err.response.error_code === 409 && dev) {
			console.log('Conflict starting bot. Ignore if hot reloading');
		} else {
			throw error;
		}
	}
	console.log('Telegram bot is ready!');
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
