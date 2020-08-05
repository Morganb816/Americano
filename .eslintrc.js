module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: ['plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        ['comma-dangle']: ['error', 'never']
    }
};
