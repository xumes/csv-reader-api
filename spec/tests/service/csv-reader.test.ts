import CSVReader from '../../../src/service/csv-reader'
import path from 'path'
import { ParamInvalidError, ParamMissingError } from '../../../src/@shared/errors'

describe('CSV Reader service', () => {
	describe('read', () => {
		it('should throw ParamMissingError when a file is not provided', async () => {
			const file = ''
			const reader = new CSVReader()

			await expect(reader.read(file)).rejects.toThrow(
				new ParamMissingError()
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
		it('should throw ParamInvalidError when no data is provided', async () => {
			const reader = new CSVReader()

			await expect(reader.flatten(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			const reader = new CSVReader()

			await expect(reader.flatten('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
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
		it('should throw ParamInvalidError when no data is provided', async () => {
			const reader = new CSVReader()

			await expect(reader.sum(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			const reader = new CSVReader()

			await expect(reader.sum('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should return the sum of the integers in the matrix on success', async () => {
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const reader = new CSVReader()
			const data = await reader.read(fileMock)
			const result = await reader.sum(data)

			expect(result).toBe(45)
		})
	})

	describe('multiply', () => {
		it('should throw ParamInvalidError when no data is provided', async () => {
			const reader = new CSVReader()

			await expect(reader.multiply(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			const reader = new CSVReader()

			await expect(reader.multiply('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should return the product of the integers in the matrix on success', async () => {
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const reader = new CSVReader()
			const data = await reader.read(fileMock)
			const result = await reader.multiply(data)

			expect(result).toBe(362880)
		})
	})

	describe('invert', () => {
		it('should throw ParamInvalidError when no data is provided', async () => {
			const reader = new CSVReader()

			await expect(reader.invert(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			const reader = new CSVReader()

			await expect(reader.invert('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should return the matrix as a string in matrix format where the columns and rows are inverted on success', async () => {
			const fileData = [
				['1', '4', '7'],
				['2', '5', '8'],
				['3', '6', '9'],
			]
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const reader = new CSVReader()
			const data = await reader.read(fileMock)
			const result = await reader.invert(data)

			expect(result).toEqual(fileData)
		})
	})

	describe('validate', () => {
		it('should return false if array has more cols than rows', async () => {
			const dummy = [
				[1, 2, 3],
				[4, 5, 6],
			]
			const reader = new CSVReader()

			const isValid = reader.validate(dummy)
			expect(isValid).toBe(false)
		})

		it('should return false if array has more rows than cols', async () => {
			const dummy = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[10, 11, 12],
			]
			const reader = new CSVReader()

			const isValid = reader.validate(dummy)
			expect(isValid).toBe(false)
		})

		it('should return false the input is not an array', async () => {
			const dummy = '0'
			const reader = new CSVReader()

			const isValid = reader.validate(dummy as any)
			expect(isValid).toBe(false)
		})

		it('should return false the input is not a matrix', async () => {
			const dummy = [1, 2, 3]
			const reader = new CSVReader()

			const isValid = reader.validate(dummy as any)
			expect(isValid).toBe(false)
		})

		it('should return false the input is an empty array', async () => {
			const dummy = [
				[],
			]
			const reader = new CSVReader()

			const isValid = reader.validate(dummy as any)
			expect(isValid).toBe(false)
		})

		it('should return true if array is valid', async () => {
			const dummy = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]
			const reader = new CSVReader()

			const isValid = reader.validate(dummy)
			expect(isValid).toBe(true)
		})
	})

	describe('format', () => {
		it('should return a string with line break', async () => {
			const fileData = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]
			const expected = `1,2,3
4,5,6
7,8,9`
			const reader = new CSVReader()

			const formatted = reader.format(fileData)
			expect(formatted).toEqual(expected)
		})

		
	})
})
