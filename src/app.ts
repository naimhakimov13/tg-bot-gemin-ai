import { Telegraf } from 'telegraf';
import 'dotenv/config';
import { createServer } from "https";

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', Telegraf.reply('λ'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

createServer(webHook).listen(3000);

async function webHook() {
  return await bot.createWebhook({ domain: "https://average-pike-long-underwear.cyclic.app" })
}
