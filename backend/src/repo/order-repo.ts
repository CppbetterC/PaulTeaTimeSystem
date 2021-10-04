import { IOrder } from '../types/order'
import Order from '../models/order'
import { IParticipant } from '../types/participant'
import order from '../models/order'
import { IParticipantItem } from '../types/participantItem'
import { IOrderItem } from '../types/orderItem'

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

  // 新增至訂單選項表上
  addOrderItem(oid: String, items: IOrderItem): Promise<IOrder | null>

  // 新增一個發起人or參與人的品項
  addParticipantItem(oid: String, pid: String, items: IParticipantItem): Promise<IOrder | null>

  // 確認某參與者是否已經存在於某個訂單中的 participant array
  checkParticipantExist(oid: String, pid: String): Promise<Array<IOrder>>

  // 更改一個發起人or參與人的品項中的價錢or數量
  // updateParticipantItem(id: String, participantBody: IParticipant): Promise<IOrder | null>
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
    return Order.findOne({ invitationCode: code.toString() })
  }

  async addOrderItem(oid: String, items: IOrderItem): Promise<IOrder | null>{
    return Order.findOneAndUpdate(
      {"_id": oid.toString()}, 
      {"$push": {"orderItem": items}}
    )
  }


  async addParticipantItem(oid: String, pid: String, items: IParticipantItem): Promise<IOrder | null> {
    return Order.findOneAndUpdate(
      {
        "_id": oid.toString(),
        "participant": {
          "$elemMatch": {
            "PID": pid
          }
        }
      },
      {
        "$push": {
          "participant.$[a].items": {"$each": [items]}
        }
      }, 
      {
        "new": true,
        "arrayFilters":[
          {"a.PID": pid}
        ]
      }
    )
  }

  async checkOrderItemExist(oid: String, name: String): Promise<Array<IOrder>>{
    return Order.find(
      {
        "_id": oid.toString(),
        "orderItem": {
          "$elemMatch": {
            "itemName": name
          }
        }
      }
    )
  }

  async checkParticipantExist(oid:String, pid: String): Promise<Array<IOrder>> {
    return Order.find(
      {
        "_id": oid.toString(),
        "participant": {
          "$elemMatch": {
            "PID": pid
          }
        }
      }
    )
  }
  // async updateParticipantItem(id: String, participantBody: IParticipant): Promise<IOrder | null>{
  //     //Todo
  // }
}

export { OrderRepoImpl }


// const order = await Order.findById(id)
// order?.participant.push(participantBody)
// order?.save()
// return order