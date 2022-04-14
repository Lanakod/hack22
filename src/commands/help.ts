import ICommand from "../interfaces/command";

const cmd: ICommand = {
  name: "help",
  description: "Помощь",
  callback: (ctx) => {
    ctx.reply("Доступные команды:\n/help - помощь\n/menu - главное меню");
  },
};
export default cmd;
