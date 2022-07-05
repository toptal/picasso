import createGenerateClassName from '@mui/styles/createGenerateClassName';
import ServerStyleSheets from '@mui/styles/ServerStyleSheets';

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
