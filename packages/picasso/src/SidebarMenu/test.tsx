import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import SidebarMenu, { Props } from './SidebarMenu'

const TestSidebarMenu = ({ children, bottom }: OmitInternalProps<Props>) => {
  return <SidebarMenu bottom={bottom}>{children}</SidebarMenu>
}

describe('SidebarMenu', () => {
  it('renders', () => {
    const { container } = render(<TestSidebarMenu />)

    expect(container).toMatchSnapshot()
  })

  it('with bottom', () => {
    const { container } = render(<TestSidebarMenu bottom />)

    expect(container).toMatchSnapshot()
  })
})
