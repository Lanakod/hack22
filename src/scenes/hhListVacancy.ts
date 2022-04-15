import { Markup } from 'telegraf';
import { HHVacancies } from '../database/index';
import { Scenes } from 'telegraf';

const scene = new Scenes.WizardScene('list-vacancy-scene', async (ctx) => {
  const hVacancies = HHVacancies.all();

  const vacancy = hVacancies[Math.floor(hVacancies.length * Math.random())];

  const hhArray = JSON.parse(vacancy.data);
  console.log(hhArray);

  const markup = Markup.inlineKeyboard([
    Markup.button.callback('Следующая', 'hh-vacancy-next'),
    Markup.button.callback('Выход', 'hh-vacancy-exit'),
  ]);

  await ctx.reply(
    `Вакансия: ${hhArray.name}\nЗарплата: ${hhArray.salary?.from} - ${hhArray.salary?.to} [${hhArray.salary?.currency}]\nАдрес: ${hhArray.address?.city}, ${hhArray.address?.street}, ${hhArray.address?.building}. Метро: ${hhArray.address?.metro?.station_name}\nРаботодатель: ${hhArray.employer?.name}\n\nСсылки: \n Вакансия: ${hhArray.alternate_url}\nРаботодатель: ${hhArray.employer?.alternate_url}`,
    markup
  );
  return ctx.scene.leave();
});

export default scene;
