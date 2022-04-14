import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
  name: "🔎 Вакансии",
  callback: async (ctx) => {
    return ctx.scene.enter("search-scene");
  },
};
export default kb;
