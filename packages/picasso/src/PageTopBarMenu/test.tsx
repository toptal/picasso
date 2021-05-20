import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Menu from '../Menu'
import PageTopBarMenu, { Props } from './PageTopBarMenu'

const TestPageTopBarMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  name,
  avatar
}) => (
  <PageTopBarMenu name={name} avatar={avatar}>
    {children}
  </PageTopBarMenu>
)

describe('PageTopBarMenu', () => {
  it('renders', () => {
    const { container } = render(
      <TestPageTopBarMenu
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Menu>
          <Menu.Item>My Account</Menu.Item>
          <Menu.Item>Log Out</Menu.Item>
        </Menu>
      </TestPageTopBarMenu>
    )

    expect(container).toMatchSnapshot()
  })
})
