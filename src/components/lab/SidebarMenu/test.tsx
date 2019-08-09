import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render, cleanup } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../../Picasso'
import SidebarMenu, { Props } from './SidebarMenu'

const TestSidebarMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  bottom
}) => (
  <Picasso loadFonts={false}>
    <SidebarMenu bottom={bottom}>{children}</SidebarMenu>
  </Picasso>
)

afterEach(cleanup)

describe('SidebarMenu', () => {
  test('default render', () => {
    const { container } = render(<TestSidebarMenu />)

    expect(container).toMatchSnapshot()
  })

  test('with bottom', () => {
    const { container } = render(<TestSidebarMenu bottom />)

    expect(container).toMatchSnapshot()
  })
})
