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
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
    // 假如這邊要設定為 required 的話
    // 我們需要知道怎麼去抓到 restaurantID
    // required: true
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
      unique: true,
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
