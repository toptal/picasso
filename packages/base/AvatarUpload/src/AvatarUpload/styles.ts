import type { Status } from '@toptal/picasso-outlined-input'
import type { Sizes } from '@toptal/picasso-shared'
import { twJoin } from '@toptal/picasso-tailwind-merge'

export const rootClassBySize: Record<Exclude<Sizes, 'xlarge'>, string> = {
  xxsmall: 'w-8 h-8',
  xsmall: 'w-10 h-10',
  small: 'w-[5rem] h-[5rem]',
  medium: 'w-[7.5rem] h-[7.5rem]',
  large: 'w-[10rem] h-[10rem]',
}

export const getIconClass = (
  hovered: boolean,
  status?: Extract<Status, 'error' | 'default'>
) =>
  twJoin(
    'absolute pointer-events-none',
    hovered && 'text-blue-500/[.84]',
    status === 'error' ? (hovered ? 'text-red-500/[.84]' : 'text-red-500') : ''
  )
