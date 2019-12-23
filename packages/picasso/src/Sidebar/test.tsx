import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import Sidebar, { Props } from './Sidebar'

const TestSidebar: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => (
  <Picasso loadFonts={false}>
    <Sidebar>{children}</Sidebar>
  </Picasso>
)

describe('Sidebar', () => {
  test('default render', () => {
    const { container } = render(<TestSidebar />)

    expect(container).toMatchSnapshot()
  })

  test('with menu ', () => {
    const { container } = render(
      <TestSidebar>
        <Sidebar.Menu />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  test('with one normal and one bottom menu ', () => {
    const { container } = render(
      <TestSidebar>
        <Sidebar.Menu />
        <Sidebar.Menu bottom />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })
})
