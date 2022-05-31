import passwordValidators from './validators'

const {
  atLeastEightCharacters,
  atLeastOneUpperCaseCharacter,
  atLeastOneLowerCaseCharacter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
} = passwordValidators

describe('PasswordInput field requirements', () => {
  describe('atLeastEightCharacters', () => {
    it('test string to have at least eight characters', () => {
      expect(atLeastEightCharacters('1234567')).toBe(false)
      expect(atLeastEightCharacters('12345678')).toBe(true)
    })
  })

  describe('atLeastOneUpperCaseCharacter', () => {
    it('test string to have at least one uppercase character', () => {
      expect(atLeastOneUpperCaseCharacter('asdfgh')).toBe(false)
      expect(atLeastOneUpperCaseCharacter('asDfgh')).toBe(true)
    })
  })

  describe('atLeastOneLowerCaseCharacter', () => {
    it('test string to have at least one lowercase character', () => {
      expect(atLeastOneLowerCaseCharacter('ASDFGH')).toBe(false)
      expect(atLeastOneLowerCaseCharacter('ASdFGH')).toBe(true)
    })
  })

  describe('atLeastOneNumber', () => {
    it('test string to have at least one number', () => {
      expect(atLeastOneNumber('asdfgh')).toBe(false)
      expect(atLeastOneNumber('asdfgh1')).toBe(true)
    })
  })
  describe('atLeastOneSpecialCharacter', () => {
    it('test string to have at least one special character', () => {
      expect(atLeastOneSpecialCharacter('asdfgh')).toBe(false)
      expect(atLeastOneSpecialCharacter('asd*fgh')).toBe(true)
    })
  })
})
