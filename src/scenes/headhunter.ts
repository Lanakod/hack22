import { HHVacancies, HHVacancyCollector } from './../database/index';
import { Scenes } from 'telegraf';
import { HeadHunter } from '../services/headhunter';

const scene = new Scenes.WizardScene(
  'hh-scene',
  async (ctx) => {
    await ctx.reply('Введите название вакансии:', {
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
      //@ts-ignore
      `${ctx.message.from.id}.salary`,
      //@ts-ignore
      ctx.message.text
    );
    ctx.reply('Поиск подходящих вакансий');

    const hh = new HeadHunter({
      privateKey: 'pk',
      publicId: 'pId',
    });
    //@ts-ignore
    const vacancy = await HHVacancyCollector.get(String(ctx.message.from.id));

    const service = await hh.getClientApi();
    await service
      .vacancies({
        text: vacancy.name,
        salary: vacancy.salary,
      })
      .then(async (res) => {
        //@ts-ignore
        await res.getResponse().items.map(async (dd) => {
          HHVacancies.set(dd.id, dd);
        });
      });

    const hVacancy = HHVacancies.all();
    if (hVacancy.length) {
      await ctx.reply('Вакансии найдены!', {
        reply_markup: { remove_keyboard: true },
      });
      await ctx.scene.leave();
      return ctx.scene.enter('list-vacancy-scene');
    }

    await ctx.reply('Подходящих вакансий нет!');
    await ctx.scene.leave();
    return ctx.scene.enter('partners-scene');
  }
);

export default scene;
