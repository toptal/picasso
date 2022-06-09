import { createGenerateClassName, ServerStyleSheets } from '@material-ui/core'

const getServersideStylesheets = (
  generateClassNameSeed = ''
): ServerStyleSheets => {
  const generateClassName = createGenerateClassName({
    seed: generateClassNameSeed,
  })

  const sheets = new ServerStyleSheets({
    serverGenerateClassName: generateClassName,
  })

  return sheets
}

export { getServersideStylesheets }
