import React from 'react'

import NativeSelect from '../NativeSelect'
import NonNativeSelect from '../NonNativeSelect'
import disableUnsupportedProps, {
  FeatureOptions
} from '../utils/disable-unsupported-props'
import noop from '../utils/noop'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import { SelectProps, ValueType } from './types'
import { DEFAULT_SEARCH_THRESHOLD, getOptionText, renderOption } from './utils'

const purifyProps = (
  props: SelectProps<any, any>
): SelectProps<ValueType, boolean> => {
  const sizeOptions: FeatureOptions<SelectProps> = {
    featureProps: {
      size: 'small'
    },
    unsupportedProps: {
      icon: undefined,
      loading: false
    }
  }

  return disableUnsupportedProps('Select', props, sizeOptions)
}

export const Select = <T extends ValueType, M extends boolean = false>({
  native,
  ...props
}: SelectProps<T, M>) => {
  usePropDeprecationWarning({
    props,
    name: 'onSearchChange',
    componentName: 'Select',
    description:
      'Use the Autocomplete component if you require dynamic options.'
  })

  return native ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NativeSelect {...purifyProps(props)} />
  ) : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NonNativeSelect {...purifyProps(props)} />
  )
}

Select.defaultProps = {
  disabled: false,
  error: false,
  getDisplayValue: getOptionText,
  iconPosition: 'start',
  loading: false,
  noOptionsText: 'No matches found',
  onChange: noop,
  onBlur: noop,
  renderOption: renderOption,
  size: 'medium',
  width: 'full',
  searchThreshold: DEFAULT_SEARCH_THRESHOLD,
  enableAutofill: false,
  searchPlaceholder: 'Search',
  native: false
}

export default Select
