import type { Ref } from 'react'
import React from 'react'
import type { FieldProps } from 'react-final-form'
import { Field as FinalFormField } from 'react-final-form'
import { documentable, forwardRef } from '@toptal/picasso-utils'

import { useClaimedFieldState } from './use-claimed-field-state'

/** react-final-form's `Field`, keeping its value when it remounts */
export const FinalField = documentable(
  forwardRef(
    <
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      FieldValue = any,
      T extends HTMLElement = HTMLElement,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      FormValues = Record<string, any>
    >(
      props: FieldProps<FieldValue, T, FormValues>,
      ref: Ref<T>
    ) => {
      useClaimedFieldState(props.name, props)

      return <FinalFormField<FieldValue, T, FormValues> {...props} ref={ref} />
    }
  )
)

FinalField.displayName = 'FinalField'

export default FinalField
