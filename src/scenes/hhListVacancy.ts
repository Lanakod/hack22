import { HeadHunter } from '../services/headhunter';
import { Markup } from 'telegraf';
import { Scenes } from 'telegraf';
import { Utils } from '../utils';
import { HHVacancyCollector } from '../database';

const scene = new Scenes.WizardScene('list-vacancy-scene', async (ctx) => {
  const id = ctx.message?.from.id || ctx.callbackQuery?.from.id;

  const hh = new HeadHunter({
    privateKey: 'pk',
    publicId: 'pId',
  });

  const vacancy = await HHVacancyCollector.get(String(id));

  const service = await hh.getClientApi();
  const result = await service.vacancies({
    text: vacancy.name,
    salary: vacancy.salary,
    page: vacancy.page,
    per_page: 1,
  });

  await HHVacancyCollector.set(`${id}.page`, vacancy.page + 1);

  const markup = Markup.inlineKeyboard([
    Markup.button.callback('Следующая', 'hh-vacancy-next'),
    Markup.button.callback('Выход', 'hh-vacancy-exit'),
  ]);

  const returnData = await Utils.vacancyMapper(result.getData().items[0]);
  let salary: any = 'Не указана',
    address: any = 'Не указан',
    date: any = null;
  if (returnData.salary) {
    salary =
      `${returnData.salary?.from ? returnData.salary?.from : ''}` +
      `${returnData.salary?.to ? ' - ' + returnData.salary?.to : ''} ` +
      `${returnData.salary?.currency}`;
  }
  if (returnData.address && returnData.address.street) {
    address = `${returnData.address?.street}, ${returnData.address?.building}`;
  }

  if (returnData.created_at) {
    date = new Date(returnData.published_at!).toLocaleDateString();
  }

  await ctx.replyWithHTML(
    `<b>Вакансия: ${returnData.name}</b>\n` +
      `<u>Зарплата:</u> ${salary}\n` +
      `<u>Адрес:</u> ${address}\n` +
      `<u>Метро:</u> ${returnData.address?.metro?.station_name || 'Не указано'}\n` +
      `<u>Работадатель:</u> ${returnData.employer?.name}\n\n` +
      `<b>Ссылки:</b>\n` +
      `<u>Вакансия:</u> <a href="${returnData.alternate_url}">Просмотреть вакансию</a>\n` +
      `<u>Работадатель:</u> <a href="${returnData.employer?.alternate_url}">Связаться</a>` +
      `${date ? '\n\nДата публикации: ' + date : ''}`,
    markup
  );
  return ctx.scene.leave();
});

export default scene;
