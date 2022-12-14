module.exports = {
	'*.{ts,js}': [
		'npm run check:format',
		'npm run check:lint',
		'npm run test:staged',
	],
	'*.ts': () => 'npm run check:types',
}
