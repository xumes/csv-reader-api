import { Router } from 'express'
import echo from './echo'
import invert from './invert'
import flatten from './flatten'

// Export the base-router
const baseRouter = Router()

// Setup routers
baseRouter.use('/echo', echo)
baseRouter.use('/invert', invert)
baseRouter.use('/flatten', flatten)

// Export default.
export default baseRouter
