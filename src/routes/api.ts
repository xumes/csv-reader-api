import { Router } from 'express'
import echo from './echo'
import invert from './invert'
import flatten from './flatten'
import sum from './sum'
import multiply from './multiply'

// Export the base-router
const baseRouter = Router()

// Setup routers
baseRouter.use('/echo', echo)
baseRouter.use('/invert', invert)
baseRouter.use('/flatten', flatten)
baseRouter.use('/sum', sum)
baseRouter.use('/multiply', multiply)

// Export default.
export default baseRouter
