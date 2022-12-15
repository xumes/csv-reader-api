import { Router } from 'express'
import echo from './echo'

// Export the base-router
const baseRouter = Router()

// Setup routers
baseRouter.use('/echo', echo)

// Export default.
export default baseRouter
