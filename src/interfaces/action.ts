import { Scenes } from "telegraf";

export default interface IAction {
  name: string | string[];
  callback: (context: Scenes.WizardContext) => any;
}
