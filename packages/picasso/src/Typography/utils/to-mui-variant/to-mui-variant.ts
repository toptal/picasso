import { SizeType } from '@toptal/picasso-shared'

const variantsMapping = {
  heading: {
    xsmall: undefined,
    small: 'h4' as const,
    medium: 'h3' as const,
    large: 'h2' as const,
    xlarge: 'h1' as const,
    inherit: undefined
  },
  body: {
    xsmall: 'body1' as const,
    small: 'body1' as const,
    medium: 'body1' as const,
    large: 'body1' as const,
    xlarge: undefined,
    inherit: 'body1' as const
  }
}

const toMuiVariant = <
  V extends 'heading' | 'body',
  S extends
    | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
    | 'inherit'
>(
  variant: V,
  size: S
): typeof variantsMapping[V][S] => variantsMapping[variant][size]

export default toMuiVariant
