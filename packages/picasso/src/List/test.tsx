import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import List, { Props } from './List'

const renderList = (props: OmitInternalProps<Props>) =>
  render(<List {...props}>{props.children}</List>)

describe('List', () => {
  it('renders unordered list', () => {
    const { container } = renderList({
      children: [],
      variant: 'unordered'
    })

    expect(container).toMatchSnapshot()
  })

  it('renders ordered list', () => {
    const { container } = renderList({
      children: [],
      variant: 'ordered'
    })

    expect(container).toMatchSnapshot()
  })
})
