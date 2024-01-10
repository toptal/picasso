import type { SidebarTagProps } from '../../SidebarItemContent'
import getTagProps from './get-tag-props'

describe('getTagProps', () => {
  describe('when string value is passed', () => {
    it('returns object with the value in content property', () => {
      const value = 'foobar'
      const props = getTagProps(value)

      expect(props).toEqual({ content: value })
    })
  })

  describe('when falsy input is passed', () => {
    it('returns the same value', () => {
      const value = undefined
      const props = getTagProps(value)

      expect(props).toEqual(value)
    })
  })

  describe('when tag props object is passed', () => {
    const values: SidebarTagProps[] = [
      { content: 'foobar' },
      { content: 'foobar', variant: 'green' },
    ]

    it.each(values)('returns the same object', value => {
      const props = getTagProps(value)

      expect(props).toStrictEqual(value)
    })
  })
})
