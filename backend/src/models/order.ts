import { model, Schema } from 'mongoose'
import { IOrder } from '../types/order'

const itemSchema: Schema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemNumber: {
    type: Number,
    default: 0
  },
  restaurantID: {
    type: String,
    required: true
  }
})

const participantSchema: Schema = new Schema({
  PID: {
    type: String,
    required: true
  },
  items: {
    type: [itemSchema],
    required: true
  }
})
0
const orderSchema: Schema = new Schema(
  {
    ownerID: {
      type: String,
      required: true
    },
    invitationCode: {
      type: Number,
      required: true
    },
    authority: {
      type: Boolean,
      default: false
    },
    closeTimestamp: {
      type: String
    },
    restaurantID: {
      type: String,
      required: true
    },
    participant: {
      type: [participantSchema]
    }
  },
  {
    timestamps: true
  }
)

export default model<IOrder>('Order', orderSchema)
