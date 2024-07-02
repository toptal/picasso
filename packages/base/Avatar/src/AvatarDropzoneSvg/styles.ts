import type { Props, Size } from './AvatarDropzoneSvg'

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

export const getBackgroundFillClass = ({
  hovered,
  isDragActive,
  disabled,
}: Props) => {
  if (disabled) {
    return 'fill-gray-100'
  }

  if (isDragActive) {
    return 'fill-blue-500/[0.24]'
  }

  if (hovered) {
    return 'fill-blue-100/[0.84]'
  }

  return 'fill-blue-100'
}

export const getBordersStrokeClass = ({ hovered, error }: Props) => {
  if (error) {
    return 'stroke-red-500'
  }

  if (hovered) {
    return 'stroke-blue-500/[0.84]'
  }

  return 'stroke-blue-500'
}
