import { Router } from 'express'
import multer from 'multer'
import os from 'os'
import CSVReader from '../services/csv-reader'
import { HttpStatusCode } from '../@shared/http-status-code'
import { ParamMissingError } from '../@shared/errors'

const router = Router()

const upload = multer({ dest: os.tmpdir() })
// Setup routers
router.use('/', upload.single('file'), async (req, res) => {
	const { file } = req

	if (!file) {
		res.status(HttpStatusCode.BAD_REQUEST).json({
			error: 'File not found',
		})
		return
	}

	try {
		const data = await CSVReader.read(file.path)

		if (!CSVReader.isValid(data)) {
			res.status(HttpStatusCode.BAD_REQUEST).json({
				error: 'Invalid data',
			})
		}

		res.status(HttpStatusCode.OK).send(await CSVReader.flatten(data))
	} catch (err) {
		if (err instanceof ParamMissingError) {
			res.status(HttpStatusCode.BAD_REQUEST).json({
				error: err.message,
			})
		}
	}
})

// Export default.
export default router
