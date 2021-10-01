import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse, request } from 'http'
import { REPL_MODE_SLOPPY } from 'repl'

import { establishConnection } from './plugins/mongoose'

import { RestaurantRouter } from './routes/restaurant'
import { OrderRouter } from './routes/order'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
  server.listen(port, (err, _) => {
    if (err) {
      console.error(err)
    }
    establishConnection()
  })

  server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  // Restaurant Router
  server.register(RestaurantRouter, { prefix: '/api' })

  // Order Router
  server.register(OrderRouter, { prefix: '/api' })

  return server
}

export { startFastify }
