import ICommand from "../interfaces/command";

const cmd: ICommand = {
  name: "start",
  description: "Старт",
  hidden: true,
  callback: async (ctx) => {
    await ctx.reply(
      "Данный бот был разработан командой #1 от ГБПОУ Московский колледж бизнес технологий."
    );
    return await ctx.scene.enter("register-scene");
  },
};

export default cmd;
