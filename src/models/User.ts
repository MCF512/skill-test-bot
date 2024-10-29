import { Schema, model } from "mongoose";
import { UserScmema } from "../types";

const userSchema = new Schema<UserScmema>({
    chat_id: {type: Number, reqired: true},
    tg_id: {type: Number, required: true},
    is_admin: {type: Boolean, required: true}
})

export default model<UserScmema>('user', userSchema)