import mongoose, { model, Schema } from 'mongoose'
import { IRestaurant } from '../types/restaurant'

const restaurantSchema: Schema = new Schema(
  {
    restaurantName: {
      type: String,
      required: true
    },
    restaurantURL: {
      type: String,
      required: true
    },
    restaurantMenu: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default model<IRestaurant>('Restaurant', restaurantSchema)
