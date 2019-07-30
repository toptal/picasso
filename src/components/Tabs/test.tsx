import React, { ReactNode } from 'react'
import { render, cleanup } from '@testing-library/react'

import { OmitInternalProps } from '../Picasso'
import Tabs, { Props } from './Tabs'

const renderTabs = (
  children: ReactNode,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { value } = props

  return render(<Tabs value={value}>{children}</Tabs>)
}

afterEach(cleanup)

describe('Tabs', () => {
  test('default render', () => {
    const { container } = renderTabs(
      [<Tabs.Tab key={0} label='Tab 1' />, <Tabs.Tab key={1} label='Tab 2' />],
      {
        value: false
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('with preselected option', () => {
    const { container } = renderTabs(
      [<Tabs.Tab key={0} label='Tab 1' />, <Tabs.Tab key={1} label='Tab 2' />],
      {
        value: 1
      }
    )

    expect(container).toMatchSnapshot()
  })

  test('with preselected option using custom value', () => {
    const { container } = renderTabs(
      [
        <Tabs.Tab key={0} value='tab-1' label='Tab 1' />,
        <Tabs.Tab key={1} value='tab-2' label='Tab 2' />
      ],
      {
        value: 'tab-1'
      }
    )

    expect(container).toMatchSnapshot()
  })
})
