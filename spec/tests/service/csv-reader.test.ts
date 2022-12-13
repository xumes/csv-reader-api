import CSVReader from '../../../src/service/csv-reader'
import path from 'path'

describe('CSV Reader service', () => {
	describe('read', () => {
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
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const reader = new CSVReader()
			const result = await reader.read(fileMock)

			expect(result).toEqual(fileData)
		})
	})

	describe('flatten', () => {
		it('should throw error when no data is provided', async () => {
			const reader = new CSVReader()

			await expect(reader.flatten(null as any)).rejects.toThrow(
				new Error('Invalid data')
			)
		})

		it('should throw error when no data is not an array', async () => {
			const reader = new CSVReader()

			await expect(reader.flatten('1, 2, 3' as any)).rejects.toThrow(
				new Error('Invalid data')
			)
		})

		it('should return the matrix as a 1 line string, with values separated by commas on success', async () => {
			const fileData = '1,2,3,4,5,6,7,8,9'
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const reader = new CSVReader()
			const data = await reader.read(fileMock)
			const result = await reader.flatten(data)

			expect(result).toBe(fileData)
		})
	})

	describe('sum', () => {
		it('should throw error when no data is provided', async () => {
			const reader = new CSVReader()

			await expect(reader.sum(null as any)).rejects.toThrow(
				new Error('Invalid data')
			)
		})

		it('should throw error when no data is not an array', async () => {
			const reader = new CSVReader()

			await expect(reader.sum('1, 2, 3' as any)).rejects.toThrow(
				new Error('Invalid data')
			)
		})

		it('should return the matrix as a 1 line string, with values separated by commas on success', async () => {
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const reader = new CSVReader()
			const data = await reader.read(fileMock)
			const result = await reader.sum(data)

			expect(result).toBe(45)
		})
	})
})
