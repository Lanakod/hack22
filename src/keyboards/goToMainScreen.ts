import { Markup } from "telegraf";
import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
  name: "🏠 На главную",
  callback: async (ctx) => {
    const markup = Markup.keyboard([
      ["📑 Ваши вакансии", "🔭 Ваша анкета"],
      ["✏️ Заполнить заново"],
    ]).resize();
    await ctx.reply("Выберите действие:", markup);
  },
};

export default kb;
