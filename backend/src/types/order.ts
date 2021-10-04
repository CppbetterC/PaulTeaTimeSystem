import { IParticipant } from './participant'
import { IRestaurant } from './restaurant'
import { IOrderItem } from './orderItem'

interface IOrder {
  _id: string
  ownerID: string
  invitationCode: string
  authority: boolean
  orderStatus: boolean
  orderItem: [IOrderItem]
  closeTimestamp: string
  restaurantID: string // foregin key to restaurant shcema
  participant: [IParticipant] // participant-sub-documentation
}

export { IOrder }
