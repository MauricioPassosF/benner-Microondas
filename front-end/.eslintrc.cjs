module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    project:'tsconfig.eslint.json',
    tsconfigRootDir: './front-end',
    sourceType: 'module' 
  },
  ignorePatterns: ['dist', '.eslintrc.cjs',"**/setupTests.ts", "**/vite.config.ts"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
