import { HHVacancyCollector } from '../database';
import IAction from '../interfaces/action';

const action: IAction = {
  name: 'hh-vacancy-exit',
  callback: async (ctx) => {
    const id = ctx.message?.from.id || ctx.callbackQuery?.from.id;
    await ctx.deleteMessage();
    await HHVacancyCollector.delete(String(id));

    await ctx.scene.leave();
    return ctx.scene.enter('partners-scene');
  },
};

export default action;
