import { Router } from 'express'

// Export the base-router
const baseRouter = Router()

// Setup routers
baseRouter.use('/', (_req, res) => {
	res.json({ status: 'ok' })
})

// Export default.
export default baseRouter
