import React from 'react'
import { render } from '@testing-library/react'

import { DropdownArrow } from './index'

const iconConstructor = jest.fn()

iconConstructor.mockReturnValue(null)

jest.mock('@toptal/picasso-icons', () => ({
  ArrowDownMinor16: () => iconConstructor(),
}))

describe('DropdownArrow', () => {
  it('renders icon', () => {
    render(<DropdownArrow />)

    expect(iconConstructor).toHaveBeenCalled()
  })
})
