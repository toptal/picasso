import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import { Select } from './Select'
import type { SelectProps } from './'

jest.mock('../NonNativeSelect', () => ({
  __esModule: true,
  NonNativeSelect: () => <div data-testid='non-native-select' />,
}))

jest.mock('../NativeSelect', () => ({
  __esModule: true,
  NativeSelect: () => <div data-testid='native-select' />,
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
