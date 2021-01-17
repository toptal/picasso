import { formatAmount } from './format-amount'

describe('formatAmount', () => {
  describe('when `locale` is defined', () => {
    it('formats `en-US` locale by default', () => {
      expect(formatAmount({ amount: 1500 })).toBe('$1,500.00')
    })
  })

  describe('when `locale` is `fr-FR`', () => {
    it('formats `fr-FR` locale', () => {
      expect(formatAmount({ amount: 1500, locale: 'fr-FR' })).toBe('$1,500.00')
    })
  })

  describe('when `EUR` currency provided', () => {
    it('formats EUR currency', () => {
      expect(formatAmount({ amount: 1750, currency: 'EUR' })).toBe('€1,750.00')
    })
  })

  describe('when no currency provided', () => {
    it('formats USD currency by default', () => {
      expect(formatAmount({ amount: 1500 })).toBe('$1,500.00')
    })
  })

  describe('when `amount` has 4 digits of decimals', () => {
    it('formats two digit of decimals USD amount', () => {
      expect(formatAmount({ amount: 24.2587 })).toBe('$24.26')
    })
  })

  describe('when `amount` is negative', () => {
    it('formats negative USD amount', () => {
      expect(formatAmount({ amount: -14.25 })).toBe('-$14.25')
    })
  })

  describe('when `amount` is zero', () => {
    it('formats zero USD amount', () => {
      expect(formatAmount({ amount: 0 })).toBe('$0.00')
    })
  })

  describe('when `amount` is string', () => {
    it('formats amount as a number', () => {
      expect(formatAmount({ amount: '15' })).toBe('$15.00')
    })
  })
})
