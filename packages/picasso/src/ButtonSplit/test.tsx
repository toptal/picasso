import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Button from '../Button'

describe('ButtonSplit', () => {
  it('renders', () => {
    const { container } = render(
      <Button.Split />
    )

    expect(container).toMatchSnapshot()
  })
})
