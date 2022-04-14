import {Heads, Workers} from "../database";
import IKeyboard from "../interfaces/keyboard";

const kb: IKeyboard = {
    name: "🔭 Ваша анкета",
    callback: async (ctx) => {
        const data =
            (await Heads.get(String(ctx.message!.from.id))) ||
            Workers.get(String(ctx.message!.from.id));
        await ctx.reply(
            `Ваша анкета:\n\nИмя: ${data.firstname}\nФамилия: ${data.lastname}\nОписание: ${data.description}`
        );
        if (data.document)
            await ctx.replyWithMediaGroup([
                {
                    media: data.document,
                    type: "document",
                },
            ]);
        return;
    },
};

export default kb;
