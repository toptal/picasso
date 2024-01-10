import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageSidebar'
import PageSidebar from './PageSidebar'

const TestSidebar = ({ children }: OmitInternalProps<Props>) => {
  return <PageSidebar>{children}</PageSidebar>
}

describe('PageSidebar', () => {
  it('renders', () => {
    const { container } = render(<TestSidebar />)

    expect(container).toMatchSnapshot()
  })

  it('with menu', () => {
    const { container } = render(
      <TestSidebar>
        <PageSidebar.Menu />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  it('with one normal and one bottom menu', () => {
    const { container } = render(
      <TestSidebar>
        <PageSidebar.Menu />
        <PageSidebar.Menu bottom />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })
})
