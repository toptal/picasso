import { fireEvent, render, waitFor, act } from '@toptal/picasso/test-utils'
import React from 'react'

import Menu from '../Menu'
import Dropdown from './Dropdown'
import Container from '../Container'

describe('Dropdown', () => {
  it('renders', () => {
    const { container } = render(
      <Dropdown content={<div>Content</div>}>
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    expect(container).toMatchSnapshot()
  })

  it('should render menu', () => {
    const { getByText, baseElement } = render(
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
  })

  it('should render menu with focus', async () => {
    const { baseElement, getByText } = render(
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

    await act(async () => {
      fireEvent.click(trigger)
    })

    await waitFor(() => {
      expect(document.activeElement).toBe(baseElement.querySelector('li'))
    })

    expect(baseElement).toMatchSnapshot()
  })

  it('should trigger `onOpen`, `onClose` callbacks', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const { getByText } = render(
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
  })
})
