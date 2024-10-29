import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api"
import { directionController, userController } from "../controllers"
import { bot } from ".."

export const deleteDirectionRequest = async (msg: TelegramBot.Message, directionId: string) => {
    try {
        const findedUser = await userController.findUserByTgId(msg.from?.id)
        if (!findedUser?.is_admin) {
            bot.sendMessage(msg.chat.id, "Вы не админ")
            return
        } else {
            const direction = await directionController.getDirectionById(directionId)

            const options: SendMessageOptions =
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Да", callback_data: 'delete_direction_confirm' },
                                { text: "Отмена", callback_data: 'cancel' }
                            ]
                        ]
                    }
                }

            bot.sendMessage(msg.chat.id, `Вы уверены, что хотите удалить направление ${direction?.name}`, options)

            // askUser(msg, `Вы уверены, что хотите удалить направление ${direction?.name}`,options )
            // .then((res) => {
            //     bot.sendMessage(msg.chat.id, `Вы назвали направление: ${res}`)
            // })
        }
    } catch(e) {
        bot.sendMessage(msg.chat.id, "Произошла ошибка");
        console.log(e)
    }
}