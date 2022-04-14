import { Markup, Scenes } from "telegraf";
import { Workers, Heads } from "../database";

const scene = new Scenes.WizardScene(
  "register-scene",
  async (ctx) => {
    const markup = Markup.keyboard([["Работодатель", "Работник"]]);
    await ctx.reply("Выберите роль:", markup.oneTime().resize());
    return ctx.wizard.next();
  },
  async (ctx) => {

    Workers.delete(String(ctx.message!.from.id));
    Heads.delete(String(ctx.message!.from.id));
    // @ts-ignore
    switch (ctx.message.text) {
      case "Работодатель":
        await ctx.scene.enter("head-scene");
        return ctx.scene.leave();
      case "Работник":
        await ctx.scene.enter("worker-scene");
        return ctx.scene.leave();
    }
  }
);
export default scene;
