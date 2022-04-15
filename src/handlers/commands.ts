import { Scenes, Telegraf } from "telegraf";
import { BotCommand } from "telegraf/typings/core/types/typegram";
import * as path from "path";
import ICommand from "../interfaces/command";

export default async (bot: Telegraf<Scenes.WizardContext>, PG: any) => {
  const commands: BotCommand[] = [];
  const files = await PG(path.resolve("src", "commands", "*.ts"));

  console.log("\nLoading commands...");
  files.map(async (file: any) => {
    const command = (await require(file)).default as ICommand;
    if (!command.name)
      return console.log(file.split("/").pop(), "- Missing name ⚠️");
    if (!command.description)
      return console.log(command.name, "- Missing description ⚠️");
    if (!command.callback)
      return console.log(command.name, "- Missing callback ⚠️");
    console.log(command.name, "- Successful");
    if (!command.hidden)
      commands.push({
        command: command.name,
        description: command.description,
      });
    bot.command(command.name, command.callback);
  });
  setTimeout(async () => await bot.telegram.setMyCommands(commands), 1000);
};
