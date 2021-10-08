import { VariantType, SizeType } from '../../types'

const variantsMapping = {
  heading: {
    small: 'h4' as const,
    medium: 'h3' as const,
    large: 'h2' as const,
    xlarge: 'h1' as const,
    inherit: undefined
  },
  body: {
    small: 'body1' as const,
    medium: 'body1' as const,
    large: 'body1' as const,
    xlarge: undefined,
    inherit: 'body1' as const
  }
}

const toMuiVariant = <V extends VariantType, S extends SizeType>(
  variant: V,
  size: S
): typeof variantsMapping[V][S] => variantsMapping[variant][size]

export default toMuiVariant
