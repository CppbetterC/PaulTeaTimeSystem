import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { request } from 'http'
import { IOrder } from '../types/order'
import { IRestaurant } from '../types/restaurant'
import { IdParams } from '../types/id'
import { IParticipantItem } from '../types/participantItem'
import { OrderRepoImpl } from './../repo/order-repo'
import { RestaurantRepoImpl } from './../repo/restaurant-repo'
import { IParticipant } from '../types/participant'
import order from '../models/order'
import { fail } from 'assert'
import { IOrderItem } from '../types/orderItem'

const OrderRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const orderRepo = OrderRepoImpl.of()
  const restaurantRepo = RestaurantRepoImpl.of()

  // 取得所有訂單資訊
  server.get('/orders', async (request, reply) => {
    try {
      const order = await orderRepo.getOrder()
      return reply.status(200).send({ order })
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  // 新增一筆訂單
  server.post('/orders', async (request, reply) => {
    try {
      // (1) send restaurant info to db and get unique _id
      const phase1 = request.body as IRestaurant
      const restaurantBody: IRestaurant = {
        _id: undefined,
        restaurantName: phase1.restaurantName,
        restaurantURL: phase1.restaurantURL,
        restaurantMenu: phase1.restaurantMenu
      }
      const restaurant = await restaurantRepo.addRestaurant(restaurantBody)

      // (2) send order info to db
      // orderItem: phase2.orderItem 這邊需要在解析前端傳送的資料
      const phase2 = request.body as IOrder
      const orderBody: IOrder = {
        _id: phase2._id,
        ownerID: phase2.ownerID,
        invitationCode: phase2.invitationCode,
        authority: phase2.authority,
        orderStatus: phase2.orderStatus,
        orderItem: phase2.orderItem,
        closeTimestamp: phase2.closeTimestamp,
        restaurantID: restaurant?._id || '',
        participant: phase2.participant
      }
      const order = await orderRepo.addOrder(orderBody)
      return reply.status(201).send({ order })
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  // 依據訂單中的 _id 去修改一筆訂單的資訊
  server.put<{ Params: IdParams; Body: IOrder }>('/orders/:id', async (request, reply) => {
    try {
      const id = request.params.id
      const orderBody = request.body
      const order = await orderRepo.updateOrder(id, orderBody)
      if (order) {
        return reply.status(200).send({ order })
      } else {
        return reply.status(404).send({ msg: `Order #${id} Not Found` })
      }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  // 依據訂單中的 _id 去刪除一筆訂單
  server.delete<{ Params: IdParams }>('/orders/:id', async (request, reply) => {
    try {
      const id = request.params.id
      const order = await orderRepo.deleteOrder(id)
      if (order) {
        return reply.status(200).send({ order })
      } else {
        return reply.status(404).send({ msg: `Order #${id} Not Found` })
      }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  // 依據訂單中的 _id 取得一筆訂單的資訊
  server.get<{ Params: IdParams }>('/orders/:id', async (request, reply) => {
    try {
      const id = request.params.id
      const order = await orderRepo.getSpecificOrder(id)
      if (order) {
        return reply.status(200).send({ invitationCode: order.invitationCode.toString() })
      } else {
        return reply.status(404).send({ msg: `Order #${id} Not Found` })
      }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  // 依據 invitationCode 來取得一筆訂單的資訊
  server.get<{ Params: IdParams }>('/orders/search/:code', async (request, reply) => {
    try {
      const code = request.params.code
      const order = await orderRepo.getSpecificOrderByInvitationCode(code)
      if (order) {
        return reply.status(200).send(order)
      } else {
        return reply.status(404).send({ msg: `Order #${code} Not Found` })
      }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  // 依據 invitationCode 和 PID 來取得這個人點選的品項

  // 依據 invitationCode 和 PID 來新增這個人點選的品項
  // 假如這個人未曾於這份訂單中新增, 就直接 push 至中
  // 假如這個人有點過，請找到這個人並於下方新增新的品項
  // 注意，請避免重複出現相同工號的情況
  server.post<{ Params: IdParams }>('/orders/search/:code/:pid', async (request, reply) => {
    try {
      const code = request.params.code
      const pid = request.params.pid
      // 取得 order _id
      const order = await orderRepo.getSpecificOrderByInvitationCode(code)

      // 加入到 orderItem
      if (order) {
        // const firstFlag = await orderRepo.checkOrderItemExist(order?._id, pid)
        // if (firstFlag.length === 0){
        //   const reqOrderItem  = request.body as IOrderItem
        //   const oitemBody: IOrderItem = {itemName: reqOrderItem.itemName, itemPrice: reqOrderItem.itemPrice}
        //   const _ = await orderRepo.addOrderItem(order._id, oitemBody)
        // }

      // 加入到參與者的選定資訊中 participant 結構
      // 可以丟但是回應可能要再檢查一次
        const secondFlag = await orderRepo.checkParticipantExist(order?._id, pid)
        const reqParticipantItem  = request.body as IParticipantItem
        const pitemBody: IParticipantItem = {itemName: reqParticipantItem.itemName, orderedNum: reqParticipantItem.orderedNum}
        if (secondFlag.length > 0){
          const updatedOrder = await orderRepo.addParticipantItem(order?._id, pid, pitemBody)
          return reply.status(201).send({updatedOrder})
        }
        else{
          const orderBody: IOrder = {
            _id: order._id,
            ownerID: order.ownerID,
            invitationCode: order.invitationCode,
            authority: order.authority,
            orderStatus: order.orderStatus,
            orderItem: order.orderItem,
            closeTimestamp: order.closeTimestamp,
            restaurantID: order.restaurantID,
            participant: [{PID: pid.toString(), items: [pitemBody]}],
          }
          const updatedOrder = await orderRepo.updateOrder(order._id, orderBody)
          return reply.status(201).send({updatedOrder})
        }
      } else {
        return reply.status(404).send({ msg: `Order #${code} Not Found` })
      }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  done()
}

export { OrderRouter }
