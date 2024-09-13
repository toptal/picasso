import React from 'react'
import { PageHead } from '@toptal/picasso'

const WithEnabledMinHeight = () => (
  <PageHead>
    <PageHead.Main enableMinHeight>
      <PageHead.Title>
        This is a very long title that extends over multiple lines to
        demonstrate how 'enableMinHeight' prop is working. It provides a clear
        example of how long text will be handled, and we have here some lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae
        justo ultricies lacinia. Nullam sit amet nunc nec libero ultricies
        lacinia. Nullam sit amet nunc nec libero.
      </PageHead.Title>
    </PageHead.Main>
  </PageHead>
)

export default WithEnabledMinHeight
