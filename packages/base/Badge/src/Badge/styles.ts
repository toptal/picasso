import type { SizeType, VariantType } from './Badge'

export const classByVariant: Record<VariantType, string> = {
  white: 'bg-white text-graphite-700 border-gray-400',
  red: 'text-white bg-red-500 border-red-500',
}

export const classBySize: Record<SizeType, string> = {
  small: 'px-[1px] leading-[10px] h-3 min-w-3',
  medium: 'px-[1px] h-4 min-w-4',
  large: 'px-[3px] h-[1.25rem] min-w-[1.25rem]',
}
