import React from 'react'
import { PageHeadBase } from '@toptal/picasso'

const WithEnabledMinHeight = () => (
  <PageHeadBase
    title='
      This is a very long title that extends over multiple lines.
      It provides a clear example of how long text will be handled,
      and we have here some lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Donec nec odio vitae justo ultricies lacinia.
      Nullam sit amet nunc nec libero ultricies lacinia. Nullam sit
      amet nunc nec libero.
    '
  />
)

export default WithEnabledMinHeight
