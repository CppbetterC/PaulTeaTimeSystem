import { model, Schema } from 'mongoose'
import { IOrder } from '../types/order'

const participantItemSchema: Schema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  orderedNum: {
    type: Number,
    default: 0
  }
})

const participantSchema: Schema = new Schema({
  PID: {
    type: String,
    required: true
  },
  items: {
    type: [participantItemSchema],
    required: true
  }
})

const orderItemSchema: Schema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  }
})

const orderSchema: Schema = new Schema(
  {
    ownerID: {
      type: String,
      required: true
    },
    invitationCode: {
      type: Number,
      unique: true,
      required: true
    },
    authority: {
      type: Boolean,
      default: false
    },
    orderStatus: {
      type: Boolean,
      default: true
    },
    orderItem: {
      type: [orderItemSchema]
    },
    closeTimestamp: {
      type: String
    },
    restaurantID: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
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
