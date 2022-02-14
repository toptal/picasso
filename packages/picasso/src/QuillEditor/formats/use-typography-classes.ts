import { makeStyles, Theme } from '@material-ui/core'

import typographyStyles from '../../Typography/styles'

const useTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography'
})

export default useTypographyClasses
