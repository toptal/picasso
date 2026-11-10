import { useEffect, useState } from 'react'
import type { FormApi } from 'final-form'
import { getIn } from 'final-form'
import type { FieldRenderProps, UseFieldConfig } from 'react-final-form'
import { useForm } from 'react-final-form'

type RegisterConfig = Pick<UseFieldConfig, 'defaultValue' | 'initialValue'>

type InputConfig = Pick<
  UseFieldConfig,
  | 'allowNull'
  | 'component'
  | 'format'
  | 'formatOnBlur'
  | 'multiple'
  | 'parse'
  | 'type'
  | 'value'
>

type IsEqual = NonNullable<UseFieldConfig['isEqual']>

type ItemIterator<Result> = (name: string, index: number) => Result

interface ItemsRenderProps {
  fields: {
    forEach: (iterator: ItemIterator<void>) => void
    length: number
    map: <Result>(iterator: ItemIterator<Result>) => Result[]
    value: unknown
  }
  meta: object
}

/** The value and initial value final-form will publish for field `name` */
export interface FirstRender {
  initial: unknown
  name: string
  value: unknown
}

const defaultFormat = (value: unknown) => (value === undefined ? '' : value)
const defaultParse = (value: unknown) => (value === '' ? undefined : value)
const identity = (value: unknown) => value
const tripleEquals: IsEqual = (left, right) => left === right

// A copy by property descriptor, so react-final-form's lazy getters stay
// lazy (its FIX #167), with `properties` in place of the source's own
const withProperties = <Source extends object>(
  source: Source,
  properties: PropertyDescriptorMap
) =>
  Object.defineProperties({} as Source, {
    ...Object.getOwnPropertyDescriptors(source),
    ...properties,
  })

// What react-final-form's mount effect writes back over a field final-form
// holds no state for, unless the claim, which `destroyOnUnregister` skips,
// registered the field first
const getRefill = (form: FormApi, name: string, refill: unknown) =>
  form.destroyOnUnregister && !form.getFieldState(name) ? refill : undefined

// What final-form 5.0.1's `registerField` leaves for the field after that
const getRegistered = (
  form: FormApi,
  name: string,
  { initialValue, defaultValue }: RegisterConfig
): FirstRender => {
  const { initialValues, values } = form.getState()
  const initial = getIn(initialValues ?? {}, name)
  const refill = getRefill(
    form,
    name,
    initial === undefined ? initialValue : initial
  )
  const value = refill === undefined ? getIn(values, name) : refill

  if (initialValue !== undefined) {
    const keepsValue = value !== undefined && value !== initial

    return {
      initial: initialValue,
      name,
      value: keepsValue ? value : initialValue,
    }
  }

  const isUnset = value === undefined && initial === undefined

  return { initial, name, value: isUnset ? defaultValue : value }
}

// react-final-form 7.0.1's formatting of `input.value`
const formatValue = (
  stored: unknown,
  name: string,
  { allowNull, component, format = defaultFormat, formatOnBlur }: InputConfig
) => {
  const value = stored === null && !allowNull ? '' : stored

  if (formatOnBlur) {
    return component === 'input' ? defaultFormat(value) : value
  }

  return allowNull && value === null ? value : format(value, name)
}

// react-final-form 7.0.1's `input.value`, for a value of our choosing
const getInputValue = (stored: unknown, name: string, config: InputConfig) => {
  const { component, multiple, type, value: ownValue } = config
  const value = formatValue(stored, name, config)

  if ((component === 'select' || type === 'select') && multiple) {
    return Array.isArray(value) ? value : []
  }

  return (type === 'checkbox' || type === 'radio') && ownValue !== undefined
    ? ownValue
    : value
}

// react-final-form 7.0.1's `input.checked`, for a value of our choosing
const getInputChecked = (
  stored: unknown,
  name: string,
  { parse = defaultParse, type, value: ownValue }: InputConfig
) => {
  if (type === 'checkbox') {
    const parsed = parse(stored, name)

    return ownValue === undefined
      ? Boolean(parsed)
      : Array.isArray(parsed) && parsed.includes(ownValue)
  }

  return type === 'radio' ? parse(stored, name) === ownValue : undefined
}

