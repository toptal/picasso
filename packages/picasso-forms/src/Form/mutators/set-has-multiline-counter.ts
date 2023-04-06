import type { MutableState } from 'final-form'

export const setHasMultilineCounter = <
  FormValues = object,
  InitialFormValues = Partial<FormValues>
>(
  args: [name: string, hasCounter: boolean],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const [name, hasCounter] = args
  const field = state.fields[name]

  if (field) {
    field.data = { ...field.data, hasMultilineCounter: hasCounter }
  }
}
