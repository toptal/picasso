const forbiddenImports = {
  picasso: ['picasso', 'picasso-forms', 'picasso-charts'],
  'picasso-charts': ['picasso-charts'],
  'picasso-forms': ['picasso-forms'],
  'picasso-provider': ['picasso-provider', 'picasso-shared'],
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
                '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect` from `@toptal/picasso-shared`',
            },
          ],
        },
      }
    }
  )

const ssrFriendlyRuleNames = [
  'ssr-friendly/no-dom-globals-in-module-scope',
  'ssr-friendly/no-dom-globals-in-constructor',
  'ssr-friendly/no-dom-globals-in-react-cc-render',
  'ssr-friendly/no-dom-globals-in-react-fc',
]

const generateSameSettingRules = (ruleNames, setting) => {
  return Object.fromEntries(ruleNames.map(ruleName => [ruleName, setting]))
}

module.exports = {
  extends: [
    './node_modules/@toptal/davinci-syntax/src/configs/.eslintrc.cjs',
    'plugin:ssr-friendly/recommended',
  ],
  plugins: ['ssr-friendly', 'eslint-plugin-local-rules'],
  rules: {
    // When a deprecation warning hook is used, it must be preceded by a comment. Having a ticket
    // reference in the comment is enforced by the next rule.
    'local-rules/future-proof-deprecation-warning': 'warn',
    // When @deprecated is used, it must be followed by a Jira issue either in a short form [ABC-1234] or a full URL
    'todo-plz/ticket-ref': [
      'warn',
      {
        terms: ['TODO', 'FIXME', '@deprecated'],
        commentPattern:
          '(TODO:|FIXME:|@deprecated) ((\\n|.)*(\\[([A-Z]+-\\d+)+]|https:\\/\\/toptal-core\\.atlassian\\.net\\/browse\\/([A-Z]+-\\d+)))+',
        description:
          'Please add either a full URL to Jira issue or a short form: [ABC-1234] ',
      },
    ],
    '@toptal/davinci/no-private-package-imports': 'off',
    '@toptal/davinci/no-package-self-imports': [
      'error',
      {
        excludeFiles: ['**/*.example.jsx', '**/*.example.tsx'],
        excludePaths: ['@toptal/picasso-test-utils'],
      },
    ],
    ...generateSameSettingRules(ssrFriendlyRuleNames, 'warn'),
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
        ...generateSameSettingRules(ssrFriendlyRuleNames, 'off'),
      },
    },
    // tests
    {
      files: ['test.ts', 'test.tsx', '*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-inline-styles/no-inline-styles': 'off',
        'max-lines': 'off',
        ...generateSameSettingRules(ssrFriendlyRuleNames, 'off'),
      },
    },
    // codemod fixtures
    {
      files: ['packages/picasso-codemod/src/**'],
      rules: {
        'id-length': [
          'error',
          {
            exceptions: ['e', '_', 'j'],
          },
        ],
      },
    },
    // Generated files
    {
      files: ['packages/base/Icons/src/Icon/index.ts'],
      rules: {
        'max-lines': 'off',
      },
    },
    // Top-level cypress tests and Stories can have extraneous dependencies
    {
      files: [
        '*.spec.tsx',
        '*.example.tsx',
        'test.tsx',
        'test.ts',
        '*.test.tsx',
        '*.test.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    // Disallow importing from aggregate picasso package within individual sub-packages
    {
      files: ['packages/*/src/**'],
      excludedFiles: ['*.example.jsx', '*.example.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            name: '@toptal/picasso',
            message:
              'Do not import from the aggregate @toptal/picasso package. Import directly from the specific sub-package.',
          },
        ],
      },
    },
    ...generateConfig(),
  ],
}
