import { VariantType } from '../Avatar'

const DIMENSIONS_BY_VARIANT = {
  square: {
    width: '2.5em',
    height: '2.5em'
  },
  portrait: {
    width: '1.6667em',
    height: '2.5em'
  },
  landscape: {
    width: '2.5em',
    height: '1.6667em'
  }
} as const

const getDimensions = (variant: VariantType) => DIMENSIONS_BY_VARIANT[variant]

export default getDimensions
