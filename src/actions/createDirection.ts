import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api"
import { userController } from "../controllers"
import { bot } from ".."
import { askUser } from "./askUser"

export const createDirection = async (msg: TelegramBot.Message) => {
    try {
        const findedUser = await userController.findUserByTgId(msg.from?.id)
        if (!findedUser?.is_admin) {
            bot.sendMessage(msg.chat.id, "Вы не админ")
        } else {
            const options: SendMessageOptions =
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Отмена", callback_data: 'cancel' }
                            ]
                        ]
                    }
                }

            askUser(msg, "Введите название направления",options ).then((res) => {
                bot.sendMessage(msg.chat.id, `Вы назвали направление: ${res}`)
            })
        }
    } catch(e) {
        bot.sendMessage(msg.chat.id, "Произошла ошибка");
        console.log(e)
    }
}