import type { Ref } from 'react'
import React, { createElement } from 'react'
import type { FieldProps, FieldRenderProps } from 'react-final-form'
import { Field as FinalFormField } from 'react-final-form'
import { documentable, forwardRef } from '@toptal/picasso-utils'

import {
  derivesCheckedFromFormat,
  withCheckedFromFormat,
} from './checked-from-format'
import { useFirstRender, withFirstRender } from './first-render'
import { useKeptFieldState } from './keep-field-state'

type Correct = (renderProps: FieldRenderProps) => FieldRenderProps

/**
 * The correction react-final-form's `Field` needs on the way to its render
 * target: the first render that the kept `useField` derives, and the
 * `checked` it derives for a checkbox that `derivesCheckedFromFormat`
 */
const getCorrection = (
  props: FieldProps,
  getFirstRender: ReturnType<typeof useFirstRender>
): Correct | undefined => {
  if (!getFirstRender && !derivesCheckedFromFormat(props)) {
    return undefined
  }

  return renderProps => {
    const firstRender = getFirstRender?.()
    const shown = firstRender
      ? withFirstRender(renderProps, firstRender, props)
      : renderProps

    return { ...shown, input: withCheckedFromFormat(shown.input, props) }
  }
}

/**
 * The render target with corrected props. The `Field` calls function
 * `children` before it looks at `component`, so a `component` is rendered
 * from them, the way the `Field` renders it, while the `Field` still reads
 * `component` to format the value
 */
const getCorrectedTarget = <T extends HTMLElement>(
  props: FieldProps,
  ref: Ref<T>,
  correct?: Correct
): Pick<FieldProps, 'children' | 'render'> => {
  if (!correct) {
    return {}
  }

  const { children, component, render } = props

  if (typeof children === 'function') {
    return {
      children: (renderProps: FieldRenderProps) =>
        children(correct(renderProps)),
    }
  }

  if (typeof component === 'string') {
    return {
      children: (renderProps: FieldRenderProps) => {
        const {
          input,
          // react-final-form gives a string component the input and the ref only
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          meta,
          ...rest
        } = correct(renderProps)

        return createElement(component, { ...input, children, ref, ...rest })
      },
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
    const getFirstRender = useFirstRender(props.name, props)

    useKeptFieldState(props.name, props)

    return (
      <FinalFormField<FieldValue, T, FormValues>
        {...props}
        {...getCorrectedTarget(
          props,
          ref,
          getCorrection(props, getFirstRender)
        )}
        ref={ref}
      />
    )
  })
)

FinalField.displayName = 'FinalField'

export default FinalField
