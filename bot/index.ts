import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

config();

const token = process.env.TG_BOT_TOKEN || '';
const webAppUrl = process.env.TG_DEPLOY_URL || '';

if (!(token && webAppUrl)) {
  console.error('Bot API Token and Web App Url are required');
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply(
    {
      text: '*Начинаем*\n\n Нажмите на кнопку ниже, чтобы начать',
      parse_mode: 'MarkdownV2' as unknown as undefined,
    },
    {
      reply_markup: {
        inline_keyboard: [[{ text: 'Погнали', web_app: { url: webAppUrl } }]],
      },
    },
  );
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
