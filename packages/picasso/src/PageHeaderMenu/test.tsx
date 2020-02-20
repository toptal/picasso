import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import PageHeaderMenu, { Props } from './PageHeaderMenu'

const TestPageHeaderMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  name,
  avatar
}) => (
  <PageHeaderMenu name={name} avatar={avatar}>
    {children}
  </PageHeaderMenu>
)

describe('PageHeaderMenu', () => {
  test('default render', () => {
    const { container } = render(
      <TestPageHeaderMenu
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Menu>
          <Menu.Item>My Account</Menu.Item>
          <Menu.Item>Log Out</Menu.Item>
        </Menu>
      </TestPageHeaderMenu>
    )

    expect(container).toMatchSnapshot()
  })
})
