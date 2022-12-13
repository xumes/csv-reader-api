import CSVReader from '../../../src/service/csv-reader'
import path from 'path'

describe('CSV Reader service', () => {
	it('should throw FileNotFoundError when a file is not provided', async () => {
		const file = ''
		const reader = new CSVReader()

		await expect(reader.read(file)).rejects.toThrow(
			new Error('File Not Found!')
		)
	})

	it('should return data on success', async () => {
		const fileData = [
			['1', '2', '3'],
			['4', '5', '6'],
			['7', '8', '9'],
		]
		const fileMock = path.resolve(__dirname, 'matrix.csv')
		const reader = new CSVReader()
		const result = await reader.read(fileMock)

		expect(result).toEqual(fileData)
	})
})
