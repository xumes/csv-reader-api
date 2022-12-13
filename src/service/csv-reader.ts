import fs from 'fs/promises'
import csv from 'async-csv'

export default class CSVReader {

	private output: string[] = []

	async read(fileInput: string): Promise<any> {
		if (!fileInput) {
			throw new Error('File Not Found!')
		}

		const csvString = await fs.readFile(fileInput, 'utf-8')

		return await csv.parse(csvString)
	}
}