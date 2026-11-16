import { fileURLToPath } from 'node:url';
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import globals from 'globals';
import svelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';
import ts from 'typescript-eslint';

import { globalIgnores } from 'eslint/config';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
	globalIgnores(['eslint.config.mjs', 'svelte.config.js', '**/src/routes/**/*']),
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: [
			'src/lib/**/*.svelte',
			'src/lib/**/*.svelte.ts',
			'src/lib/**/*.svelte.js',
			'src/lib/**/*.ts'
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-at-html-tags': 'off',
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			]
		}
	}
];
