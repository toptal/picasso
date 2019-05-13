import React, { ReactNode } from 'react'
import { render, cleanup } from 'react-testing-library'
import SearchIcon from '@material-ui/icons/Search'

import Picasso, { UserDefinedProps } from '../Picasso'
import TextField, { Props } from './TextField'

const renderTextField = (
  children: ReactNode,
  props: UserDefinedProps<Props>
) => {
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
