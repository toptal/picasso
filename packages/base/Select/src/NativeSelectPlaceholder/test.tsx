import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import type { Props } from './NativeSelectPlaceholder'
import NativeSelectPlaceholder from './NativeSelectPlaceholder'

const CHILDREN = 'Select an option'

const renderNativeSelectPlaceholder = ({
  children = CHILDREN,
  emptySelectValue = '',
  disabled = false,
  selected = false,
}: Partial<Props> = {}) =>
  render(
    <NativeSelectPlaceholder
      emptySelectValue={emptySelectValue}
      disabled={disabled}
      selected={selected}
    >
      {children}
    </NativeSelectPlaceholder>
  )

describe('NativeSelectPlaceholder', () => {
  it('renders', () => {
    const { container } = renderNativeSelectPlaceholder()

    expect(container).toMatchSnapshot()
  })

  it('renders with emptySelectValue', () => {
    const { container } = renderNativeSelectPlaceholder({
      emptySelectValue: 'foo',
    })

    expect(container).toMatchSnapshot()
  })

  it('renders disabled', () => {
    const { container } = renderNativeSelectPlaceholder({ disabled: true })

    expect(container).toMatchSnapshot()
  })

  it('renders nothing when selected, disabled and without text', () => {
    const { queryByRole } = renderNativeSelectPlaceholder({
      children: null,
      disabled: true,
      selected: true,
    })

    expect(queryByRole('option')).not.toBeInTheDocument()
  })

  it('renders the reset row when selected and without text', () => {
    const { getByRole } = renderNativeSelectPlaceholder({
      children: null,
      selected: true,
    })

    expect(getByRole('option')).toBeEnabled()
  })
})
