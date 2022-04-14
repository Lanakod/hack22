import IAction from "../interfaces/action";
import {Vacancies} from "../database";

const action: IAction = {
    name: "vacancy-sleep",
    callback: async (ctx) => {
        try {
            await ctx.answerCbQuery('Поиск прекращён')
            return await ctx.deleteMessage();
        } catch (e) {
            console.log(e)
        }
    },
};

export default action;
