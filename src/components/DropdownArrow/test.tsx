import React from 'react'
import { render, cleanup } from 'react-testing-library'

import DropdownArrow from './index'

afterEach(cleanup)

describe('DropdownArrow', () => {
  test('default render', () => {
    const { container } = render(<DropdownArrow />)

    expect(container).toMatchSnapshot()
  })
})
