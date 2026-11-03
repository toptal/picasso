import type { ReactElement } from 'react'
import React, { createElement } from 'react'
import { FieldArray as FinalFormFieldArray } from 'react-final-form-arrays'

import {
  useFirstRender,
  withFirstRenderItems,
} from '../FinalField/first-render'
import { useKeptFieldState } from '../FinalField/keep-field-state'
import { defaultIsEqual } from './default-is-equal'
import type { FieldArrayProps, FieldArrayRenderProps } from './types'

// Upstream 5 returns `ReactNode`, which `@types/react` 17 and 18 reject as a
// JSX element, and types the items as `any`
const TypedFinalFormFieldArray = FinalFormFieldArray as <FieldValue>(
  props: FieldArrayProps<FieldValue>
) => ReactElement | null

type Target<FieldValue> = Pick<
  FieldArrayProps<FieldValue>,
  'children' | 'component' | 'render'
>

/**
 * The render target with the `fields` and `meta` of the first render that
 * `useFieldArray` derives. react-final-form-arrays renders `component` before
 * `render`, so a `component` is rendered from `render`, the way it renders it
 */
const getFirstRenderTarget = <FieldValue,>(
  {
    children,
    component,
    isEqual = defaultIsEqual,
    render,
  }: FieldArrayProps<FieldValue>,
  getFirstRender: ReturnType<typeof useFirstRender>
): Target<FieldValue> => {
  if (!getFirstRender) {
    return {}
  }

  const correct = (renderProps: FieldArrayRenderProps<FieldValue>) => {
    const firstRender = getFirstRender()

    return firstRender
      ? withFirstRenderItems(renderProps, firstRender, isEqual)
      : renderProps
  }

  if (component) {
    return {
      component: undefined,
      render: renderProps => {
        const props = { ...correct(renderProps), render }

        return createElement(component, props)
      },
    }
  }

  if (render) {
    return { render: renderProps => render(correct(renderProps)) }
  }

  return typeof children === 'function'
    ? { children: renderProps => children(correct(renderProps)) }
    : {}
}

/** react-final-form-arrays' `FieldArray`, keeping its items when it remounts */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldArray = <FieldValue = any,>(
  props: FieldArrayProps<FieldValue>
): React.ReactElement => {
  const getFirstRender = useFirstRender(props.name, props, 'useFieldArray')

  useKeptFieldState(props.name, {}, 'useFieldArray')

  return (
    <TypedFinalFormFieldArray<FieldValue>
      {...props}
      {...getFirstRenderTarget(props, getFirstRender)}
    />
  )
}

FieldArray.displayName = 'FieldArray'

export default FieldArray
