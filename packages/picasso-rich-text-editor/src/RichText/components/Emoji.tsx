import React from 'react'
import type { ReactNode } from 'react'

const Emoji = (props: { children?: ReactNode }) => {
  return <img className='max-w-6 h-6 align-bottom' {...props} />
}

export default Emoji
