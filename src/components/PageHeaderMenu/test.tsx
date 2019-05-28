import React, { FunctionComponent } from 'react'
/* eslint-disable-next-line */
import { render, cleanup } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import Menu from '../Menu'
import PageHeaderMenu, { Props } from './PageHeaderMenu'

const TestPageHeaderMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  content,
  name,
  avatar
}) => (
  <Picasso loadFonts={false}>
    <PageHeaderMenu content={content} name={name} avatar={avatar} />
  </Picasso>
)

afterEach(cleanup)

describe('PageHeaderMenu', () => {
  test('default render', () => {
    const { container } = render(
      <TestPageHeaderMenu
        content={
          <Menu style={{ width: '15rem' }}>
            <Menu.Item>My Account</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        }
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      />
    )

    expect(container).toMatchSnapshot()
  })
})
