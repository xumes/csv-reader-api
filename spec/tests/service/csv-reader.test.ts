/* eslint-disable @typescript-eslint/no-explicit-any */
import CSVReader from '../../../src/services/csv-reader'
import path from 'path'
import {
	ParamInvalidError,
	ParamMissingError,
} from '../../../src/@shared/errors'

describe('CSV Reader service', () => {
	describe('read', () => {
		it('should throw ParamMissingError when a file is not provided', async () => {
			const file = ''

			await expect(CSVReader.read(file)).rejects.toThrow(
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
			const result = await CSVReader.read(fileMock)

			expect(result).toEqual(fileData)
		})
	})

	describe('flatten', () => {
		it('should throw ParamInvalidError when no data is provided', async () => {
			await expect(CSVReader.flatten(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			await expect(CSVReader.flatten('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should return the matrix as a 1 line string, with values separated by commas on success', async () => {
			const fileData = '1,2,3,4,5,6,7,8,9'
			const fileMock = path.resolve(__dirname, 'mock.csv')

			const data = await CSVReader.read(fileMock)
			const result = await CSVReader.flatten(data)

			expect(result).toBe(fileData)
		})
	})

	describe('sum', () => {
		it('should throw ParamInvalidError when no data is provided', async () => {
			await expect(CSVReader.sum(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			await expect(CSVReader.sum('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamNotANumberError when one or more element in the array is not a number', async () => {
			const input = [
				[1, 2, 3],
				[4, 'S', 6],
			]

			await expect(CSVReader.sum(input as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should return the sum of the integers in the matrix on success', async () => {
			const fileMock = path.resolve(__dirname, 'mock.csv')
			const data = await CSVReader.read(fileMock)
			const result = await CSVReader.sum(data)

			expect(result).toBe(45)
		})
	})

	describe('multiply', () => {
		it('should throw ParamInvalidError when no data is provided', async () => {
			await expect(CSVReader.multiply(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			await expect(CSVReader.multiply('1, 2, 3' as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamNotANumberError when one or more element in the array is not a number', async () => {
			const input = [
				[1, 2, 3],
				[4, 'S', 6],
			]

			await expect(CSVReader.multiply(input as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should return the product of the integers in the matrix on success', async () => {
			const fileMock = path.resolve(__dirname, 'mock.csv')

			const data = await CSVReader.read(fileMock)
			const result = await CSVReader.multiply(data)

			expect(result).toBe(362880)
		})
	})

	describe('invert', () => {
		it('should throw ParamInvalidError when no data is provided', async () => {
			await expect(CSVReader.invert(null as any)).rejects.toThrow(
				new ParamInvalidError()
			)
		})

		it('should throw ParamInvalidError when no data is not an array', async () => {
			await expect(CSVReader.invert('1, 2, 3' as any)).rejects.toThrow(
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

			const data = await CSVReader.read(fileMock)
			const result = await CSVReader.invert(data)

			expect(result).toEqual(fileData)
		})
	})

	describe('isValid', () => {
		it('should return false if array has more cols than rows', async () => {
			const dummy = [
				[1, 2, 3],
				[4, 5, 6],
			]

			const isValid = CSVReader.isValid(dummy)
			expect(isValid).toBe(false)
		})

		it('should return false if array has more rows than cols', async () => {
			const dummy = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[10, 11, 12],
			]

			const isValid = CSVReader.isValid(dummy)
			expect(isValid).toBe(false)
		})

		it('should return false the input is not an array', async () => {
			const dummy = '0'

			const isValid = CSVReader.isValid(dummy as any)
			expect(isValid).toBe(false)
		})

		it('should return false the input is not a matrix', async () => {
			const dummy = [1, 2, 3]

			const isValid = CSVReader.isValid(dummy as any)
			expect(isValid).toBe(false)
		})

		it('should return false the input is an empty array', async () => {
			const dummy = [[]]

			const isValid = CSVReader.isValid(dummy as any)
			expect(isValid).toBe(false)
		})

		it('should return true if array is valid', async () => {
			const dummy = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]

			const isValid = CSVReader.isValid(dummy)
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

			const formatted = CSVReader.format(fileData)
			expect(formatted).toEqual(expected)
		})
	})
})
