import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { typographyStyles, getTypographyClassName } from '@toptal/picasso'
import type { TypographyOptions } from '@toptal/picasso'

const useCreateTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography',
})

const useTypographyClasses = (options: TypographyOptions): string => {
  const classes = useCreateTypographyClasses()

  return getTypographyClassName(classes, options)
}

export default useTypographyClasses
