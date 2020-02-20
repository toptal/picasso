import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test_utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import { Logo } from '../'
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
