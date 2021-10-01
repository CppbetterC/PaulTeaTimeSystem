import { IRestaurant } from '../types/restaurant'
import Restaurant from '../models/restaurant'

interface ResaturantRepo {
  // Todo
}

class RestaurantRepoImpl implements ResaturantRepo {
  private constructor() {}

  static of(): RestaurantRepoImpl {
    return new RestaurantRepoImpl()
  }
  
  // Todo
  
}

export { RestaurantRepoImpl }
