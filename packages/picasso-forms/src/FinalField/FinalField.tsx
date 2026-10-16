import type { Ref } from 'react'
import React, { createElement } from 'react'
import type { FieldProps, FieldRenderProps } from 'react-final-form'
import { Field as FinalFormField } from 'react-final-form'
import { documentable, forwardRef } from '@toptal/picasso-utils'

import {
  derivesCheckedFromFormat,
  withCheckedFromFormat,
} from './checked-from-format'
import { useKeptFieldState } from './keep-field-state'

/**
 * The render target with the `checked` the kept `useField` derives, for a
 * checkbox that `derivesCheckedFromFormat`. react-final-form's `Field`
 * renders with its own `useField`, so its props are corrected on the way to
 * the target. The `Field` calls function `children` before it looks at
 * `component`, so a `component` is rendered from them, the way the `Field`
 * renders it, while the `Field` still reads `component` to format the value
 */
const getTargetWithCheckedFromFormat = <T extends HTMLElement>(
  props: FieldProps,
  ref: Ref<T>
): Pick<FieldProps, 'children' | 'render'> => {
  if (!derivesCheckedFromFormat(props)) {
    return {}
  }

  const { children, component, render } = props
  const correct = (renderProps: FieldRenderProps) => ({
    ...renderProps,
    input: withCheckedFromFormat(renderProps.input, props),
  })

  if (typeof children === 'function') {
    return {
      children: (renderProps: FieldRenderProps) =>
        children(correct(renderProps)),
    }
  }

  if (typeof component === 'string') {
    return {
      children: ({
        input,
        // react-final-form gives a string component the input and the ref only
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        meta,
        ...rest
      }: FieldRenderProps) =>
        createElement(component, {
          ...withCheckedFromFormat(input, props),
          children,
          ref,
          ...rest,
        }),
    }
  }

  if (component) {
    return {
      children: (renderProps: FieldRenderProps) =>
        createElement(component, { ...correct(renderProps), children }),
    }
  }

  return render
    ? {
        render: (renderProps: FieldRenderProps) => render(correct(renderProps)),
      }
    : {}
}

/**
 * react-final-form's `Field`, keeping its value when it remounts, and with
 * version 6's `checked` for a checkbox that passes a custom `format`
 */
export const FinalField = documentable(
  forwardRef(function FinalField<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FieldValue = any,
    T extends HTMLElement = HTMLElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FormValues = Record<string, any>
  >(props: FieldProps<FieldValue, T, FormValues>, ref: Ref<T>) {
    useKeptFieldState(props.name, props)

    return (
      <FinalFormField<FieldValue, T, FormValues>
        {...props}
        {...getTargetWithCheckedFromFormat(props, ref)}
        ref={ref}
      />
    )
  })
)

FinalField.displayName = 'FinalField'

export default FinalField
