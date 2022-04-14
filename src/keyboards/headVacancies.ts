import { Markup } from "telegraf";
import { Vacancies } from "../database";
import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
  name: "📑 Ваши вакансии",
  callback: async (ctx) => {
    const markup = Markup.keyboard([["➕ Создать", "🏠 На главную"]]).resize();
    const vacancies = (await Vacancies.get(`${ctx.message!.from.id}`)) || [];
    await ctx.reply(
      vacancies.length ? "Ваши вакансии:" : "У вас ещё нет вакансий",
      markup
    );
    for (const v of vacancies) {
      const i: any = vacancies.indexOf(v);
      const msgmarkup = Markup.inlineKeyboard([
        Markup.button.callback("Удалить", "vacancy-delete"),
      ]);
      await ctx.reply(
        `ID: ${i + 1}\nНазвание: ${v.name}\nЗарплата: ${v.salary}\nОписание: ${
          v.description
        }`,
        msgmarkup
      );
      if (v.document) {
        await ctx.replyWithMediaGroup([
          {
            media: v.document,
            type: "document",
            caption: `Приложение к вакансии с ID: ${i + 1}`,
          },
        ]);
      }
    }
  },
};

export default kb;
