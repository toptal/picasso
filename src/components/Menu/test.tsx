import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Menu from './index'

const renderMenu = (props: any) => {
  return render(
    <Menu {...props}>
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </Menu>
  )
}

afterEach(cleanup)

describe('Menu', () => {
  test('default render', () => {
    const { container } = renderMenu({})

    expect(container).toMatchSnapshot()
  })
  test('open state render', () => {
    const { container } = renderMenu({ open: true })

    expect(container).toMatchSnapshot()
  })
})
