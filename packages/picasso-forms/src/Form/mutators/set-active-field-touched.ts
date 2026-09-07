import type { MutableState } from 'final-form'

export const setActiveFieldTouched = <
  FormValues = object,
  InitialFormValues extends Partial<FormValues> = Partial<FormValues>
>(
  _: unknown[],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const activeFieldName = state.formState.active
  const field = activeFieldName && state.fields[activeFieldName]

  if (field) {
    field.touched = true
  }
}
