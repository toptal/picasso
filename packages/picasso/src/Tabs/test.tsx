import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Tabs, { Props } from './Tabs'

const renderTabs = (
  children: ReactNode,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { value } = props

  return render(<Tabs value={value}>{children}</Tabs>)
}

describe('Tabs', () => {
  it('default render', () => {
    const { container } = renderTabs(
      [<Tabs.Tab key={0} label='Tab 1' />, <Tabs.Tab key={1} label='Tab 2' />],
      {
        value: false
      }
    )

    expect(container).toMatchSnapshot()
  })

  it('with preselected option', () => {
    const { container } = renderTabs(
      [<Tabs.Tab key={0} label='Tab 1' />, <Tabs.Tab key={1} label='Tab 2' />],
      {
        value: 1
      }
    )

    expect(container).toMatchSnapshot()
  })

  it('with preselected option using custom value', () => {
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
