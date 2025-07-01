/** @type {import("eslint").Linter.Config} */

export default {
	root: true,
	env: { browser: true, es2021: true },
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:tailwindcss/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'tailwindcss'],
	rules: {
		'react/react-in-jsx-scope': 'off', // not needed with React 17+
		'react/prop-types': 'off', // optional if using TS or custom props
	},
	settings: {
		react: { version: 'detect' },
	},
};
