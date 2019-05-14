import React, { ReactNode } from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import Button, { Props } from './Button'

const renderButton = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { disabled, onClick } = props

  return render(
    <Picasso loadFonts={false}>
      <Button disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </Picasso>
  )
}

afterEach(cleanup)

test('onClick callback should be fired after clicking the button', () => {
  const onClick = jest.fn()
  const { getByText } = renderButton('Click me!', { onClick })

  fireEvent.click(getByText('Click me!'))

  expect(onClick).toHaveBeenCalled()
})

describe('disabled button', () => {
  let onClick: () => void
  let api: RenderResult

  beforeEach(() => {
    onClick = jest.fn()

    api = renderButton('Click me!', {
      onClick,
      disabled: true
    })
  })
  test('renders disabled version', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('disables button events', () => {
    const { getByText } = api

    fireEvent.click(getByText('Click me!'))

    expect(onClick).not.toHaveBeenCalled()
  })
})
