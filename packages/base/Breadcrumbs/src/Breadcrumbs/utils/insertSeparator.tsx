import { ChevronRight16 } from '@toptal/picasso-icons'
import React from 'react'

const insertSeparator = (items: React.ReactElement[]): React.ReactElement[] => {
  return items.reduce<React.ReactElement[]>((acc, current, index) => {
    if (index < items.length - 1) {
      acc = [
        ...acc,
        current,
        <li
          aria-hidden
          // here is fine to use index as key (https://github.com/jsx-eslint/eslint-plugin-react/issues/1123)
          // eslint-disable-next-line react/no-array-index-key
          key={`separator-${index}`}
          className='flex select-none mx-1'
        >
          <ChevronRight16 />
        </li>,
      ]
    } else {
      acc.push(current)
    }

    return acc
  }, [])
}

export default insertSeparator
