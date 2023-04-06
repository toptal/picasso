import type { AnyObject, FormApi } from 'final-form'

export type ChangedFields<T extends AnyObject> = Partial<
  Record<keyof T, boolean>
>

export const getChangedFields = <T extends AnyObject>(
  newValues: T,
  existingValues?: T,
  subscribedFields?: (keyof T)[]
): ChangedFields<T> => {
  if (!existingValues) {
    return {}
  }

  const keysArray = subscribedFields ?? (Object.keys(newValues) as (keyof T)[])

  const result = keysArray.reduce<ChangedFields<T>>((changedFields, field) => {
    if (newValues[field] !== existingValues[field]) {
      changedFields[field] = true
    }

    return changedFields
  }, {})

  return result
}

interface Props<T extends AnyObject> {
  onChange: (changedFields: ChangedFields<T>, values: T) => void
  subscribedFields?: (keyof T)[]
}

let oldValues: AnyObject = {}

const createFormValuesChangeDecorator = <T extends AnyObject>({
  onChange,
  subscribedFields,
}: Props<T>) => {
  return (form: FormApi<T>) => {
    const unsubscribe = form.subscribe(
      nextState => {
        const changedFields = getChangedFields(
          nextState.values,
          oldValues as T,
          subscribedFields
        )

        if (Object.keys(changedFields).length > 0) {
          onChange(changedFields, nextState.values)

          oldValues = nextState.values
        }
      },
      { values: true }
    )

    return () => {
      unsubscribe()
    }
  }
}

export default createFormValuesChangeDecorator
