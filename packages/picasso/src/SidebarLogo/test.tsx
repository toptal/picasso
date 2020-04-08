import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Logo from '../Logo'
import SidebarLogo, { Props } from './SidebarLogo'

const TestSidebarLogo: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => <SidebarLogo>{children}</SidebarLogo>

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
