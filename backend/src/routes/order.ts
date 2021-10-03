import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { request } from 'http'
import { IOrder } from '../types/order'
import { IRestaurant } from '../types/restaurant'
import { OrderRepoImpl } from './../repo/order-repo'
import { RestaurantRepoImpl } from './../repo/restaurant-repo'

interface IdParams {
  id: String
}

const OrderRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const orderRepo = OrderRepoImpl.of()
  const restaurantRepo = RestaurantRepoImpl.of()

  server.get('/orders', async (request, reply) => {
    try {
      const order = await orderRepo.getOrder()
      return reply.status(200).send({ order })
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

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
      const phase2 = request.body as IOrder
      const orderBody: IOrder = {
        ownerID: phase2.ownerID,
        invitationCode: phase2.invitationCode,
        authority: phase2.authority,
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

  server.get<{ Params: IdParams }>('/orders/:id', async (request, reply) => {
    try {
      const id = request.params.id
      const order = await orderRepo.getSpecificOrder(id)
      if (order) {
        return reply.status(200).send({ "invitationCode": order.invitationCode.toString() })
      } else {
        return reply.status(404).send({ msg: `Order #${id} Not Found` })
      }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  done()
}

export { OrderRouter }
