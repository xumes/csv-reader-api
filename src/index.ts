import CSVReader from './service/csv-reader'
import path from 'path'

const filePath = path.resolve(__dirname, 'public/matrix.csv')

const getData = async () => {
	const reader = new CSVReader()
	let data: string[] = []
	try {
		data = await reader.read(filePath)
		data.forEach((value) => console.log(value))

		reader.flatten(data)
	} catch (e) {
		console.log(e)
	}
}

getData()
