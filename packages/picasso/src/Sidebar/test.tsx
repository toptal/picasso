import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Sidebar'
import Sidebar from './'

const TestSidebar: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => <Sidebar>{children}</Sidebar>

describe('Sidebar', () => {
  it('renders', () => {
    const { container } = render(<TestSidebar />)

    expect(container).toMatchSnapshot()
  })

  it('with menu', () => {
    const { container } = render(
      <TestSidebar>
        <Sidebar.Menu />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  it('with one normal and one bottom menu', () => {
    const { container } = render(
      <TestSidebar>
        <Sidebar.Menu />
        <Sidebar.Menu bottom />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })
})
