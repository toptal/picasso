import { AvatarSizeType } from './../Avatar'

const CORNER_SIZE = {
  xxsmall: '0.5rem',
  xsmall: '0.5rem',
  small: '1rem',
  medium: '1.5rem',
  large: '1.5rem'
} as const

const getClipPathCornerMask = (size: AvatarSizeType) =>
  `polygon(0 0, 100% 0, 100% 100%, ${CORNER_SIZE[size]} 100%, 0 calc(100% - ${CORNER_SIZE[size]}))`

export default getClipPathCornerMask
