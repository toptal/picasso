import type { MutableState } from 'final-form'

// `final-form` types a Mutator's `args` as `any[]`; `unknown[]` is the widest
// parameter type that still satisfies it, and the cast documents the tuple
// shape this mutator expects.
export const setHasMultilineCounter = <
  FormValues = object,
  InitialFormValues extends Partial<FormValues> = Partial<FormValues>
>(
  args: unknown[],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const [name, hasCounter] = args as [name: string, hasCounter: boolean]
  const field = state.fields[name]

  if (field) {
    field.data = { ...field.data, hasMultilineCounter: hasCounter }
  }
}
