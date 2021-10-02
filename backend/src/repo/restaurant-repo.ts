import { IRestaurant } from '../types/restaurant'
import Restaurant from '../models/restaurant'

interface ResaturantRepo {
  getRestaurant(): Promise<Array<IRestaurant>>
  addRestaurant(restaurantBody: IRestaurant): Promise<IRestaurant | null>
}

class RestaurantRepoImpl implements ResaturantRepo {
  private constructor() {}

  static of(): RestaurantRepoImpl {
    return new RestaurantRepoImpl()
  }

  async getRestaurant(): Promise<Array<IRestaurant>>{
    return Restaurant.find()
  }

  async addRestaurant(restaurantBody: IRestaurant): Promise<IRestaurant | null>{
    return Restaurant.create(restaurantBody)
  }
}

export { RestaurantRepoImpl }
