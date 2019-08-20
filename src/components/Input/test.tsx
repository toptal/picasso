import React, { ReactNode } from 'react'
import { render, cleanup } from '@testing-library/react'
import SearchIcon from '@material-ui/icons/Search'

import Picasso, { OmitInternalProps } from '../Picasso'
import Input, { Props } from './Input'

const renderInput = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { icon, iconPosition } = props

  return render(
    <Picasso loadFonts={false}>
      <Input icon={icon} iconPosition={iconPosition}>
        {children}
      </Input>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Icon prop', () => {
  test('renders icon at the end', () => {
    const { container } = renderInput(null, {
      icon: <SearchIcon />
    })

    expect(container).toMatchSnapshot()
  })

  test('renders icon at the beginning', () => {
    const { container } = renderInput(null, {
      icon: <SearchIcon />,
      iconPosition: 'start'
    })

    expect(container).toMatchSnapshot()
  })
})

describe('Native html attributes', () => {
  test('adds native props to the input', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Input
          readOnly
          required
          disabled
          autoFocus
          tabIndex={-1}
          type='button'
          value='value'
          name='name'
          list='listId'
          form='formId'
          autoComplete='autocomplete'
        />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
