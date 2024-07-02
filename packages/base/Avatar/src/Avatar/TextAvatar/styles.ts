import type { FontSize, Size } from './TextAvatar'

export const containerTextClassBySize: Record<Size, string> = {
  xxsmall: 'text-[1em]',
  xsmall: 'text-[1em]',
  small: 'text-[2em]',
  medium: 'text-[3em]',
  large: 'text-[5em]',
}

export const typographyTextClassBySize: Record<FontSize, string> = {
  small: 'text-[0.666666667em]',
  large: 'text-[1em]',
}
