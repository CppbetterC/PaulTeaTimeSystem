import { IOrder } from '../types/order'
import { IItem } from '../types/item'
import Order from '../models/order'

interface OrderRepo {
      // Todo
}

class OrderRepoImpl implements OrderRepo {
  private constructor() {}

  static of(): OrderRepoImpl {
    return new OrderRepoImpl()
  }
  
      // Todo
}

export { OrderRepoImpl }
