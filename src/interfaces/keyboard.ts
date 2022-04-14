import { Scenes } from "telegraf";

export default interface IKeyboard {
  name: string | string[];
  callback: (context: Scenes.WizardContext) => any;
}
