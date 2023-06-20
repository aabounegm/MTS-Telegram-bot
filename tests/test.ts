import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
});

import { startBot } from './telegram';

test('Bot starts successfully', async () => {
	const result = await startBot();
	expect(result).toBeUndefined();
});

// Test bot start command
import { startBot } from './your-module';
import { Telegraf } from 'telegraf';

jest.mock('telegraf');

test('Bot start command sets up welcome message with correct buttons', async () => {
	const mockReply = jest.fn();
	const mockMarkupKeyboard = jest.fn();
	const mockButton = jest.fn();
	mockButton.webApp = jest.fn();
	mockMarkupKeyboard.mockReturnValue({
		resize: jest.fn(),
	});

	Telegraf.mockImplementation(() => ({
		start: jest.fn((callback) => {
			const ctx = {
				reply: mockReply,
			};
			callback(ctx);
		}),
		launch: jest.fn(),
	}));

	await startBot();

	expect(mockButton.webApp).toHaveBeenCalledWith('Fines', 'YOUR_BASE_URL/fines');
	expect(mockButton.webApp).toHaveBeenCalledWith('Charities', 'YOUR_BASE_URL/charities');
	expect(mockMarkupKeyboard).toHaveBeenCalledWith([expect.any(Function), expect.any(Function)], {
		columns: 2,
	});
	expect(mockReply).toHaveBeenCalledWith(
		'Welcome!',
		expect.objectContaining({
			resize: expect.any(Function),
		}),
	);
});
