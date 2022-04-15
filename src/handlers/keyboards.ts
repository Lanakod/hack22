import { Scenes, Telegraf } from "telegraf";
import * as path from "path";
import IKeyboard from "../interfaces/keyboard";

export default async (bot: Telegraf<Scenes.WizardContext>, PG: any) => {
  const files = await PG(path.resolve("src", "keyboards", "*.ts"));

  console.log("\nLoading keyboards...");
  files.map(async (file: any) => {
    const kb = (await import(file)).default as IKeyboard;
    if (!kb.name)
      return console.log(file.split("/").pop(), "- Missing name ⚠️");
    if (!kb.callback) return console.log(kb.name, "- Missing callback ⚠️");
    console.log(kb.name, "- Successful");
    bot.hears(kb.name, kb.callback);
  });
};
