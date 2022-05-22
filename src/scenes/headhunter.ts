import { HHVacancyCollector } from './../database/index';
import { Scenes } from 'telegraf';

const scene = new Scenes.WizardScene(
  'hh-scene',
  async (ctx) => {
    await ctx.reply('Введите вашу специальность, должность\n(или другие ключевые слова):', {
      reply_markup: { remove_keyboard: true },
    });
    return ctx.wizard.next();
  },
  async (ctx) => {
    await HHVacancyCollector.set(
      //@ts-ignore
      `${ctx.message.from.id}.name`,
      //@ts-ignore
      ctx.message.text
    );
    await ctx.reply('Введите желаемую зарплату: ');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await HHVacancyCollector.set(
      `${ctx.message?.from.id}.salary`,
      //@ts-ignore
      ctx.message.text
    );

    await HHVacancyCollector.set(`${ctx.message?.from.id}.page`, 1);

    ctx.reply('Поиск подходящих вакансий');

    await ctx.scene.leave();
    return ctx.scene.enter('list-vacancy-scene');
  }
);

export default scene;
