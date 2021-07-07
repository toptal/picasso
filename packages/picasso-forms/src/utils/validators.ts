const composeValidators = (validators: any[]) => (value: any, allValues: any) =>
  validators
    .filter(Boolean)
    .reduce(
      (error, validator) => error || validator(value, allValues),
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
