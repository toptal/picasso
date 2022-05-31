import cx from 'classnames'
import { SizeType, ColorType } from '@toptal/picasso-shared'

import kebabToCamelCase from '../../../utils/kebab-to-camel-case'

const getTypographyClassName = (
  classes: Record<string, string>,
  {
    variant,
    size,
    color,
    weight,
    underline,
    invert,
    lineThrough,
  }: {
    variant: 'heading' | 'body'
    size:
      | SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
      | 'inherit'
    color?: ColorType
    weight?: 'regular' | 'semibold' | 'inherit'
    underline?: 'solid' | 'dashed'
    invert?: boolean
    lineThrough?: boolean
  }
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
      [classes.lineThrough]: lineThrough,
    }
  )
}

export default getTypographyClassName
