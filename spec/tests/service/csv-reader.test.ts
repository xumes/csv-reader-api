import CSVReader from '../../../src/service/csv-reader'

describe('CSV Reader service', () => {
	it('should throw FileNotFoundError when a file is not provided', async () => {
		const file = ''
		const reader = new CSVReader()

		await expect(reader.read(file)
		).rejects.toThrow(new Error('File Not Found!'))
	})
})