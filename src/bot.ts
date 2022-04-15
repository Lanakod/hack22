import { config } from 'dotenv';
import path from 'path';
import { Scenes, Telegraf } from 'telegraf';

// Config environment variables
let envPath = path.resolve(process.cwd(), '.env');

if (process.env.NODE_ENV) {
  envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
}

config({
  path: envPath,
});

// Bot Token from Telegram
const tg_token = process.env.TOKEN as string;

// Telegraf Bot instance
const bot = new Telegraf<Scenes.WizardContext>(tg_token);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Launch bot
export default bot;
