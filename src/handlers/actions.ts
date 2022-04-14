import { Scenes, Telegraf } from "telegraf";
import * as path from "path";
import IAction from "../interfaces/action";

export default async (bot: Telegraf<Scenes.WizardContext>, PG: any) => {
  const files = await PG(path.resolve("src", "actions", "*.ts"));

  console.log("\nLoading actions...");

  files.map(async (file: any) => {
    const action = (await import(file)).default as IAction;
    if (!action.name)
      return console.log(file.split("/").pop(), "- Missing name ⚠️");
    if (!action.callback)
      return console.log(action.name, "- Missing callback ⚠️");
    console.log(action.name, "- Successful");
    bot.action(action.name, action.callback);
  });
};
