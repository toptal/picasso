import React from 'react'
import type { FeatureOptions } from '@toptal/picasso-utils'
import {
  disableUnsupportedProps,
  documentable,
  forwardRef,
} from '@toptal/picasso-utils'

import type { SelectProps, ValueType } from '../SelectBase'
import { NonNativeSelect } from '../NonNativeSelect'
import { NativeSelect } from '../NativeSelect'

const purifyProps = <T extends ValueType, M extends boolean>(
  props: SelectProps<T, M>
): SelectProps<T, M> => {
  const sizeOptions: FeatureOptions<SelectProps<T, M>> = {
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

export default Select
