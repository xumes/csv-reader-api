module.exports = {
	'*.{ts,js}': ['npm run check:format', 'npm run check:lint', 'npm run test'],
	'*.ts': () => 'npm run check:types',
}
