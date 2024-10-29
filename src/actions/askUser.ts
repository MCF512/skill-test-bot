import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api";
import { bot } from "..";

export const askUser = async (msg: TelegramBot.Message, question: string, options: SendMessageOptions) => {
    try {
        return new Promise((resolve) => {
            bot.sendMessage(msg.chat.id, question, options);
    
            bot.once('message', (callbackMsg) => {
                if (callbackMsg.chat.id === msg.chat.id) {
                    resolve(callbackMsg.text);
                }
            });
        });
    } catch(e) {
        bot.sendMessage(msg.chat.id, "Произошла ошибка");
        console.log(e)
    }
}