import type { Variant } from './Tag'

export const classByVariant: Record<Variant, string> = {
  blue: 'text-blue-500 border-blue-500',
  green: 'text-green-600 border-green-600',
  yellow: 'text-yellow-500 border-yellow-500',
  red: 'text-red-500 border-red-500',
  'light-grey': 'text-graphite-700 border-gray-400',
}
