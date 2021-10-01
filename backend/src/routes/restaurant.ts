import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { IRestaurant } from '../types/restaurant'
import { RestaurantRepoImpl } from './../repo/restaurant-repo'

const RestaurantRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  // Todo

  done()
}

export { RestaurantRouter }
