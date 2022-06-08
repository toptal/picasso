const forbiddenImports = {
  picasso: ['picasso', 'picasso-forms', 'picasso-charts'],
  'picasso-charts': ['picasso-charts'],
  'picasso-forms': ['picasso-forms'],
  'picasso-provider': ['picasso-provider', 'picasso-shared']
}

const generateConfig = () =>
  Object.entries(forbiddenImports).map(
    ([srcPackageName, forbiddenPackageNames]) => {
      return {
        files: [`packages/${srcPackageName}/src/**`],
        excludedFiles: ['*.example.jsx', '*.example.tsx'],
        rules: {
          'no-restricted-imports': [
            'error',
            ...forbiddenPackageNames.map(name => `@toptal/${name}`),
            {
              name: 'react',
              importNames: ['useLayoutEffect'],
              message:
                '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect` from `@toptal/picasso-shared`'
            }
          ]
        }
      }
    }
  )

const ssrFriendlyRuleNames = [
  'ssr-friendly/no-dom-globals-in-module-scope',
  'ssr-friendly/no-dom-globals-in-constructor',
  'ssr-friendly/no-dom-globals-in-react-cc-render',
  'ssr-friendly/no-dom-globals-in-react-fc'
]

const generateSameSettingRules = (ruleNames, setting) => {
  return Object.fromEntries(ruleNames.map(ruleName => [ruleName, setting]))
}

module.exports = {
  extends: [
    './node_modules/@toptal/davinci-syntax/src/configs/.eslintrc',
    'plugin:ssr-friendly/recommended'
  ],
  plugins: ['ssr-friendly'],
  rules: {
    '@toptal/davinci/no-private-package-imports': 'off',
    '@toptal/davinci/no-package-self-imports': [
      'error',
      {
        excludeFiles: ['**/*.example.jsx', '**/*.example.tsx'],
        excludePaths: ['@toptal/picasso/test-utils']
      }
    ],
    ...generateSameSettingRules(ssrFriendlyRuleNames, 'warn')
  },
  ignorePatterns: ['*.output.tsx', '*.input.tsx'],
  overrides: [
    {
      files: ['*.example.jsx', '*.example.tsx'],
      rules: {
        'react/no-multi-comp': 'off',
        'react/require-optimization': 'off',
        'import/no-named-default': 'off',
        'no-console': 'off',
        'no-inline-styles/no-inline-styles': 'off',
        '@toptal/davinci/no-private-package-imports': 'error',
        ...generateSameSettingRules(ssrFriendlyRuleNames, 'off')
      }
    },
    // tests
    {
      files: ['test.ts', 'test.tsx', '*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-inline-styles/no-inline-styles': 'off',
        'max-lines': 'off',
        ...generateSameSettingRules(ssrFriendlyRuleNames, 'off')
      }
    },
    // codemod fixtures
    {
      files: ['packages/picasso-codemod/src/**'],
      rules: {
        'id-length': [
          'error',
          {
            exceptions: ['e', '_', 'j']
          }
        ]
      }
    },
    // Generated files
    {
      files: ['packages/picasso/src/Icon/index.ts'],
      rules: {
        'max-lines': 'off'
      }
    },
    ...generateConfig()
  ]
}
