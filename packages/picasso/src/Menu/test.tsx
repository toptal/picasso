import React, { FunctionComponent } from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Menu, { Props } from './'

const TestMenu: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => <Menu>{children}</Menu>

describe('Menu', () => {
  it('renders', () => {
    const { container } = render(
      <TestMenu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </TestMenu>
    )

    expect(container).toMatchSnapshot()
  })

  it('has back button when in submenu', () => {
    const { container, getByText } = render(
      <TestMenu>
        <Menu.Item
          menu={
            <TestMenu>
              <Menu.Item>Submenu Item</Menu.Item>
            </TestMenu>
          }
        >
          Item 1
        </Menu.Item>
      </TestMenu>
    )

    fireEvent.click(getByText('Item 1'))

    expect(container).toMatchSnapshot()
  })
})
