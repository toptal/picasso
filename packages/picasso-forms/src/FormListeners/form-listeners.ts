import type { ComponentType, ReactElement, ReactNode } from 'react'
import { createElement, Fragment, useRef, useState } from 'react'
import {
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
// the form stores, which the kept `useField` renders on its first render
// TODO: [PF-2522] use react-final-form-listeners' `OnChange` again once
// react-final-form's first render reads the stored value (#1093)
export const OnChange = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FieldValue = any
>({
  name,
  children,
}: OnChangeProps<FieldValue>): ReactElement | null => {
  const { input } = useField<FieldValue>(name, {
    allowNull: true,
    subscription: { value: true },
  })
  const previous = useRef<{ value: FieldValue } | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!previous.current) {
      previous.current = { value: input.value }

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

// react-final-form-listeners 1's `ExternallyChanged`, the one Picasso shipped
// with react-final-form 6: version 3 ignores the first change after it mounts,
// so a value that changes once from outside would never be reported
export const ExternallyChanged = ({
  name,
  children,
}: ExternallyChangedProps): ReactElement => {
  const { input, meta } = useField(name, {
    allowNull: true,
    subscription: { active: true, value: true },
  })
  const [externallyChanged, setExternallyChanged] = useState(false)
  const previous = useRef<{ value: unknown } | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!previous.current) {
      previous.current = { value: input.value }

      return
    }

    if (!Object.is(input.value, previous.current.value)) {
      previous.current.value = input.value
      setExternallyChanged(!meta.active)
    }
  })

  return createElement(Fragment, null, children(externallyChanged))
}

ExternallyChanged.displayName = 'ExternallyChanged'
