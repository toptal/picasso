import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoFixScrollbarJumpVW',
})

/**
 * This component applies global styles that fix the problem with jumping page width
 * due to appearing and disappearing vertical page scrollbar due to varying page height.
 *
 * TODO: finish description
 * Please see the styles.ts – the idea is that "wdith: 100vw" takes into account the width of
 * the page with scrollbars, so it
 */
const FixScrollbarJumpVW = () => {
  useStyles()

  return null
}

export default FixScrollbarJumpVW
