import express, { NextFunction, Request, Response } from 'express'
import { RouteNotFoundError, ServerError } from './@shared/errors'
import { HttpStatusCode } from './@shared/http-status-code'
import apiRouter from './routes/api'

// Constants
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Register status/health check route, this should always be at the root
app.get('/status', (req, res) => {
	const hc = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	}

	try {
		res.status(HttpStatusCode.OK).json(hc)
	} catch (e) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end()
	}
})

// api router
app.use('/', apiRouter)

// Error on route not found
app.get('*', (_: Request, res: Response) => {
	const err = new RouteNotFoundError()

	console.error({ error: err.message })
	res.status(404).json({ error: err.message })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error({
		path: req.path,
		method: req.method,
		message: err.message,
	})

	res.status(500).json(new ServerError().message)
})

export default app
