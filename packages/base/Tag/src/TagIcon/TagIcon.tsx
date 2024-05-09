import React, { type ReactElement } from 'react'

interface Props {
  icon?: ReactElement
  disabled?: boolean
}

const TagIcon = ({ icon, disabled }: Props) => {
  if (!icon) {
    return null
  }

  return (
    <span className='w-min h-min flex items-center -mr-1 ml-3'>
      {React.cloneElement(icon, {
        color: disabled ? 'grey' : 'dark-grey',
      })}
    </span>
  )
}

export default TagIcon
