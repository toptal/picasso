import { AnyObject, FormApi } from 'final-form'

interface Props<T extends AnyObject> {
  onChange: (values: T) => void
  subscribedFields?: (keyof T)[]
}

let oldValues: any = {}

export default <T extends AnyObject>({
  onChange,
  subscribedFields,
}: Props<T>) => {
  return (form: FormApi<T>) => {
    const unsubscribe = form.subscribe(
      nextState => {
        if (compareValues(nextState.values, oldValues, subscribedFields)) {
          onChange(nextState.values)

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

const compareValues = <T extends AnyObject>(
  newValues: T,
  existingValues?: T,
  subscribedFields?: (keyof T)[]
) => {
  if (!existingValues) {
    return true
  }

  if (subscribedFields && subscribedFields.length > 0) {
    return subscribedFields.some(
      field => newValues[field] !== existingValues[field]
    )
  }

  return Object.keys(newValues).some(
    key => newValues[key] !== existingValues[key]
  )
}
