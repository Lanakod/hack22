import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
  name: "✏️ Заполнить заново",
  callback: async (ctx) => {
    return ctx.scene.enter("register-scene");
  },
};
export default kb;
