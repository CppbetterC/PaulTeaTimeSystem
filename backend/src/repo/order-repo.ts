import { IOrder } from '../types/order'
import Order from '../models/order'
import { IParticipant } from '../types/participant'
import order from '../models/order'

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

  // 根據邀請碼 invitationCode 來取得資訊
  getSpecificOrderByInvitationCode(code: String): Promise<IOrder | null>

  // 新增一個發起人or參與人的品項
  addParticipantItem(id: String, participantBody: IParticipant): Promise<IOrder | null>
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

  async getSpecificOrderByInvitationCode(code: String): Promise<IOrder | null> {
    return Order.findOne({ invitationCode: Number(code) })
  }

  async addParticipantItem(id: String, participantBody: IParticipant): Promise<IOrder | null> {
    const order = await Order.findById(id)
    order?.participant.push(participantBody)
    order?.save()
    return order
  }
}

export { OrderRepoImpl }