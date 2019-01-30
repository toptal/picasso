import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Picasso from '../index'
import Button from './Button'

const renderButton = (children, props = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Button {...props}>{children}</Button>
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
  let onClick
  let api

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
