export default {
	roots: ['<rootDir>/spec/tests'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
	coverageDirectory: 'coverage',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
}
