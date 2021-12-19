import cx from 'classnames'

import { Props } from '../../Typography'
import { kebabToCamelCase } from '../../../utils'

const getTypographyClassName = (
  classes: Record<string, string>,
  {
    variant,
    size,
    color,
    weight,
    underline,
    invert,
    lineThrough
  }: Pick<
    Props,
    | 'variant'
    | 'size'
    | 'color'
    | 'weight'
    | 'underline'
    | 'invert'
    | 'lineThrough'
  >
) => {
  const variantClassName = kebabToCamelCase(`${variant}-${size}`)
  const colorClassName = kebabToCamelCase(`${color}`)

  const weightVariantClass = weight ? classes[weight] : undefined
  const weightClass =
    weight === 'inherit' ? classes.inheritWeight : weightVariantClass

  const underlineClass = underline ? classes[underline] : undefined

  return cx(
    classes[variantClassName],
    classes[colorClassName],
    weightClass,
    underlineClass,
    {
      [classes.invert]: invert,
      [classes.lineThrough]: lineThrough
    }
  )
}

export default getTypographyClassName
