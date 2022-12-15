import { Router } from 'express'
import echo from './echo'
import invert from './invert'

// Export the base-router
const baseRouter = Router()

// Setup routers
baseRouter.use('/echo', echo)
baseRouter.use('/invert', invert)

// Export default.
export default baseRouter
