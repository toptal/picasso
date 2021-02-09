import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import Select from './Select'
import { SelectProps } from './types'

jest.mock('../NonNativeSelect', () => ({
  __esModule: true,
  default: () => <div data-testid='non-native-select' />
}))

jest.mock('../NativeSelect', () => ({
  __esModule: true,
  default: () => <div data-testid='native-select' />
}))

jest.mock('../utils/use-deprecation-warnings', () => ({
  __esModule: true,
  usePropDeprecationWarning: jest.fn()
}))

const mockedUsePropDeprecationWarning = usePropDeprecationWarning as jest.MockedFunction<
  typeof usePropDeprecationWarning
>

const renderSelect = (
  props: OmitInternalProps<SelectProps>,
  picassoConfig?: PicassoConfig
) => render(<Select {...props} />, undefined, picassoConfig)

describe('Select', () => {
  beforeEach(() => {
    mockedUsePropDeprecationWarning.mockClear()
  })

  it('renders native', () => {
    const { getByTestId } = renderSelect({ options: [], native: true })

    expect(getByTestId('native-select')).toBeInTheDocument()
  })

  it('renders non native', () => {
    const { getByTestId } = renderSelect({ options: [] })

    expect(getByTestId('non-native-select')).toBeInTheDocument()
  })

  it('warns about deprecated props', () => {
    const props = { options: [] }

    renderSelect(props)

    expect(mockedUsePropDeprecationWarning).toHaveBeenCalledWith({
      props: expect.objectContaining(props),
      name: 'onSearchChange',
      componentName: 'Select',
      description:
        'Use the Autocomplete component if you require dynamic options.'
    })
  })
})
