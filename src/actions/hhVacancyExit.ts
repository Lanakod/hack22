import IAction from '../interfaces/action';

const action: IAction = {
  name: 'hh-vacancy-exit',
  callback: async (ctx) => {
    await ctx.deleteMessage();
    await ctx.answerCbQuery('Ищем новую вакансию');

    await ctx.scene.leave();
    return await ctx.scene.enter('partners-scene');
  },
};

export default action;
