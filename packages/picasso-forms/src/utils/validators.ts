const composeValidators = (...validators: any[]) => (
  value: any,
  allValues: any
) =>
  validators.reduce(
    (error, validator) => error || validator(value, allValues),
    undefined
  )

const required = (value: string) =>
  value ? undefined : 'This field is required'

export default { composeValidators, required }
