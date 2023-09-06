import type { ManuallyFixableCase } from '../types'

export const reportManuallyFixableCases = (
  manuallyFixableCases: ManuallyFixableCase[]
) =>
  manuallyFixableCases.forEach(({ componentName, attributeName, location }) => {
    process.stdout.write(
      `\x1b[33mManual update required for ${componentName}.${attributeName} in ${location}\x1b[0m\n`
    )
  })
