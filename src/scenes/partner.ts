import { Markup, Scenes } from 'telegraf';
import { Heads, Workers } from '../database';

const scene = new Scenes.WizardScene(
  'partners-scene',
  async (ctx) => {
    //@ts-ignore
    await Heads.set(`${ctx.message.from.id}.description`, ctx.message.text);
    //@ts-ignore
    const markup = Markup.keyboard(['HeadHunter', 'Назад']).oneTime().resize();
    await ctx.reply('Выберите партнера: ', markup);
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    if (ctx.message.text === 'Назад') {
      await ctx.scene.leave();
      const markup = Markup.keyboard([
        ['🔎 Вакансии', '🔭 Ваша анкета'],
        ['✏️ Заполнить заново', 'Партнеры'],
      ]).resize();

      return await ctx.reply('Возвращаю главное меню', markup);
    }

    await ctx.scene.leave();
    await ctx.reply('Поиск вакансий партнера');
    return await ctx.scene.enter('hh-scene');
  }
);

export default scene;