// The meta final-form derives from the value and the initial value alone
const getMetaProperties = (
  { initial, value }: FirstRender,
  isEqual: IsEqual = tripleEquals
): PropertyDescriptorMap => {
  const pristine = isEqual(initial, value)

  return {
    dirty: { enumerable: true, value: !pristine },
    initial: { enumerable: true, value: initial },
    pristine: { enumerable: true, value: pristine },
  }
}

/**
 * Until react-final-form's own state for the field catches up, a getter of
 * what final-form will publish for it once react-final-form's mount effect
 * registers it. Call the getter where the field renders: react-final-form's
 * own `Field` also re-renders without the component around it, and the getter
 * reads the form as it is then. It only reads the form, so a render that never
 * commits leaves nothing behind.
 *
 * Works around react-final-form 7.0.1's first render, which no longer
 * registers the field but builds it from `initialValues` and ignores a stored
 * value (final-form/react-final-form#1093), shows the empty entry of another
 * field with the same name instead of the field's own `initialValue` or
 * `defaultValue`, and gives an array no `length`.
 *
 * TODO: [PF-2522] drop once a react-final-form release builds the first
 * render from what the field holds once it registers (#1093)
 */
export const useFirstRender = (
  name: string,
  config: RegisterConfig = {},
  hookName = 'useField'
) => {
  const form = useForm(hookName)
  // The name react-final-form's own state has caught up with. It is state set
  // from an effect, like react-final-form's, so both updates land in the same
  // render: a synchronous render from above in between, such as one a layout
  // effect or `useSyncExternalStore` starts, skips both and keeps correcting
  const [settledName, setSettledName] = useState<string>()

  useEffect(() => {
    setSettledName(name)
  }, [name])

  if (!name || settledName === name) {
    return undefined
  }

  return (): FirstRender => getRegistered(form, name, config)
}

/** A field's render props with `input` and `meta` built from `firstRender` */
export const withFirstRender = <Props extends FieldRenderProps>(
  props: Props,
  firstRender: FirstRender,
  config: InputConfig & Pick<UseFieldConfig, 'isEqual'> = {}
): Props => {
  const { name, value } = firstRender

  return withProperties(props, {
    input: {
      enumerable: true,
      value: withProperties(props.input, {
        checked: {
          enumerable: true,
          get: () => getInputChecked(value, name, config),
        },
        value: {
          enumerable: true,
          get: () => getInputValue(value, name, config),
        },
      }),
    },
    meta: {
      enumerable: true,
      value: withProperties(props.meta, {
        ...getMetaProperties(firstRender, config.isEqual),
        length: {
          enumerable: true,
          value: Array.isArray(value) ? value.length : undefined,
        },
      }),
    },
  })
}

/** An array's render props with `fields` and `meta` built from `firstRender` */
export const withFirstRenderItems = <Props extends ItemsRenderProps>(
  props: Props,
  firstRender: FirstRender,
  isEqual: IsEqual
): Props => {
  const { name, value } = firstRender
  const itemNames = Array.from(
    { length: Array.isArray(value) ? value.length : 0 },
    (_item, index) => `${name}[${index}]`
  )

  return withProperties(props, {
    fields: {
      enumerable: true,
      value: withProperties(props.fields, {
        forEach: {
          enumerable: true,
          value: (iterator: ItemIterator<void>) =>
            itemNames.forEach((itemName, index) => iterator(itemName, index)),
        },
        length: { enumerable: true, value: itemNames.length },
        map: {
          enumerable: true,
          value: <Result>(iterator: ItemIterator<Result>) =>
            itemNames.map((itemName, index) => iterator(itemName, index)),
        },
        // react-final-form-arrays formats the array as it is
        value: {
          enumerable: true,
          value: getInputValue(value, name, { format: identity }),
        },
      }),
    },
    meta: {
      enumerable: true,
      value: withProperties(
        props.meta,
        getMetaProperties(firstRender, isEqual)
      ),
    },
  })
}
