import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render, cleanup } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../../Picasso'
import Logo from '../../Logo'
import SidebarLogo, { Props } from './SidebarLogo'

const TestSidebarLogo: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => (
  <Picasso loadFonts={false}>
    <SidebarLogo>{children}</SidebarLogo>
  </Picasso>
)

afterEach(cleanup)

describe('SidebarLogo', () => {
  test('default render', () => {
    const { container } = render(
      <TestSidebarLogo>
        <Logo />
      </TestSidebarLogo>
    )

    expect(container).toMatchSnapshot()
  })
})
