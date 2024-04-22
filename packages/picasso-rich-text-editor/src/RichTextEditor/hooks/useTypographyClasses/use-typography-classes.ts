import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import {
  typographyStyles,
  getTypographyClassName,
} from '@toptal/picasso-typography'
import type { TypographyOptions } from '@toptal/picasso-typography'

const useCreateTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography',
})

const useTypographyClasses = (options: TypographyOptions): string => {
  const classes = useCreateTypographyClasses()

  return getTypographyClassName(classes, options)
}

export default useTypographyClasses
