const picassoCrossDependenciesRestrictionsMap = {
  picasso: ['picasso', 'picasso-lab', 'picasso-forms', 'picasso-charts'],
  'picasso-lab': ['picasso-lab'],
  'picasso-charts': ['picasso-charts'],
  'picasso-forms': ['picasso-forms'],
  'picasso-provider': ['picasso-provider', 'picasso-shared']
}

const generateConfig = () =>
  Object.entries(picassoCrossDependenciesRestrictionsMap).map(
    ([srcPackageName, forbiddenPackageNames]) => {
      return {
        files: [`packages/${srcPackageName}/src/**`],
        excludedFiles: ['*.example.jsx', '*.example.tsx'],
        rules: {
          'no-restricted-imports': [
            'error',
            ...forbiddenPackageNames.map(name => `@toptal/${name}`)
          ]
        }
      }
    }
  )

module.exports = {
  extends: './node_modules/@toptal/davinci-syntax/src/configs/.eslintrc',
  overrides: [
    {
      files: ['*.example.jsx', '*.example.tsx'],
      rules: {
        'react/no-multi-comp': 'off',
        'react/require-optimization': 'off',
        'import/no-named-default': 'off',
        'no-console': 'off',
        'no-inline-styles/no-inline-styles': 'off'
      }
    },
    // tests
    {
      files: ['test.ts', 'test.tsx', '*.spec.ts', '*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-inline-styles/no-inline-styles': 'off',
        'max-lines': 'off'
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
