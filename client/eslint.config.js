import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Use tseslint.config helper which gives you type safety
export default tseslint.config(
  { ignores: ['dist'] }, // Global ignores go in their own object

  // 1. Spread the recommended configs directly into the array
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 2. Your custom configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // You need to define plugins here for React
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Add React hooks rules manually (since plugin doesn't export flat config yet)
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // ✅ YOUR FIX: Turning off the unused vars rule
      "@typescript-eslint/no-unused-vars": "off" 
    },
  },
)