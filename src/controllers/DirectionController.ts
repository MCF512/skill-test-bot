import {Direction } from "../models";
import { DirectionSchema } from "../types";

// interface DirectionControllerInterface {
//     createDirection: (directionData: DirectionSchema) => Promise<boolean>
//     getDirections: () => Promise<DirectionSchema[] | undefined>
// }

// export class DirectionController implements DirectionControllerInterface {
export class DirectionController {
    async createDirection(directionData: DirectionSchema) {
        try {
            const direction = new Direction(directionData)
            await direction.save()

            return true
        } catch(e) {
            console.log(e)
            return false
        }
    }

    async deleteDirection(id: string) {
        try {
            Direction.findByIdAndDelete(id)
        } catch(e) {
            console.log(e)
        }
    }

    async getDirectionById(id: string) {
        try {
            return await Direction.findById(id)
        } catch(e) {
            console.log(e)
        }
    }

    async getDirections() {
        try {
            return await Direction.find()
        } catch(e) {
            console.log(e)
        }
    }
}

export const directionController = new DirectionController()