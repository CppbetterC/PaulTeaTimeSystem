import { IParticipant } from './participant'

interface IOrder {
  ownerID: string
  invitationCode: number
  authority: boolean
  closeTimestamp: string
  restaurantID: string
  participant: Array<IParticipant>
}

export { IOrder }
