import validators from './validators'

const { required } = validators

const ERROR = 'Please complete this field.'

describe('validators', () => {
  describe('required', () => {
    it.each([undefined, null, false, '', ' ', '   ', '\t\n', []])(
      'returns an error for %p',
      value => {
        expect(required(value)).toBe(ERROR)
      }
    )

    it.each(['a', ' a ', 0, true, ['a']])('returns undefined for %p', value => {
      expect(required(value)).toBeUndefined()
    })
  })
})
