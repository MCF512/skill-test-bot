import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api";
import { bot } from "..";

import { userController, directionController } from "../controllers";

export const onStartCommand = async (msg: TelegramBot.Message) => {
    try {
        const findedUser = await userController.findUserByTgId(msg.from?.id)
        if (!findedUser) {
            await userController.createUser({ tg_id: msg.from?.id, chat_id: msg.chat.id, is_admin: true })
        }

        const isAdmin = findedUser?.is_admin

        const directionsRes = await directionController.getDirections()

        const directions = directionsRes ? directionsRes?.map(({name}) => {
            return {text: name, callback_data: name}
        }) : []
        const options: SendMessageOptions = isAdmin ?
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            ...directions,
                        ],
                        [
                            { text: "Функции админа", callback_data: 'admin' }
                        ]
                    ]
                }
            }
            :
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            ...directions,
                        ],
                    ]
                }
            }
        bot.sendMessage(msg.chat.id, 'Добро пожаловать! Выберите направление', options)

    } catch(e) {
        bot.sendMessage(msg.chat.id, 'Произошла ошибка')
        console.log(e)
    }
}