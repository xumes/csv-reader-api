import CSVReader from './service/csv-reader'
import path from 'path'

const filePath = path.resolve(__dirname, 'public/matrix.csv')

const getData = async () => {
	const reader = new CSVReader()
	let data: number[][] = []
	try {
		data = await reader.read(filePath)

		console.log('echo\n', reader.format(data))
		console.log('is valid\n', reader.validate(data))
		console.log('flatten\n', await reader.flatten(data))
		console.log('sum\n', await reader.sum(data))
		console.log('multiply\n', await reader.multiply(data))

		const inverted = await reader.invert(data)
		console.log('inverted\n', reader.format(inverted))
	} catch (e) {
		console.log(e)
	}
}

getData()
