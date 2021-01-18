import { fireEvent, render, wait } from '@toptal/picasso/test-utils'
import React from 'react'

import Menu from '../Menu'
import Dropdown from './Dropdown'
import Container from '../Container'

describe('Dropdown', () => {
  it('default render', () => {
    const { container } = render(
      <Dropdown content={<div>Content</div>}>
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    expect(container).toMatchSnapshot()
  })

  it('should render menu', () => {
    const { getByText, unmount, baseElement } = render(
      <Dropdown
        content={
          <Menu>
            <Menu.Item>Item1</Menu.Item>
            <Menu.Item>Item2</Menu.Item>
            <Menu.Item>Item3</Menu.Item>
          </Menu>
        }
      >
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    expect(baseElement).toMatchSnapshot()

    unmount()
  })

  it('should render menu with focus', async () => {
    const { baseElement, getByText, unmount } = render(
      <Container>
        <Dropdown
          content={
            <Menu>
              <Menu.Item>Item1</Menu.Item>
              <Menu.Item>Item2</Menu.Item>
              <Menu.Item>Item3</Menu.Item>
            </Menu>
          }
          disableAutoFocus={false}
        >
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      </Container>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)
    await wait(() => {
      expect(document.activeElement).toBe(baseElement.querySelector('li'))
    })

    expect(baseElement).toMatchSnapshot()

    unmount()
  })

  it('should trigger `onOpen`, `onClose` callbacks', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const { getByText, unmount } = render(
      <Dropdown
        content={
          <Menu>
            <Menu.Item>Item1</Menu.Item>
            <Menu.Item>Item2</Menu.Item>
            <Menu.Item>Item3</Menu.Item>
          </Menu>
        }
        onOpen={onOpen}
        onClose={onClose}
      >
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith()

    fireEvent.click(getByText('Item1'))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith()

    unmount()
  })
})
