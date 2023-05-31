import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import typographyStyles from '../../../Typography/styles'
import getTypographyClassName from '../../../Typography/utils/get-typography-class-name/get-typography-class-name'
import type { TypographyOptions } from '../../../Typography/utils/get-typography-class-name/get-typography-class-name'

const useCreateTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography',
})

const useTypographyClasses = (options: TypographyOptions): string => {
  const classes = useCreateTypographyClasses()

  return getTypographyClassName(classes, options)
}

export default useTypographyClasses
