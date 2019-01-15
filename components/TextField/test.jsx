import React from 'react'
import { render, cleanup } from 'react-testing-library'
import SearchIcon from '@material-ui/icons/Search'

import TextField from './index'

const renderTextField = (children, props = {}) => {
  return render(<TextField {...props}>{children}</TextField>)
}

afterEach(cleanup)

describe('Icon prop', () => {
  test('renders icon at the end', () => {
    const { container } = renderTextField(null, {
      Icon: <SearchIcon />
    })

    expect(container).toMatchSnapshot()
  })

  test('renders icon at the beginning', () => {
    const { container } = renderTextField(null, {
      Icon: <SearchIcon />,
      iconPosition: 'start'
    })

    expect(container).toMatchSnapshot()
  })
})
