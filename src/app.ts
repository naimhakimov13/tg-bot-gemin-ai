import { Telegraf } from 'telegraf';
import express from 'express'

import 'dotenv/config';

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express()
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', (ctx) => ctx.reply('Feeling those vintage vibes ')); // More descriptive hipster response

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.get('/', (req, res, next) => {
  res.send('telegram bot')
})
app.listen(3000, () => {
  console.log('Server started');
})

if (process.env.NODE_ENV === "production") {
  bot.launch({
    webhook:{
      domain: process.env.TELEGRAM_WEBHOOK_DOMAIN,
      port: 3000
    }
  });
} else {
  // Use Long Polling for development
  bot.launch();
}
