import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import { MenuCompound as Menu } from '../MenuCompound'
import type { Props } from './PageTopBarMenu'
import PageTopBarMenu from './PageTopBarMenu'

const TestPageTopBarMenu = ({
  children,
  name,
  avatar,
}: OmitInternalProps<Props>) => {
  return (
    <PageTopBarMenu name={name} avatar={avatar}>
      {children}
    </PageTopBarMenu>
  )
}

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
