import getBadgeProps from './get-badge-props'
import type { SidebarBadgeProps } from '../../SidebarItemContent'

describe('getBadgeProps', () => {
  describe('when number value is passed', () => {
    it.each([0, 9, 50, 9999])(
      'returns object with the value in content property',
      value => {
        const props = getBadgeProps(value)

        expect(props).toEqual({ content: value })
      }
    )
  })

  describe('when falsy input is passed', () => {
    it('returns the same value', () => {
      const value = undefined
      const props = getBadgeProps(value)

      expect(props).toEqual(value)
    })
  })

  describe('when badge props object is passed', () => {
    const values: SidebarBadgeProps[] = [
      { content: 5 },
      { content: 0, max: 10, variant: 'white' },
    ]

    it.each(values)('returns the same object', value => {
      const props = getBadgeProps(value)

      expect(props).toStrictEqual(value)
    })
  })
})
