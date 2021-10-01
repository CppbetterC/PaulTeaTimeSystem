import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { request } from 'http'
import { IOrder } from '../types/order'
import { IRestaurant } from '../types/restaurant'
import { OrderRepoImpl } from './../repo/order-repo'
import {RestaurantRepoImpl} from './../repo/restaurant-repo'

interface IdParams {
  id: String
}

const OrderRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const orderRepo = OrderRepoImpl.of()

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
      const orderBody = request.body as IOrder
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
        return reply.status(404).send({msg: `Order #${id} Not Found`})
    }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  server.delete<{Params: IdParams}>('/orders/:id', async (request, reply) => {
    try {
      const id = request.params.id
      const order = await orderRepo.deleteOrder(id)
      if (order) {
        return reply.status(200).send({ order })
    } else {
        return reply.status(404).send({msg: `Order #${id} Not Found`})
    }
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  done()
}

export { OrderRouter }
