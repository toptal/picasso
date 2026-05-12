import type { FieldValidator } from 'final-form'

const composeValidators =
  <TValue = unknown>(
    validators: (FieldValidator<TValue> | undefined | null | false)[]
  ): FieldValidator<TValue> =>
  (value, allValues, meta) =>
    validators
      .filter((validator): validator is FieldValidator<TValue> =>
        Boolean(validator)
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
