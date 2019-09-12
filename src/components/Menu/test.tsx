import React, { FunctionComponent } from 'react'
import { render, cleanup } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../Picasso'
import Menu, { Props } from './Menu'

const TestMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => (
  <Picasso loadFonts={false}>
    <Menu>{children}</Menu>
  </Picasso>
)

const renderMenu = () => {
  return render(
    <TestMenu>
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </TestMenu>
  )
}

afterEach(cleanup)

describe('Menu', () => {
  test('default render', () => {
    const { container } = renderMenu()

    expect(container).toMatchSnapshot()
  })

  test('nested', () => {
    const { container } = render(
      <TestMenu>
        <Menu.Item>Item A</Menu.Item>
        <Menu.Item
          menu={
            <Menu>
              <Menu.Item>Item B1</Menu.Item>
              <Menu.Item>Item B2</Menu.Item>
            </Menu>
          }
        >
          Item B
        </Menu.Item>
        <Menu.Item>Item C</Menu.Item>
      </TestMenu>
    )

    expect(container).toMatchSnapshot()
  })
})
