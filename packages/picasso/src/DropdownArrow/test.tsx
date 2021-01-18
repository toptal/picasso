import React from 'react'
import { render } from '@testing-library/react'

import DropdownArrow from './index'

describe('DropdownArrow', () => {
  it('default render', () => {
    const { container } = render(<DropdownArrow />)

    expect(container).toMatchSnapshot()
  })
})
