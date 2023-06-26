import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import typographyStyles from '../../Typography/styles'

const useTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography',
})

export default useTypographyClasses
