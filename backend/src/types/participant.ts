import { IParticipantItem } from './participantItem'

interface IParticipant {
  PID: string
  items: [IParticipantItem] // item-sub-documentation
}

export { IParticipant }
