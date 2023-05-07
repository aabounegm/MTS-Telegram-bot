# MTS Telegram bot

This project is a Telegram bot web app for the [pay.mos.ru](https://pay.mos.ru/) service managed by MTS.
It allows users of the portal to pay their fines and donate to charities through the Telegram bot.

## Developing

Once you've installed the dependencies with `npm install`, start a development server:

```bash
npm run dev
```

For the Telegram bot (using polling method) to run, you need to access the dev server at least once in the beginning to run the script in [`hooks.server.ts`](./src/hooks.server.ts).

Since the bot only works with HTTPS (unless you setup a testing account on a Telegram test server), the web app development must be done on the production server.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

The recommended way to run the production build is using `npm start` because it also sets the appropriate headers for CSRF protection.

## Demo

MTS Payment Telegram bot is available at the following link: [MTS Payment Telegram Bot](https://t.me/mts_mos_pay_bot)

## Links

- [Figma Wireframes](https://www.figma.com/file/f0ipxQO7EQmMrSeXW0M6rV/MTS-Payment-Chatbot?t=RXGbWw3SsGixbyep-1)
- [Figma UI/UX](https://www.figma.com/file/mIyMUy1M3fvHMk0wtLGZje/MTS-Payment-Chatbot---HiFi-Design?t=RXGbWw3SsGixbyep-1)
