import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import NativeSelectPlaceholder, { Props } from './NativeSelectPlaceholder'

const CHILDREN = 'Select an option'

const renderNativeSelectPlaceholder = ({
  children = CHILDREN,
  emptySelectValue = '',
  disabled = false
}: Partial<Props> = {}) =>
  render(
    <NativeSelectPlaceholder
      emptySelectValue={emptySelectValue}
      disabled={disabled}
    >
      {children}
    </NativeSelectPlaceholder>
  )

describe('NativeSelectPlaceholder', () => {
  it('renders', () => {
    const { container } = renderNativeSelectPlaceholder()

    expect(container).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const { container } = renderNativeSelectPlaceholder({ disabled: true })

    expect(container).toMatchSnapshot()
  })
})
