import { IParticipant } from './participant'
import {IRestaurant} from './restaurant'

interface IOrder {
  ownerID: string
  invitationCode: number
  authority: boolean
  closeTimestamp: string
  restaurantID: string              // foregin key to restaurant shcema
  participant: Array<IParticipant>  // participant-sub-documentation
}

export { IOrder }
