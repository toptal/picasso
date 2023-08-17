import type { MutableState } from 'final-form'

export const setActiveFieldTouched = <
  FormValues = object,
  InitialFormValues = Partial<FormValues>
>(
  _: any[],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const activeFieldName = state.formState.active
  const field = activeFieldName && state.fields[activeFieldName]

  if (field) {
    field.touched = true
  }
}
