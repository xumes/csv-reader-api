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

	validate(data: number[][]): boolean {
		const width = Array.isArray(data) ? data.length : 0
		const heigh = Array.isArray(data[0]) ? data[0].length : 0 

		if (width === 0 || heigh ===0 ) {
			return false
		}

		if (width !== heigh) {
			return false
		}

		return true
	}

	format(data: number[][]): string {
		let resultString = ''
		data.forEach(value => {
			resultString = resultString.concat(`${value.toString()}\n`) 
		})

		return resultString.trim()
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

	async invert(data: any[][]): Promise<any> {
		if (!data || !Array.isArray(data)) {
			throw new Error('Invalid data')
		}

		return Object.keys(data[0])
			.map(col => data.map(row => row[parseInt(col)]))
	}
}
