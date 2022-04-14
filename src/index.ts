import bot from "./bot";
import { commands, scenes, keyboards, actions } from "./handlers";

import { promisify } from "util";
import { glob } from "glob";
const PG = promisify(glob);
const bootstrap = async () => {
  await scenes(bot, PG);
  await keyboards(bot, PG);
  await commands(bot, PG);
  await actions(bot, PG);

  bot
    .launch()
    .then(() => console.log("\nApplication started"))
    .catch((e) => console.log("[ERROR]: ", e));
};

bootstrap();
