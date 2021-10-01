import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { IOrder } from '../types/order'

import { OrderRepoImpl } from './../repo/order-repo'

const OrderRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

  server.post('/orders', async (request, reply) => {
    const orderRepo = OrderRepoImpl.of()
    try {
      const orderBody = request.body as IOrder

      // Todo

      return reply.status(201).send({ order })
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })

  done()
}

export { OrderRouter }
