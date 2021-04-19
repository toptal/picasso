import React, { FunctionComponent } from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import FlatMenu, { FlatMenuProps } from '../FlatMenu'

const TestFlatMenu: FunctionComponent<OmitInternalProps<FlatMenuProps>> = ({
  children
}) => <FlatMenu>{children}</FlatMenu>

describe('FlatMenu', () => {
  it('renders', () => {
    const { container } = render(
      <TestFlatMenu>
        <FlatMenu.Item>Item 1</FlatMenu.Item>
        <FlatMenu.Item>Item 2</FlatMenu.Item>
        <FlatMenu.Item>Item 3</FlatMenu.Item>
      </TestFlatMenu>
    )

    expect(container).toMatchSnapshot()
  })

  it('has back button when in submenu', () => {
    const { container, getByText } = render(
      <TestFlatMenu>
        <FlatMenu.Item
          menu={
            <TestFlatMenu>
              <FlatMenu.Item>Submenu Item</FlatMenu.Item>
            </TestFlatMenu>
          }
        >
          Item 1
        </FlatMenu.Item>
      </TestFlatMenu>
    )

    fireEvent.click(getByText('Item 1'))

    expect(container).toMatchSnapshot()
  })
})
