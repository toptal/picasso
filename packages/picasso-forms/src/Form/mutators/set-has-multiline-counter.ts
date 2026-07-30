import type { MutableState } from 'final-form'

// `final-form` types a Mutator's `args` as `any[]`, so the parameter cannot be
// the tuple this mutator expects. The cast documents the expected shape.
export const setHasMultilineCounter = <
  FormValues = object,
  InitialFormValues extends Partial<FormValues> = Partial<FormValues>
>(
  args: any[],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const [name, hasCounter] = args as [name: string, hasCounter: boolean]
  const field = state.fields[name]

  if (field) {
    field.data = { ...field.data, hasMultilineCounter: hasCounter }
  }
}
