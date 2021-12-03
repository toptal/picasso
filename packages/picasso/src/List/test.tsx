import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import List, { Props } from './List'
import { generateListItems } from './utils'

const testIds = {
  ul: 'unordered-list',
  ol: 'ordered-list'
}

const renderList = (props: OmitInternalProps<Props>) =>
  render(<List {...props}>{props.children}</List>)

describe('List', () => {
  it('renders unordered list', () => {
    const { getByTestId } = renderList({
      children: generateListItems(5),
      variant: 'unordered',
      'data-testid': testIds.ul
    })

    const list = getByTestId(testIds.ul) as HTMLUListElement

    expect(list.tagName).toBe('UL')
    expect(list.children).toHaveLength(5)
  })

  it('renders ordered list', () => {
    const { getByTestId } = renderList({
      children: generateListItems(5),
      variant: 'ordered',
      'data-testid': testIds.ol
    })

    const list = getByTestId(testIds.ol) as HTMLOListElement

    expect(list.tagName).toBe('OL')
    expect(list.children).toHaveLength(5)
  })
})
