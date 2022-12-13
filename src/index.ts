import CSVReader from './service/csv-reader'
import path from 'path'

const filePath = path.resolve(__dirname, 'public/matrix.csv')

const getData = async () => {
	const reader = new CSVReader()
	let data: number[][] = []
	try {
		data = await reader.read(filePath)
		data.forEach((value) => console.log(value))

		console.log('flatten', await reader.flatten(data))

		console.log('sum', await reader.sum(data))

		console.log('multiply', await reader.multiply(data))
	} catch (e) {
		console.log(e)
	}
}

getData()
