import React from 'react'
import type { ReactNode } from 'react'

const Image = (props: { children?: ReactNode }) => {
  return <img className='max-w-full' {...props} />
}

export default Image
