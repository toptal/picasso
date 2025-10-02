import type { ColorType } from './Indicator'

export const classByColor: Record<ColorType, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-600',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  'light-grey': 'bg-gray-400',
  'blue-darker': 'bg-blue-700',
  'grey-darker': 'bg-graphite-800',
  'light-blue': 'bg-blue-400',
  white: 'bg-white',
}

export const borderByColor: Partial<Record<ColorType, string>> = {
  white: 'border border-solid border-gray-400',
}
