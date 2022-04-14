import { Scenes } from "telegraf";

export default interface ICommand {
  name: string;
  description: string;
  hidden?: boolean;
  callback: (context: Scenes.WizardContext) => any;
}
