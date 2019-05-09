import React, { ReactNode } from 'react'
import { render, cleanup } from 'react-testing-library'
import SearchIcon from '@material-ui/icons/Search'

import Picasso from '../Picasso'
import TextField from './index'

const renderTextField = (children: ReactNode, props: any = {}) => {
  const { icon, iconPosition } = props

  return render(
    <Picasso loadFonts={false}>
      <TextField icon={icon} iconPosition={iconPosition}>
        {children}
      </TextField>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Icon prop', () => {
  test('renders icon at the end', () => {
    const { container } = renderTextField(null, {
      icon: <SearchIcon />
    })

    expect(container).toMatchSnapshot()
  })

  test('renders icon at the beginning', () => {
    const { container } = renderTextField(null, {
      icon: <SearchIcon />,
      iconPosition: 'start'
    })

    expect(container).toMatchSnapshot()
  })
})
