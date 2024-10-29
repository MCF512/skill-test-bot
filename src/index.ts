import { config } from "dotenv";
config();

import TelegramBot, { SendMessageOptions } from "node-telegram-bot-api";
import mongoose from "mongoose";
import { userController } from "./controllers/UserController";
import { DirectionController } from "./controllers/DirectionController";
import { onStartCommand } from "./actions/onStartCommand";
import { createDirection } from "./actions/createDirection";
import { CallbackQueries, Commands } from "./types";
const token: string = process.env.BOT_API ?? '';

export const bot = new TelegramBot(token, { polling: true })

const directionController = new DirectionController()

function askUser(chatId: number, question: string) {
    return new Promise((resolve) => {
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
        bot.sendMessage(chatId, question, options);

        bot.once('message', (msg) => {
            if (msg.chat.id === chatId) {
                resolve(msg.text);
            }
        });
    });
}

const start = async () => {
    try {
        mongoose
            .connect(process.env.DB_CONNECTION_STRING ?? '')
            .then(() => console.log("Connected to DB"))
            .catch((err) => console.log(err))

        bot.on('message', async msg => {
            if (msg.text === Commands.START) {
                onStartCommand(msg)
            } 
            
            if (msg.text === Commands.CREATE_DIRECTION) {
                createDirection(msg)
            }
        })

        bot.on('callback_query', msg => {
            if (msg.data === CallbackQueries.SHOW_ADMIN_ACTIONS) {
                const options: SendMessageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Создать направление", callback_data: 'createDirection' },
                                { text: "Назад", callback_data: CallbackQueries.CANCEL_DIRECTION_CREATING },

                            ],
                        ]
                    }
                }

                bot.sendMessage(msg.from.id, 'Что хотите сделать?', options)
            }

            if (msg.data === CallbackQueries.CANCEL_DIRECTION_CREATING) {
                const options: SendMessageOptions = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Создать направление", callback_data: 'createDirection' }
                            ],
                        ]
                    }
                }

                bot.sendMessage(msg.from.id, 'Что хотите сделать?', options)
            }

            if (msg.data === 'createDirection') {
                askUser(msg.from.id, "Введите название направления")
                    .then(async (res) => {
                        const directionIsCreated = await directionController.createDirection({ name: String(res) })

                        bot.sendMessage(msg.from.id, directionIsCreated ? `Вы создали направление: ${res}` : `При создании направления произошла ошибка`)
                    })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

start()