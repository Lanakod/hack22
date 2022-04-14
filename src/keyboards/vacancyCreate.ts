import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
  name: "➕ Создать",
  callback: async (ctx) => {
    return await ctx.scene.enter("vacancy-create-scene");
  },
};

export default kb;
