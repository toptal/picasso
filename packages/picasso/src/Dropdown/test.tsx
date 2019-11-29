import { cleanup, fireEvent, render, wait } from '@testing-library/react'
import React from 'react'
import Picasso from '@toptal/picasso-shared'

import Menu from '../Menu'
import Dropdown from './Dropdown'
import Container from '../Container'

afterEach(cleanup)

describe('Dropdown', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Dropdown content={<div>Content</div>}>
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('should render menu', () => {
    const { getByText, unmount, baseElement } = render(
      <Picasso loadFonts={false}>
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
      </Picasso>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    expect(baseElement).toMatchSnapshot()

    unmount()
  })

  test('should render menu with focus', async () => {
    const { baseElement, getByText, unmount } = render(
      <Picasso loadFonts={false}>
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
      </Picasso>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)
    await wait(() => {
      expect(document.activeElement).toBe(baseElement.querySelector('li'))
    })

    expect(baseElement).toMatchSnapshot()

    unmount()
  })

  test('should trigger `onOpen`, `onClose` callbacks', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const { getByText, unmount } = render(
      <Picasso loadFonts={false}>
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
      </Picasso>
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
