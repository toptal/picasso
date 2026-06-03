import React from 'react'
import { render, screen } from '@toptal/picasso-test-utils'

import {
  FieldsLayoutContextProvider,
  useFieldsLayoutContext,
  DEFAULT_LABEL_WIDTH_SIZE,
} from './FieldsLayoutContext'
import type { FieldsLayoutContextProviderProps } from './FieldsLayoutContext'

const mockUseBreakpoint = jest.fn()

jest.mock('@toptal/picasso-utils', () => ({
  ...jest.requireActual('@toptal/picasso-utils'),
  useBreakpoint: () => mockUseBreakpoint(),
}))

const ContextProbe = () => {
  const { layout, labelWidth } = useFieldsLayoutContext()

  return (
    <div>
      <span data-testid="field-layout">{layout}</span>
      <span data-testid="label-width">{JSON.stringify(labelWidth)}</span>
    </div>
  )
}

const renderProvider = (
  props: Partial<FieldsLayoutContextProviderProps> = {}
) =>
  render(
    <FieldsLayoutContextProvider {...props}>
      <ContextProbe />
    </FieldsLayoutContextProvider>
  )

describe('FieldsLayoutContextProvider', () => {
  beforeEach(() => {
    mockUseBreakpoint.mockReturnValue(false)
  })

  it('exposes the requested horizontal layout on larger screens', () => {
    renderProvider({ layout: 'horizontal' })

    expect(screen.getByTestId('field-layout')).toHaveTextContent('horizontal')
  })

  it('forces vertical layout on small screens', () => {
    mockUseBreakpoint.mockReturnValue(true)

    renderProvider({ layout: 'horizontal' })

    expect(screen.getByTestId('field-layout')).toHaveTextContent('vertical')
  })

  it('defaults labelWidth to DEFAULT_LABEL_WIDTH_SIZE', () => {
    renderProvider()

    expect(screen.getByTestId('label-width')).toHaveTextContent(
      String(DEFAULT_LABEL_WIDTH_SIZE)
    )
  })

  it('passes a responsive labelWidth through unchanged', () => {
    renderProvider({ labelWidth: { sm: 2, lg: 4 } })

    expect(screen.getByTestId('label-width')).toHaveTextContent(
      '{"sm":2,"lg":4}'
    )
  })
})
