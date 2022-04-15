import IAction from '../interfaces/action';

const action: IAction = {
  name: 'hh-vacancy-next',
  callback: async (ctx) => {
    await ctx.deleteMessage();
    await ctx.answerCbQuery('Ищем новую вакансию');

    return ctx.scene.enter('list-vacancy-scene');
  },
};

export default action;
