import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import type { TypographyOptions } from '../../../utils'
import { typographyStyles, getTypographyClassName } from '../../../utils'

const useCreateTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography',
})

const useTypographyClasses = (options: TypographyOptions): string => {
  const classes = useCreateTypographyClasses()

  return getTypographyClassName(classes, options)
}

export default useTypographyClasses
