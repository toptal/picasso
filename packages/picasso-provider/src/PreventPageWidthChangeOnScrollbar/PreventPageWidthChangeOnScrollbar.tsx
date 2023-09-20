import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoPreventPageWidthChangeOnScrollbar',
})

/**
 * This component applies global styles that fix the problem with jumping page width.
 * The problem comes from disappearing vertical page scrollbar due to varying page height.
 */
const PreventPageWidthChangeOnScrollbar = () => {
  useStyles()

  return null
}

export default PreventPageWidthChangeOnScrollbar
