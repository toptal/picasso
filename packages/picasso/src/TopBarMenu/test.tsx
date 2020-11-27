import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import TopBarMenu, { Props } from './TopBarMenu'

const TestTopBarMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  name,
  avatar
}) => (
  <TopBarMenu name={name} avatar={avatar}>
    {children}
  </TopBarMenu>
)

describe('TopBarMenu', () => {
  test('default render', () => {
    const { container } = render(
      <TestTopBarMenu
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Menu>
          <Menu.Item>My Account</Menu.Item>
          <Menu.Item>Log Out</Menu.Item>
        </Menu>
      </TestTopBarMenu>
    )

    expect(container).toMatchSnapshot()
  })
})
