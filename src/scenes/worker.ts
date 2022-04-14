import { Markup, Scenes } from "telegraf";
import { Workers } from "../database";

const scene = new Scenes.WizardScene(
  "worker-scene",
  async (ctx) => {
    await ctx.reply("Введите ваше имя:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    await Workers.set(`${ctx.message.from.id}.firstname`, ctx.message.text);
    await ctx.reply("Введите вашу фамилию:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    await Workers.set(`${ctx.message.from.id}.lastname`, ctx.message.text);
    await ctx.reply("Введите краткое описание себя:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    await Workers.set(`${ctx.message.from.id}.description`, ctx.message.text);
    const markup = Markup.keyboard([["Пропустить"]])
      .resize()
      .oneTime();
    await ctx.reply(
      "Прикрепите документ в формате .pdf или .docx (необязательно)",
      markup
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    const document = ctx.message.document;
    const markup = Markup.keyboard(["Да", "Нет"]).oneTime().resize();
    //@ts-ignore
    if (ctx.message.text == "Пропустить") {
      //@ts-ignore
      const user = await Workers.get(String(ctx.message.from.id));
      await ctx.reply(
        //@ts-ignore
        `Проверьте, правильная ли информация?\nИмя: ${user.firstname}\nФамилия: ${user.lastname}\nОписание: ${user.description}`,
        markup
      );
      return ctx.wizard.next();
    }
    if (document && /\.(docx|pdf)$/i.test(document.file_name)) {
      await Workers.set(
        //@ts-ignore
        `${ctx.message.from.id}.document`,
        //@ts-ignore
        ctx.message.document.file_id
      );
      //@ts-ignore
      const user = await Workers.get(String(ctx.message.from.id));

      await ctx.reply(
        `Проверьте, правильная ли информация?\nИмя: ${user.firstname}\nФамилия: ${user.lastname}\nОписание: ${user.description}`,
        markup
      );
      await ctx.replyWithMediaGroup([
        {
          media: user.document,
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
      return await ctx.scene.enter("worker-scene");
    }
    const markup = Markup.keyboard([
      ["🔎 Вакансии", "🔭 Ваша анкета"],
      ["✏️ Заполнить заново"],
    ]).resize();
    await ctx.reply("Вы успешно зарегистрировались как работник", markup);
    return ctx.scene.leave();
  }
);
export default scene;
