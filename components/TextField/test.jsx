import React from 'react'
import { render, cleanup } from 'react-testing-library'
import SearchIcon from '@material-ui/icons/Search'

import Picasso from '../Picasso'
import TextField from './index'

const renderTextField = (children, props = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <TextField {...props}>{children}</TextField>
    </Picasso>
  )
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
