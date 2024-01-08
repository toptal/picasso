import React from 'react'
import type { FeatureOptions } from '@toptal/picasso-utils'
import {
  disableUnsupportedProps,
  noop,
  usePropDeprecationWarning,
  documentable,
  forwardRef,
} from '@toptal/picasso-utils'

import type { SelectProps, ValueType } from '../SelectBase'
import {
  DEFAULT_LIMIT,
  DEFAULT_SEARCH_THRESHOLD,
  getOptionText,
  renderOption,
} from '../SelectBase'
import { NonNativeSelect } from '../NonNativeSelect'
import { NativeSelect } from '../NativeSelect'

const purifyProps = (
  props: SelectProps<any, any>
): SelectProps<ValueType, boolean> => {
  const sizeOptions: FeatureOptions<SelectProps> = {
    featureProps: {
      size: 'small',
    },
    unsupportedProps: {
      icon: undefined,
      loading: false,
    },
  }

  return disableUnsupportedProps('Select', props, sizeOptions)
}

export const Select = documentable(
  forwardRef(
    <T extends ValueType, M extends boolean = false>(
      { native, ...props }: SelectProps<T, M>,
      ref: React.Ref<HTMLInputElement> | null
    ) => {
      usePropDeprecationWarning({
        props,
        name: 'error',
        componentName: 'Select',
        description:
          'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
      })

      return native ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <NativeSelect {...purifyProps(props)} ref={ref} />
      ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <NonNativeSelect {...purifyProps(props)} ref={ref} />
      )
    }
  )
)

Select.defaultProps = {
  disabled: false,
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
  limit: DEFAULT_LIMIT,
  enableAutofill: false,
  searchPlaceholder: 'Search',
  native: false,
  status: 'default',
}

export default Select
