import type { SizeType } from '@toptal/picasso-shared'

export const DEFAULT_ELEMENT = 'p' as const

const variantsMapping = {
  heading: {
    xxsmall: DEFAULT_ELEMENT,
    xsmall: DEFAULT_ELEMENT,
    small: 'h4' as const,
    medium: 'h3' as const,
    large: 'h2' as const,
    xlarge: 'h1' as const,
    inherit: DEFAULT_ELEMENT,
  },
  body: {
    xxsmall: DEFAULT_ELEMENT,
    xsmall: DEFAULT_ELEMENT,
    small: DEFAULT_ELEMENT,
    medium: DEFAULT_ELEMENT,
    large: DEFAULT_ELEMENT,
    xlarge: DEFAULT_ELEMENT,
    inherit: DEFAULT_ELEMENT,
  },
}

const variantToElement = <
  V extends 'heading' | 'body',
  S extends
    | SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
    | 'inherit'
>(
  variant: V,
  size: S
): (typeof variantsMapping)[V][S] => variantsMapping[variant][size]

export default variantToElement
