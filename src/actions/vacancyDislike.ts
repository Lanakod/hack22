import IAction from "../interfaces/action";
import { Vacancies } from "../database";

const action: IAction = {
  name: "vacancy-dislike",
  callback: async (ctx) => {
    await ctx.deleteMessage();
    await ctx.answerCbQuery("Ищем новую вакансию");

    return ctx.scene.enter("search-scene");
  },
};

export default action;
