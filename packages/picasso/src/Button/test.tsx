import React, { ReactNode } from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  PicassoConfig
} from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Button, { Props } from './Button'

jest.mock('ap-style-title-case')

const renderButton = (
  children: ReactNode,
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { disabled, loading, onClick, titleCase } = props

  return render(
    <Button
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      titleCase={titleCase}
    >
      {children}
    </Button>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

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

test('should transform text to title case when Picasso titleCase property is true', () => {
  const TEXT_CONTENT = 'Test bk9'

  renderButton(TEXT_CONTENT, { onClick: () => {} }, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderButton(
    'some text with-the-edge case for TESTING',
    { onClick: () => {}, titleCase: false },
    { titleCase: true }
  )

  expect(spiedOnTitleCase).toBeCalledTimes(0)
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
