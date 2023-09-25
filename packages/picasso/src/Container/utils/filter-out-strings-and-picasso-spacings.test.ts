import { SPACING_12 } from '../../utils'
import filterOutStringAndPicassoSpacing from './filter-out-strings-and-picasso-spacings'

describe('filterOutStringAndPicassoSpacing', () => {
  describe('when PicassoSpacing value is provded', () => {
    it('returns undefined', () => {
      const result = filterOutStringAndPicassoSpacing(SPACING_12)

      expect(result).toBeUndefined()
    })
  })

  describe('when string constant value is provded', () => {
    it('returns undefined', () => {
      const result = filterOutStringAndPicassoSpacing('small')

      expect(result).toBeUndefined()
    })
  })

  describe('when number value is provded', () => {
    it('returns number value', () => {
      const result = filterOutStringAndPicassoSpacing(100)

      expect(result).toBe(100)
    })
  })
})
