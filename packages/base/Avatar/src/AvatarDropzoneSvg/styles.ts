import type { Size } from './AvatarDropzoneSvg'

export const rootClassBySize: Record<Size, string> = {
  xxsmall: 'w-[32px] h-[32px]',
  xsmall: 'w-[40px] h-[40px]',
  small: 'w-[80px] h-[80px]',
  medium: 'w-[120px] h-[120px]',
  large: 'w-[160px] h-[160px]',
}

export const svgClassBySize: Record<Size, string> = {
  xxsmall: 'w-[39px] h-[38px]',
  xsmall: 'w-[46px] h-[46px]',
  small: 'w-[86px] h-[86px]',
  medium: 'w-[126px] h-[126px]',
  large: 'w-[166px] h-[166px]',
}
