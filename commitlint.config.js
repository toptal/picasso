module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [1, 'always', ['chore', 'feat', 'fix', 'docs']],
    'scope-case': [2, 'always', ['pascal-case', 'lowercase']]
  }
}
