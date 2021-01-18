import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import SidebarMenu, { Props } from './SidebarMenu'

const TestSidebarMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  bottom
}) => <SidebarMenu bottom={bottom}>{children}</SidebarMenu>

describe('SidebarMenu', () => {
  it('default render', () => {
    const { container } = render(<TestSidebarMenu />)

    expect(container).toMatchSnapshot()
  })

  it('with bottom', () => {
    const { container } = render(<TestSidebarMenu bottom />)

    expect(container).toMatchSnapshot()
  })
})
