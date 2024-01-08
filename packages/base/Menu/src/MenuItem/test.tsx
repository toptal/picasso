import React from 'react'
import { render, TestingPicasso } from '@toptal/picasso/test-utils'

import MenuItem from './MenuItem'

describe('MenuItem', () => {
  it('renders', () => {
    const { container } = render(<MenuItem>1</MenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('renders checkmarked', () => {
    const { container } = render(<MenuItem checkmarked>1</MenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('renders with description', () => {
    const { container } = render(<MenuItem description='details'>1</MenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('renders with a sub menu arrow', () => {
    const menu = <div />
    const { container } = render(<MenuItem menu={menu}>1</MenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('renders in title case with local prop', () => {
    const { container } = render(<MenuItem titleCase>arrow</MenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('renders in title case with global prop', () => {
    const { container } = render(
      <TestingPicasso titleCase>
        <MenuItem>arrow</MenuItem>
      </TestingPicasso>
    )

    expect(container).toMatchSnapshot()
  })
})
