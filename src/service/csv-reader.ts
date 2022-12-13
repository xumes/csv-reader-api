import fs from 'fs/promises'
import csv from 'async-csv'

export default class CSVReader {
	async read(fileInput: string): Promise<string[]> {
		if (!fileInput) {
			throw new Error('File Not Found!')
		}

		const csvString = await fs.readFile(fileInput, 'utf-8')

		return (await csv.parse(csvString)) as string[]
	}
}
