import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => {
  const text =
    'Lorem ipsum \r\n\r\ndolor sit amet\r\n\r\nconsectetur adipisicing elit.\r\n\r\nEos earum vitae\r\n\r\nquam odit omnis quod in voluptates est doloremque nulla sequi,\r\n\r\nillum deleniti, beatae quo?'

  return <ShowMore>{text}</ShowMore>
}

export default Example
