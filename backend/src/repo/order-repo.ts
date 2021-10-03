import { IOrder } from '../types/order'
import Order from '../models/order'

interface OrderRepo {
  // 取得 Database 中的所有訂單
  getOrder(): Promise<Array<IOrder>>

  // 新增一筆新訂單至 Database
  addOrder(orderBody: IOrder): Promise<IOrder | null>

  // 根據訂單_id來更新一筆訂單的欄位資料
  updateOrder(id: String, orderBody: IOrder): Promise<IOrder | null>

  // 根據訂單_id刪除訂單
  deleteOrder(id: String): Promise<IOrder | null>

  // 根據訂單_id來取得資訊
  getSpecificOrder(id: String): Promise<IOrder | null>
}

class OrderRepoImpl implements OrderRepo {
  private constructor() {}

  static of(): OrderRepoImpl {
    return new OrderRepoImpl()
  }

  async getOrder(): Promise<Array<IOrder>> {
    return Order.find()
  }

  async addOrder(orderBody: IOrder): Promise<IOrder | null> {
    return Order.create(orderBody)
  }

  async updateOrder(id: String, orderBody: IOrder): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(id, orderBody)
  }

  async deleteOrder(id: String): Promise<IOrder | null> {
    return Order.findByIdAndDelete(id)
  }

  async getSpecificOrder(id: String): Promise<IOrder | null> {
    return Order.findById(id)
  }
}

export { OrderRepoImpl }
