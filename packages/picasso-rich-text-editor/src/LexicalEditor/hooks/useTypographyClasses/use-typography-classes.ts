import type { TypographyOptions } from '../../../utils'
import { typographyStyles, getTypographyClassName } from '../../../utils'

const useTypographyClasses = (options: TypographyOptions): string => {
  return getTypographyClassName(typographyStyles, options)
}

export default useTypographyClasses
