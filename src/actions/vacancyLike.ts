import IAction from "../interfaces/action";
import { Vacancies } from "../database";

const action: IAction = {
  name: "vacancy-like",
  callback: async (ctx) => {
    //@ts-ignore
    const { text } = ctx.callbackQuery!.message;
    const from = ctx.callbackQuery!.from;
    await ctx.deleteMessage();

    const words = text.replace("\n", " ").split(" ");
    const userId = words.pop().split("-").shift();
    await ctx.telegram.sendMessage(
      userId,
      `На вашу вакансию "${words[1]}" откликнулся работник.\nСвяжитесь с работником - @${from.username}`
    );

    await ctx.answerCbQuery("Ищем новую вакансию");

    return ctx.scene.enter("search-scene");
  },
};

export default action;
