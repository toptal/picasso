import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'

import Logo from '../Logo'
import SidebarLogo, { Props } from './SidebarLogo'

const TestSidebarLogo = ({ children }: Props) => (
  <SidebarLogo>{children}</SidebarLogo>
)

describe('SidebarLogo', () => {
  it('default render', () => {
    const { container } = render(
      <TestSidebarLogo>
        <Logo />
      </TestSidebarLogo>
    )

    expect(container).toMatchSnapshot()
  })
})
