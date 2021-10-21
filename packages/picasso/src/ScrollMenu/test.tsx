import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import Menu from '../Menu'
import ScrollMenu from './ScrollMenu'
import scrollToSelection from './utils/scrollToSelection'

const createRect = (opts: Partial<DOMRect>) => {
  return {
    x: 0,
    y: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    toJSON: () => {},
    ...opts
  }
}

const createElement = (opts: Partial<DOMRect>) => {
  const rect = createRect(opts)
  const element = document.createElement('div')

  jest.spyOn(element, 'getBoundingClientRect').mockReturnValue(rect)

  return element
}

const createEmptyMenu = () => {
  return createElement({ top: 20, bottom: 100 })
}

const createMenu = () => {
  const menu = createEmptyMenu()

  menu.append(createElement({ top: 10, bottom: 30 }))
  menu.append(createElement({ top: 40, bottom: 60 }))
  menu.append(createElement({ top: 90, bottom: 110 }))

  return menu
}

const createRef = (current: HTMLDivElement) => {
  return { current }
}

describe('scrollToSelection', () => {
  it('should not scroll when there is no selected index', () => {
    const menu = createMenu()
    const menuRef = createRef(menu)

    scrollToSelection(menuRef, undefined)

    expect(menu.scrollTop).toBe(0)
  })

  it('should not scroll when there is no select item', () => {
    const menu = createEmptyMenu()
    const menuRef = createRef(menu)

    scrollToSelection(menuRef, 1)

    expect(menu.scrollTop).toBe(0)
  })

  it('should not scroll when the selected item is visible', () => {
    const menu = createMenu()
    const menuRef = createRef(menu)

    scrollToSelection(menuRef, 1)

    expect(menu.scrollTop).toBe(0)
  })

  it('should scroll when the top of the selected item is not visible', () => {
    const menu = createMenu()
    const menuRef = createRef(menu)

    scrollToSelection(menuRef, 0)

    expect(menu.scrollTop).toBe(-10)
  })

  it('should scroll when the bottom of the selected item is not visible', () => {
    const menu = createMenu()
    const menuRef = createRef(menu)

    scrollToSelection(menuRef, 2)

    expect(menu.scrollTop).toBe(10)
  })
})

describe('ScrollMenu', () => {
  it('renders', () => {
    const { container } = render(
      <ScrollMenu>
        <Menu.Item>top</Menu.Item>
        <Menu.Item>middle</Menu.Item>
        <Menu.Item>bottom</Menu.Item>
      </ScrollMenu>
    )

    expect(container).toMatchSnapshot()
  })
})
