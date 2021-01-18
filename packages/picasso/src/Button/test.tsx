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

describe('Button', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })
  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('onClick callback should be fired after clicking the button', () => {
    const onClick = jest.fn()
    const { getByText } = renderButton('Click me!', { onClick })

    fireEvent.click(getByText('Click me!'))

    expect(onClick).toHaveBeenCalled()
  })

  it('onClick callback should not be fired when clicked button is in loading state', () => {
    const onClick = jest.fn()
    const { getByText } = renderButton('Click me!', { onClick, loading: true })

    fireEvent.click(getByText('Click me!'))

    expect(onClick).toHaveBeenCalledTimes(0)
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test bk9'

    renderButton(TEXT_CONTENT, { onClick: () => {} }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderButton(
      'some text with-the-edge case for TESTING',
      { onClick: () => {}, titleCase: false },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
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
    it('renders disabled version', () => {
      const { container } = api

      expect(container).toMatchSnapshot()
    })

    it('disables button events', () => {
      const { getByText } = api

      fireEvent.click(getByText('Click me!'))

      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
