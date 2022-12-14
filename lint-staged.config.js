module.exports = {
	'*.{ts,js}': ['npm run check:format', 'npm run check:lint'],
	'*.ts': () => 'npm run check:types',
}
