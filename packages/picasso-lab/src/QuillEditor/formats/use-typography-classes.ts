import { makeStyles, Theme } from '@material-ui/core'
import typographyStyles from '@toptal/picasso/Typography/styles'

const useTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography'
})

export default useTypographyClasses
