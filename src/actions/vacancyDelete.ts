import IAction from "../interfaces/action";
import { Vacancies } from "../database";

const action: IAction = {
  name: "vacancy-delete",
  callback: async (ctx) => {
    //@ts-ignore
    const { text } = ctx.callbackQuery!.message;
    const id = text.replace("\n", " ").split(" ")[1];
    const userid = ctx.callbackQuery!.from.id;
    const vacancies = (await Vacancies.get(`${userid}`)) || [];
    if (vacancies.length < 1) {
      return await ctx.answerCbQuery("Ошибочка какая-то");
    }
    const newVacancies = vacancies.filter(
      (v: object, i: number) => i !== id - 1
    );
    await Vacancies.set(`${userid}`, newVacancies);
    return await ctx.deleteMessage(ctx.callbackQuery!.message!.message_id);
  },
};

export default action;
