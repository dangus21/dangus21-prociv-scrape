module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
        'plugin:@next/next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    rules: {
        // indent: ['error', 'tab'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-duplicate-imports': 2,
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'es5',
                tabWidth: 4,
            },
            {
                usePrettierrc: false,
            },
        ],
        'no-unused-vars': [
            2,
            {
                ignoreRestSiblings: true,
            },
        ],
        'no-dupe-class-members': ['error'],
        'import/no-extraneous-dependencies': ['error'],
        'prefer-template': ['error'],
        'no-console': ['error'],
    },
};
