import { Telegraf, Markup, type TelegramError } from 'telegraf';
import { dev, building } from '$app/environment';
import { TELEGRAM_BOT_TOKEN, BASE_URL } from '$env/static/private';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
	ctx.reply(
		'Welcome!',
		Markup.keyboard(
			[
				Markup.button.webApp('Fines', `${BASE_URL}/fines` /* !ctx.session.loggedIn */),
				Markup.button.webApp('Charities', `${BASE_URL}/charities` /* !ctx.session.loggedIn */),
				Markup.button.webApp('Login', `${BASE_URL}/login` /* ctx.session.loggedIn */),
			],
			{
				columns: 2,
			},
		).resize(true),
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
