import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Select from './Select'
import { SelectProps } from './'

jest.mock('../NonNativeSelect', () => ({
  __esModule: true,
  default: () => <div data-testid='non-native-select' />
}))

jest.mock('../NativeSelect', () => ({
  __esModule: true,
  default: () => <div data-testid='native-select' />
}))

const renderSelect = (
  props: OmitInternalProps<SelectProps>,
  picassoConfig?: PicassoConfig
) => render(<Select {...props} />, undefined, picassoConfig)

describe('Select', () => {
  it('renders native', () => {
    const { getByTestId } = renderSelect({ options: [], native: true })

    expect(getByTestId('native-select')).toBeInTheDocument()
  })

  it('renders non native', () => {
    const { getByTestId } = renderSelect({ options: [] })

    expect(getByTestId('non-native-select')).toBeInTheDocument()
  })
})
