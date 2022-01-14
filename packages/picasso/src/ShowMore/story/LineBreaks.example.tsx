import React from 'react'
import { ShowMore } from '@toptal/picasso'

const Example = () => {
  const text =
    '1. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah\r\n\r\n2. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah\r\n\r\n1. More about contact\r\n\r\nlocation:\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah blah blah\r\n\r\nblah blah blah'

  return <ShowMore>{text}</ShowMore>
}

export default Example
