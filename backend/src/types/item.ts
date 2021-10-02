import {IRestaurant} from './restaurant'

interface IItem {
  itemName: string
  itemPrice: number
  itemNumber: number
  restaurantID: string  // foregin key to restaurant shcema
}
export { IItem }
