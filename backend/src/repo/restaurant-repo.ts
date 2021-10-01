import { IRestaurant } from '../types/restaurant'
import Restaurant from '../models/restaurant'

interface ResaturantRepo {
  addRestaurant(restaurantBody: IRestaurant): Promise<IRestaurant | null>
}

class RestaurantRepoImpl implements ResaturantRepo {
  private constructor() {}

  static of(): RestaurantRepoImpl {
    return new RestaurantRepoImpl()
  }

  addRestaurant(restaurantBody: IRestaurant): Promise<IRestaurant | null>{
    return Restaurant.create(restaurantBody)
  }
}

export { RestaurantRepoImpl }
