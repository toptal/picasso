import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render, cleanup } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../Picasso'
import Menu from '../Menu'
import PageHeaderMenu, { Props } from './PageHeaderMenu'

const TestPageHeaderMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  name,
  avatar
}) => (
  <Picasso loadFonts={false}>
    <PageHeaderMenu name={name} avatar={avatar}>
      {children}
    </PageHeaderMenu>
  </Picasso>
)

afterEach(cleanup)

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
