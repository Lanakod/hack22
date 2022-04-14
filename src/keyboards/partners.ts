import IKeyboard from '../interfaces/keyboard';

const kb: IKeyboard = {
  name: ['Партнеры'],
  callback: async (ctx) => {
    return ctx.scene.enter('partners-scene');
  },
};
export default kb;
