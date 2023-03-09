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

It can also be run using `node build`.
