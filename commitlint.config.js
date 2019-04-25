module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [1, 'always', ['chore', 'feat', 'fix', 'docs']]
  }
}
