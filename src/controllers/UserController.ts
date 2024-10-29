import {User } from "../models";
import { UserScmema } from "../types";

// interface UserControllerInterface {
//     createUser: (userData: UserScmema) => void
//     findUserByTgId: (tgId: number) => Promise<UserScmema | undefined | null>
// }

// class UserController implements UserControllerInterface {
class UserController {
    async createUser(userData: UserScmema) {
        try {
            const user = new User(userData)
            await user.save()
        } catch (e) {
            console.log(e)
        }
    }

    async findAndMakeAdmin(tgId: number | undefined) {
        try {
            const user = await User.findOneAndUpdate({tg_id: tgId}, {is_admin: true})
            return user
        } catch(e) {
            console.log(e)
        }  
    }

    async deleteUser(tgId: number | undefined) {
        try {
            await User.findOneAndDelete({tg_id: tgId})
        } catch(e) {
            console.log(e)
        }   
    }

    async findUserByTgId(tgId: number | undefined) {
        console.log(tgId)
        try {
            const user  = await User.findOne({ tg_id: tgId })
            return user
        } catch (e) {
            console.log(e)
        }
    }
}

export const userController = new UserController()
