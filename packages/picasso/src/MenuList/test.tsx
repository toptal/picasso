import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import MenuList from '../MenuList'

const TestMenuList = () => {
  return (
    <MenuList>
      <MenuList.Item>Item A</MenuList.Item>
      <MenuList.Item>Item B</MenuList.Item>
    </MenuList>
  )
}

describe('MenuList', () => {
  it('renders', () => {
    const { container } = render(<TestMenuList />)

    expect(container).toMatchSnapshot()
  })
})
