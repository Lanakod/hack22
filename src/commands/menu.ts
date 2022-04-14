import ICommand from '../interfaces/command';
import { Markup } from 'telegraf';
import { Heads, Workers } from '../database';

const cmd: ICommand = {
  name: 'menu',
  description: 'Главное меню',
  callback: async (ctx) => {
    //@ts-ignore
    const worker = await Workers.get(`${ctx.message.from.id}`);
    //@ts-ignore
    const head = await Heads.get(`${ctx.message.from.id}`);
    if (worker) {
      const markup = Markup.keyboard([
        ['🔎 Вакансии', '🔭 Ваша анкета'],
        ['✏️ Заполнить заново', 'Партнеры'],
      ]).resize();
      return await ctx.reply(
        'Возвращаю главное меню работника',
        markup
      );
    } else if (head) {
      const markup = Markup.keyboard([
        ['📑 Ваши вакансии', '🔭 Ваша анкета'],
        ['✏️ Заполнить заново'],
      ]).resize();
      return await ctx.reply(
        'Возвращаю главное меню работодателя',
        markup
      );
    } else {
      await ctx.reply('Вы ещё не зарегистрированы');
      return ctx.scene.enter('register-scene');
    }
  },
};
export default cmd;
