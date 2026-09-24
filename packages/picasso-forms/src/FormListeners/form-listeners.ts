import type { ComponentType, ReactElement, ReactNode } from 'react'
import { createElement } from 'react'
import {
  ExternallyChanged as UntypedExternallyChanged,
  OnBlur as UntypedOnBlur,
  OnChange as UntypedOnChange,
  OnFocus as UntypedOnFocus,
} from 'react-final-form-listeners'

import { useKeptFieldState } from '../FinalField/keep-field-state'

export interface OnChangeProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
> {
  /** Name of the field to watch */
  name: string
  /** Called with the new and the previous value every time the field's value changes */
  children: (value: FieldValue, previous: FieldValue) => void
}

export interface OnBlurProps {
  /** Name of the field to watch */
  name: string
  /** Called every time the field loses focus */
  children: () => void
}

export interface OnFocusProps {
  /** Name of the field to watch */
  name: string
  /** Called every time the field gains focus */
  children: () => void
}

export interface ExternallyChangedProps {
  /** Name of the field to watch */
  name: string
  /** Rendered with whether the field's value last changed while the field was not focused */
  children: (externallyChanged: boolean) => ReactNode
}

// Each listener registers react-final-form's `Field`, so it keeps the field's
// state the same way a field does
const keepListenerFieldState = <Props extends { name: string }>(
  Listener: ComponentType<Props>,
  displayName: string
) => {
  const KeptListener = (props: Props) => {
    useKeptFieldState(props.name)

    return createElement(Listener, props)
  }

  KeptListener.displayName = displayName

  return KeptListener
}

// react-final-form-listeners 3.0.1 points `types` at a file it does not
// publish, so without these casts consumers get `any` (#51)
export const OnChange = keepListenerFieldState(UntypedOnChange, 'OnChange') as <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
>(
  props: OnChangeProps<FieldValue>
) => ReactElement | null

export const OnBlur = keepListenerFieldState(UntypedOnBlur, 'OnBlur') as (
  props: OnBlurProps
) => ReactElement | null

export const OnFocus = keepListenerFieldState(UntypedOnFocus, 'OnFocus') as (
  props: OnFocusProps
) => ReactElement | null

export const ExternallyChanged = keepListenerFieldState(
  UntypedExternallyChanged,
  'ExternallyChanged'
) as (props: ExternallyChangedProps) => ReactElement | null
