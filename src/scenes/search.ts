import { Markup, Scenes } from "telegraf";
import { Workers, Heads, Vacancies } from "../database";

const scene = new Scenes.WizardScene("search-scene", async (ctx) => {
  const id = ctx.message?.from.id || ctx.callbackQuery?.from.id;

  const vacanciesWTF = Vacancies.all();
  const vacancies: any[] = [];
  if(vacanciesWTF.length > 0) {
    vacanciesWTF.map((v) => {
      try {
        if (v) v.data.map((d: any) => vacancies.push(d));
      } catch (e) {
        console.log(e)
      }

    });
  }

  if (vacancies.length < 1) {
    await ctx.reply("Нет вакансий");
    return ctx.scene.leave();
  }

  const vacancy = vacancies[Math.floor(vacancies.length * Math.random())];
  const markup = Markup.inlineKeyboard([
    Markup.button.callback("👍", "vacancy-like"),
    Markup.button.callback("👎", "vacancy-dislike"),
    Markup.button.callback("💤", "vacancy-sleep"),
  ]);
  await ctx.reply(
    `Вакансия: ${vacancy.name}\nЗарплата: ${vacancy.salary}\nОписание: ${vacancy.description}\n\nНомер вакансии: ${vacancy.id}`,
    markup
  );
  return ctx.scene.leave();
});
export default scene;
