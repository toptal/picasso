import type { ComponentType, ReactElement, ReactNode } from 'react'
import { createElement, useRef } from 'react'
import { useForm } from 'react-final-form'
import {
  ExternallyChanged as UntypedExternallyChanged,
  OnBlur as UntypedOnBlur,
  OnFocus as UntypedOnFocus,
} from 'react-final-form-listeners'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

import { useKeptFieldState } from '../FinalField/keep-field-state'
import { useField } from '../FinalField/use-field'

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

// react-final-form-listeners' `OnChange`, except that it starts from the value
// the form stores: react-final-form 7.0.1 renders an `allowNull` field whose
// initial value is `null` as `null` on its first render, so a remount reported
// the stored value as a change from `null`
// TODO: [PF-2522] use react-final-form-listeners' `OnChange` again once
// react-final-form's first render reads the stored value
export const OnChange = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
>({
  name,
  children,
}: OnChangeProps<FieldValue>): ReactElement | null => {
  const form = useForm('OnChange')
  const { input } = useField<FieldValue>(name, {
    allowNull: true,
    subscription: { value: true },
  })
  const previous = useRef<{ value: FieldValue } | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!previous.current) {
      const stored = form.getFieldState(name)
      const isForcedToNull =
        input.value === null &&
        stored?.initial === null &&
        stored.value !== null

      previous.current = {
        // What react-final-form renders for a field without `format`
        value: isForcedToNull ? stored.value ?? '' : input.value,
      }

      return
    }

    if (!Object.is(input.value, previous.current.value)) {
      const { value: last } = previous.current

      previous.current.value = input.value
      children(input.value, last)
    }
  })

  return null
}

OnChange.displayName = 'OnChange'

// react-final-form-listeners 3.0.1 points `types` at a file it does not
// publish, so without these casts consumers get `any` (#51)
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
