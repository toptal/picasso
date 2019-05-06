import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Menu from './index'
import Picasso from '../index'

const renderMenu = (props: any) => {
  return render(
    <Picasso loadFonts={false}>
      <Menu {...props}>
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
    const { container } = renderMenu({})

    expect(container).toMatchSnapshot()
  })
})
