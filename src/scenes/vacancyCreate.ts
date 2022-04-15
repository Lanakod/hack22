import { Markup, Scenes } from "telegraf";
import { Vacancies, VacanciesCollector, Workers } from "../database";

const scene = new Scenes.WizardScene(
  "vacancy-create-scene",
  async (ctx) => {
    await ctx.reply("Введите название вакансии:", {
      reply_markup: { remove_keyboard: true },
    });
    return ctx.wizard.next();
  },
  async (ctx) => {
    await VacanciesCollector.set(
      `${ctx.message!.from.id}.name`,
      //@ts-ignore
      ctx.message.text
    );
    await ctx.reply("Введите зарплату:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    await VacanciesCollector.set(
      `${ctx.message!.from.id}.salary`,
      //@ts-ignore
      ctx.message.text
    );
    await ctx.reply("Опишите вакаснию:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    await VacanciesCollector.set(
      `${ctx.message!.from.id}.description`,
      //@ts-ignore
      ctx.message.text
    );
    const markup = Markup.keyboard([["Пропустить"]]).resize();
    await ctx.reply(
      "Прикрепите документ в формате .pdf или .docx (необязательно)",
      markup
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    const {
      //@ts-ignore
      message: { document },
      message,
    } = ctx;
    const vacancy = await VacanciesCollector.get(String(message!.from.id));
    //@ts-ignore
    if (message.text == "Пропустить") {
      const markup = Markup.keyboard(["Да", "Нет"]).oneTime().resize();
      await ctx.reply(
        `Проверьте, правильная ли информация?\nНазвание: ${vacancy.name}\nЗарплата: ${vacancy.salary}\nОписание: ${vacancy.description}`,
        markup
      );
      return ctx.wizard.next();
    }
    if (document && /\.(docx|pdf)$/i.test(document.file_name)) {
      await VacanciesCollector.set(
        `${message!.from.id}.document`,
        document.file_id
      );
      const markup = Markup.keyboard(["Да", "Нет"]).oneTime().resize();
      await ctx.reply(
        `Проверьте, правильная ли информация?\nНазвание: ${vacancy.name}\nЗарплата: ${vacancy.salary}\nОписание: ${vacancy.description}`,
        markup
      );
      await ctx.replyWithMediaGroup([
        {
          media: vacancy.document,
          type: "document",
        },
      ]);
      return ctx.wizard.next();
    }
    await ctx.reply("Отправьте ваше резюме в формате .pdf или .docx");
  },
  async (ctx) => {
    //@ts-ignore
    if (ctx.message.text === "Нет") {
      await ctx.scene.leave();
      return await ctx.scene.enter("vacancy-create-scene");
    }
    const vacancy = await VacanciesCollector.get(`${ctx.message!.from.id}`);
    const wVacancies = (await Vacancies.get(`${ctx.message!.from.id}`)) || [];
    vacancy.id = `${ctx.message!.from.id}-${wVacancies.length}`;
    Vacancies.push(`${ctx.message!.from.id}`, vacancy);
    VacanciesCollector.delete(`${ctx.message!.from.id}`);
    const markup = Markup.keyboard([
      ["📑 Ваши вакансии", "🔭 Ваша анкета"],
      ["✏️ Заполнить заново"],
    ]).resize();
    await ctx.reply("Вы успешно создали вакансию", markup);
    return ctx.scene.leave();
  }
);
export default scene;
