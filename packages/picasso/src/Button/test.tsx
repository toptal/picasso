import React, { ReactNode } from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  PicassoConfig
} from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { titleCase } from 'title-case'

import Button, { Props } from './Button'

jest.mock('title-case')

const renderButton = (
  children: ReactNode,
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { disabled, loading, onClick } = props

  return render(
    <Button disabled={disabled} loading={loading} onClick={onClick}>
      {children}
    </Button>,
    undefined,
    picassoConfig
  )
}

test('onClick callback should be fired after clicking the button', () => {
  const onClick = jest.fn()
  const { getByText } = renderButton('Click me!', { onClick })

  fireEvent.click(getByText('Click me!'))

  expect(onClick).toHaveBeenCalled()
})

test('onClick callback should not be fired when clicked button is in loading state', () => {
  const onClick = jest.fn()
  const { getByText } = renderButton('Click me!', { onClick, loading: true })

  fireEvent.click(getByText('Click me!'))

  expect(onClick).toHaveBeenCalledTimes(0)
})

test('should transform text to title case when titleCase is true', () => {
  renderButton(
    'some text with-the-edge case for TESTING',
    { onClick: () => {} },
    { titleCase: true }
  )

  expect(titleCase).toBeCalledTimes(1)
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
