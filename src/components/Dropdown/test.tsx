import React, { FunctionComponent } from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Picasso from '../Picasso'
import { OmitInternalProps } from '../Picasso/types'
import Menu from '../Menu'
import Dropdown, { Props } from './Dropdown'

const TestDropdown: FunctionComponent<OmitInternalProps<Props>> = ({
  content,
  disableAutoFocus,
  children
}) => (
  <Picasso loadFonts={false}>
    <Dropdown content={content} disableAutoFocus={disableAutoFocus}>
      {children}
    </Dropdown>
  </Picasso>
)

afterEach(cleanup)

describe('Dropdown', () => {
  test('default render', () => {
    const { container } = render(
      <TestDropdown content={<div>Content</div>}>
        Open Dropdown <Dropdown.Arrow />
      </TestDropdown>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render menu', () => {
    const { container, getByText, unmount } = render(
      <TestDropdown
        content={
          <Menu>
            <Menu.Item>Item1</Menu.Item>
            <Menu.Item>Item2</Menu.Item>
            <Menu.Item>Item3</Menu.Item>
          </Menu>
        }
      >
        Open Dropdown <Dropdown.Arrow />
      </TestDropdown>,
      // We need to take snapshot of overlay rendered with Portal
      { container: document.body }
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    const item = container.querySelector('li')

    expect(document.activeElement === item).toBeTruthy()

    expect(container).toMatchSnapshot()

    unmount()
  })

  test('should render menu without focus', () => {
    const { container, getByText, unmount } = render(
      <TestDropdown
        content={
          <Menu>
            <Menu.Item>Item1</Menu.Item>
            <Menu.Item>Item2</Menu.Item>
            <Menu.Item>Item3</Menu.Item>
          </Menu>
        }
        disableAutoFocus
      >
        Open Dropdown <Dropdown.Arrow />
      </TestDropdown>,
      // We need to take snapshot of overlay rendered with Portal
      { container: document.body }
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    const item = container.querySelector('li')

    expect(document.activeElement === item).toBeFalsy()

    expect(container).toMatchSnapshot()

    unmount()
  })
})
