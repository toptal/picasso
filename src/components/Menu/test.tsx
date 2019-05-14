import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso from '../Picasso'
import Menu from './Menu'

const renderMenu = () => {
  return render(
    <Picasso loadFonts={false}>
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Menu', () => {
  test('default render', () => {
    const { container } = renderMenu()

    expect(container).toMatchSnapshot()
  })
})
