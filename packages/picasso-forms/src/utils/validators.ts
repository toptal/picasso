import type { FieldValidator } from 'final-form'

type ComposeValidators = {
  // Typed overload: consumers passing `FieldValidator<T>[]` get full inference
  // on the composed validator's value type.
  <T>(
    validators: readonly (FieldValidator<T> | undefined | null | false)[]
  ): FieldValidator<T>
  // Legacy overload: preserves the pre-PF-2031 ability to pass mixed or
  // untyped validator arrays (the call site used to take `any[]`).
  (validators: readonly unknown[]): FieldValidator<unknown>
}

const composeValidators: ComposeValidators =
  (validators: readonly unknown[]): FieldValidator<unknown> =>
  (value, allValues, meta) =>
    validators
      .filter(
        (validator): validator is FieldValidator<unknown> =>
          typeof validator === 'function'
      )
      .reduce<unknown>(
        (error, validator) => error || validator(value, allValues, meta),
        undefined
      )

const required = (value: unknown) =>
  value === undefined ||
  value === false ||
  value === '' ||
  value === null ||
  (Array.isArray(value) && value.length === 0)
    ? 'Please complete this field.'
    : undefined

export default { composeValidators, required }
