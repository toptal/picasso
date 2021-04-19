import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FlatMenuItem, { FlatMenuItemProps } from '../FlatMenuItem'

jest.mock('ap-style-title-case')

const TestFlatMenuItem = (props: FlatMenuItemProps) => {
  return <FlatMenuItem {...props} />
}

describe('FlatMenuItem', () => {
  it('renders', () => {
    const { container } = render(<TestFlatMenuItem>Item</TestFlatMenuItem>)

    expect(container).toMatchSnapshot()
  })
})
