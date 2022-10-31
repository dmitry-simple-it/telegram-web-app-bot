import { Telegraf } from 'telegraf';

const TOKEN = '5423214063:AAHPA1csFr88SBAp_EMZu44MwiGN5dKpMXY';
const webAppUrl = 'https://ornate-cranachan-90a615.netlify.app/';

const bot = new Telegraf(TOKEN);

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
