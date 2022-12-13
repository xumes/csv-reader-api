import fs from 'fs/promises'
import csv from 'async-csv'

export default class CSVReader {
	async read(fileInput: string): Promise<number[][]> {
		if (!fileInput) {
			throw new Error('File Not Found!')
		}

		const csvString = await fs.readFile(fileInput, 'utf-8')

		return (await csv.parse(csvString)) as number[][]
	}

	async flatten(data: number[][]): Promise<string> {
		if (!data || !Array.isArray(data)) {
			throw new Error('Invalid data')
		}

		return data.toString()
	}

	async sum(data: number[][]): Promise<number> {
		if (!data || !Array.isArray(data)) {
			throw new Error('Invalid data')
		}

		let result = 0

		data.forEach((d: number[]) => {
			result += d.reduce((total: any, num: any) => {
				return parseInt(total) + parseInt(num)
			})
		})

		return result
	}

	async multiply(data: number[][]): Promise<number> {
		if (!data || !Array.isArray(data)) {
			throw new Error('Invalid data')
		}

		let result = 1

		data.forEach((d: number[]) => {
			result = result * d.reduce((total: any, num: any) => {
				return parseInt(total) * parseInt(num)
			})
		})

		return result
	}
}
