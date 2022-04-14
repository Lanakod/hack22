import { config } from "dotenv";
config();
import { Scenes, Telegraf } from "telegraf";

// Bot Token from Telegram
const tg_token = process.env.TOKEN as string;

// Telegraf Bot instance
const bot = new Telegraf<Scenes.WizardContext>(tg_token);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// Launch bot
export default bot;
