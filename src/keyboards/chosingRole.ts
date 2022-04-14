import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
  name: ["Работодатель", "Работник"],
  callback: async (ctx) => {
    return ctx.scene.enter("register-scene");
  },
};
export default kb;
