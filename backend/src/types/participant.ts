import { IItem } from './item'

interface IParticipant {
  PID: string
  items: Array<IItem> // item-sub-documentation
}

export { IParticipant }
