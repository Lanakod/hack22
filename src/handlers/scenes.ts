import { Scenes, session, Telegraf } from "telegraf";
import * as path from "path";

export default async (bot: Telegraf<Scenes.WizardContext>, PG: any) => {
  const files = await PG(path.resolve("src", "scenes", "*.ts"));

  console.log("\nLoading scenes...");
  const scenes: Scenes.WizardScene<any>[] = [];
  await files.map(async (file: any) => {
    const scene = (await require(file)).default;
    console.log(file.split("/").pop(), "- Successful");
    scenes.push(scene);
  });

  const stage = new Scenes.Stage<Scenes.WizardContext>(scenes);
  bot.use(session());
  bot.use(stage.middleware());
};
