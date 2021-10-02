import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { IRestaurant } from '../types/restaurant'
import { RestaurantRepoImpl } from './../repo/restaurant-repo'

const RestaurantRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

  const restaurantRepo = RestaurantRepoImpl.of()

  server.get('/restaurants', async (request, reply) => {
    try {
      const restaurant = await restaurantRepo.getRestaurant()
      return reply.status(200).send({ restaurant })
    } catch (error) {
      return reply.status(500).send({ msg: 'Internal Server Error' })
    }
  })
  done()
}

export { RestaurantRouter }