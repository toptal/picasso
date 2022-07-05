const atLeastEightCharacters = (value: string) => {
  return value.length >= 8
}

const atLeastOneUpperCaseCharacter = (value: string) => {
  return /[A-Z]/.test(value);
}

const atLeastOneLowerCaseCharacter = (value: string) => {
  return /[a-z]/.test(value);
}

const atLeastOneNumber = (value: string) => {
  return /[0-9]/.test(value);
}

const atLeastOneSpecialCharacter = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
}

export default {
  atLeastEightCharacters,
  atLeastOneUpperCaseCharacter,
  atLeastOneLowerCaseCharacter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
}
