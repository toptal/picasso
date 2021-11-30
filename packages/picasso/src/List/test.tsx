import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import List, { Props } from './List'

const testIds = {
  ul: 'unordered-list',
  ol: 'ordered-list'
}

const renderList = (props: OmitInternalProps<Props>) =>
  render(<List {...props}>{props.children}</List>)

describe('List', () => {
  it('renders unordered list', () => {
    const { getByTestId } = renderList({
      children: [],
      variant: 'unordered',
      'data-testid': testIds.ul
    })

    const list = getByTestId(testIds.ul) as HTMLUListElement

    expect(list.children).toHaveLength(0)
  })

  it('renders ordered list', () => {
    const { getByTestId } = renderList({
      children: [],
      variant: 'ordered',
      'data-testid': testIds.ol
    })

    const list = getByTestId(testIds.ol) as HTMLOListElement

    expect(list.children).toHaveLength(0)
  })
})
