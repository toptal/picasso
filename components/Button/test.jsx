import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import Picasso from '../index'
import Button from './index'

const renderButton = (children, props = {}) => {
  return render(
    <Picasso>
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

describe('outlined button', () => {
  test('renders default outlined button', () => {
    const { container } = renderButton('Outlined', { variant: 'outlined' })

    expect(container).toMatchSnapshot()
  })

  test('renders primary outlined button', () => {
    const { container } = renderButton('Outlined', {
      variant: 'outlined',
      color: 'primary'
    })

    expect(container).toMatchSnapshot()
  })

  test('renders secondary outlined button', () => {
    const { container } = renderButton('Outlined', {
      variant: 'outlined',
      color: 'secondary'
    })

    expect(container).toMatchSnapshot()
  })
})

describe('contained button', () => {
  test('renders default contained button', () => {
    const { container } = renderButton('Contained', { variant: 'contained' })

    expect(container).toMatchSnapshot()
  })

  test('renders primary contained button', () => {
    const { container } = renderButton('Contained', {
      variant: 'contained',
      color: 'primary'
    })

    expect(container).toMatchSnapshot()
  })

  test('renders secondary contained button', () => {
    const { container } = renderButton('Contained', {
      variant: 'contained',
      color: 'secondary'
    })

    expect(container).toMatchSnapshot()
  })
})

describe('flat button', () => {
  test('renders default flat button', () => {
    const { container } = renderButton('Flat')

    expect(container).toMatchSnapshot()
  })

  test('renders primary flat button', () => {
    const { container } = renderButton('Flat', { color: 'primary' })

    expect(container).toMatchSnapshot()
  })

  test('renders secondary flat button', () => {
    const { container } = renderButton('Flat', { color: 'secondary' })

    expect(container).toMatchSnapshot()
  })
})
