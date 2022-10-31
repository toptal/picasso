import { AnyObject, FormApi } from 'final-form'

type ChangedFields<T extends AnyObject> = Partial<Record<keyof T, boolean>>

export const getChangedFields = <T extends AnyObject>(
  newValues: T,
  existingValues?: T,
  subscribedFields?: (keyof T)[]
): ChangedFields<T> => {
  if (!existingValues) {
    return {}
  }

  const keysArray = subscribedFields ?? (Object.keys(newValues) as (keyof T)[])

  const result = keysArray.reduce<Partial<Record<keyof T, boolean>>>(
    (changedFields, field) => {
      if (newValues[field] !== existingValues[field]) {
        changedFields[field] = true
      }

      return changedFields
    },
    {}
  )

  return result as Record<keyof T, boolean>
}

interface Props<T extends AnyObject> {
  onFormValuesChange: (
    changedFields: Partial<Record<keyof T, boolean>>,
    values: T
  ) => void
  subscribedFields?: (keyof T)[]
}

let oldValues: AnyObject = {}

const createAutoSaveDecorator = <T extends AnyObject>({
  onFormValuesChange,
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
          onFormValuesChange(changedFields, nextState.values)

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

export default createAutoSaveDecorator
