import { model, Schema } from "mongoose"
import { DirectionSchema } from "../types"

const directionSchema = new Schema<DirectionSchema>({
    name: {type: String, required: true},
    themes: [Number]
})

export default model<DirectionSchema>('direction', directionSchema)