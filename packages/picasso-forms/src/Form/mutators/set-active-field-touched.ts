import { MutableState } from 'final-form'

export const setActiveFieldTouched = <
  FormValues = object,
  InitialFormValues = Partial<FormValues>
>(
  _: any[],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const activeFieldName = state.formState.active

  if (activeFieldName) {
    const field = state.fields[activeFieldName]

    field.touched = true
  }
}
