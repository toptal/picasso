import { twJoin } from '@toptal/picasso-tailwind-merge'

type Props = {
  thumbType: 'up' | 'down'
  interactive: boolean
  value?: boolean
}

export const labelClasses = '[&:not(:last-child)]:mr-[1em]'

export const getThumbClasses = ({ thumbType, interactive, value }: Props) => {
  let classByType = 'text-gray-400'

  if (thumbType === 'up' && value === true) {
    classByType = 'text-green-500 hover:text-green-500'
  } else if (thumbType === 'down' && value === false) {
    classByType = 'text-red-500 hover:text-red-500'
  }

  return twJoin(
    'transition-colors duration-200 ease-linear',
    interactive ? 'cursor-pointer hover:text-graphite-700' : '',
    classByType
  )
}
