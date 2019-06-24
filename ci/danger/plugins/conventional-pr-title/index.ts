import { DangerDSLType } from 'danger/distribution/dsl/DangerDSL'
import load from '@commitlint/load'
import lint from '@commitlint/lint'
import table from 'markdown-table'

declare var danger: DangerDSLType

export declare function fail(message: string): void

const WHITELISTED_USERS = ['dependabot-preview[bot]']

const conventionalPRTitle = async () => {
  if (WHITELISTED_USERS.includes(danger.github.pr.user.login)) {
    return
  }

  const { rules, parserPreset } = await load()
  const { title } = danger.github.pr

  const result = await lint(
    title,
    rules,
    parserPreset ? { parserOpts: parserPreset.parserOpts } : {}
  )

  if (!result.valid) {
    if (result.errors.length > 0) {
      let message = `PR title doesn't conform the conventional commit guidelines. \n\n**Errors**:\n\n`

      message += table([
        ['Message'],
        ...result.errors.map(error => [error.message])
      ])

      message += `\n\n💡 For a guidance on how to fix this problem please refer to [https://www.conventionalcommits.org](https://www.conventionalcommits.org)`
      message += `\n\n💡 Or you can check our [documentation](https://github.com/toptal/picasso/blob/master/docs/contribution/github-workflow.md#general-commit-message-pattern)`

      fail(message)
    }
  }
}

export default conventionalPRTitle
