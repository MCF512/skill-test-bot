import { SendMessageOptions } from "node-telegram-bot-api";

export const adminActionsOptions: SendMessageOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Создать направление", callback_data: 'createDirection' },
                { text: "Назад", callback_data: 'back' },
            ],
        ]
    }
}