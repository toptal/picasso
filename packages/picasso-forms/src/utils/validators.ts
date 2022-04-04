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

export type RequirementValidator = (
  value: any,
  allValues: any
) => {
  error: boolean
  errorMessage?: string
}
export const composeRequirementsValidators =
  (validators: RequirementValidator[]) => (value: any, allValues: any) =>
    validators.map(validator => validator(value, allValues))

export const wrapRequirementsWithValidator =
  (validators: RequirementValidator[]) => (value: any, allValues: any) =>
    validators.every(validator => validator(value, allValues).error === false)

const atLeastEightCharacters: RequirementValidator = (value: string) => {
  return value.length >= 8
    ? { error: false }
    : { error: true, errorMessage: 'At least 8 characters' }
}

const atLeastOneUpperCaseCharacter: RequirementValidator = (value: string) => {
  return /[A-Z]/.test(value)
    ? { error: false }
    : { error: true, errorMessage: '1 uppercase character' }
}

const atLeastOneLowerCaseCharacter: RequirementValidator = (value: string) => {
  return /[a-z]/.test(value)
    ? { error: false }
    : { error: true, errorMessage: '1 lowercase character' }
}

const atLeastOneNumber: RequirementValidator = (value: string) => {
  return /[0-9]/.test(value)
    ? { error: false }
    : { error: true, errorMessage: '1 number' }
}

const atLeastOneSpecialCharacter: RequirementValidator = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    ? { error: false }
    : { error: true, errorMessage: '1 special character' }
}

export default {
  composeValidators,
  required,
  atLeastEightCharacters,
  atLeastOneUpperCaseCharacter,
  atLeastOneLowerCaseCharacter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter
}
