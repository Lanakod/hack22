import { Markup, Scenes } from "telegraf";
import { Heads, Workers } from "../database";

const scene = new Scenes.WizardScene(
  "head-scene",
  async (ctx) => {
    await ctx.reply("Введите ваше имя:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    await Heads.set(`${ctx.message.from.id}.firstname`, ctx.message.text);
    await ctx.reply("Введите вашу фамилию:");
    return ctx.wizard.next();
  },

  async (ctx) => {
    //@ts-ignore
    await Heads.set(`${ctx.message.from.id}.lastname`, ctx.message.text);
    await ctx.reply("Введите краткое описание себя:");
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    await Heads.set(`${ctx.message.from.id}.description`, ctx.message.text);

    const user = await Heads.get(String(ctx.message!.from.id));
    const markup = Markup.keyboard(["Да", "Нет"]).oneTime().resize();
    await ctx.reply(
      `Проверьте, правильная ли информация?\nИмя: ${user.firstname}\nФамилия: ${user.lastname}\nОписание: ${user.description}`,
      markup
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    //@ts-ignore
    if (ctx.message.text === "Нет") {
      await ctx.scene.leave();
      return await ctx.scene.enter("worker-scene");
    }
    const markup = Markup.keyboard([
      ["📑 Ваши вакансии", "🔭 Ваша анкета"],
      ["✏️ Заполнить заново"],
    ]).resize();
    await ctx.reply("Вы успешно зарегистрировались как работодатель", markup);
    return ctx.scene.leave();
  }
);

export default scene;
