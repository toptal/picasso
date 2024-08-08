import React from 'react'
import { render } from '@testing-library/react'

import { DropdownArrow } from './index'

describe('DropdownArrow', () => {
  it('renders icon', () => {
    const { container } = render(<DropdownArrow />)

    expect(container).toMatchSnapshot()
  })
})
