import type { ComponentType, ReactNode } from 'react'
import React from 'react'

import type {
  FieldArrayRenderProps,
  UseFieldArrayConfig,
} from './use-field-array'
import { useFieldArray } from './use-field-array'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FieldArrayProps<FieldValue = any>
  extends UseFieldArrayConfig<FieldValue> {
  /** Name of the array in the form values */
  name: string
  /** Render function that receives the array `fields` (items and mutators) and `meta` */
  children?: (props: FieldArrayRenderProps<FieldValue>) => ReactNode
  /** Component rendered with the array `fields` and `meta` as props, instead of a render function */
  component?: ComponentType<FieldArrayRenderProps<FieldValue>>
  /** Render function, an alternative to a function child */
  render?: (props: FieldArrayRenderProps<FieldValue>) => ReactNode
}

/**
 * `FieldArray` from `react-final-form-arrays`, rendered through Picasso's
 * `useFieldArray` so the item type flows into the render props and the element
 * type-checks on every `@types/react` major: upstream 5 declares its component
 * as returning `ReactNode`, which `@types/react` 17 and 18 reject as a JSX
 * element type. Needs the `final-form-arrays` mutators on the `<Form>`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FieldArray = <FieldValue = any,>({
  name,
  children,
  component: Component,
  render,
  ...config
}: FieldArrayProps<FieldValue>) => {
  const renderProps = useFieldArray<FieldValue>(name, config)

  if (Component) {
    return <Component {...renderProps} />
  }

  if (render) {
    return <>{render(renderProps)}</>
  }

  if (typeof children !== 'function') {
    throw new Error(
      `FieldArray(${name}) needs a render function as children, a \`render\` prop or a \`component\` prop`
    )
  }

  return <>{children(renderProps)}</>
}

FieldArray.displayName = 'FieldArray'

export default FieldArray
