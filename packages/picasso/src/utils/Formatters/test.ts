import { formatAmount } from './format-amount'

describe('formatAmount', () => {
  describe('when `locale` is defined', () => {
    it('formats `en-US` locale by default', () => {
      expect(formatAmount({ amount: 1500 })).toBe('$1,500.00')
    })
  })

  describe('when `locale` is `fr-FR`', () => {
    it('formats `fr-FR` locale', () => {
      expect(formatAmount({ amount: 1500, locale: 'fr-FR' })).toBe(
        '1 500,00 $US'
      )
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

  describe('options', () => {
    it('displays decimals when options are not provided', () => {
      expect(formatAmount({ amount: '15' })).toBe('$15.00')
    })

    it('does not display decimals when options are 0', () => {
      expect(
        formatAmount({
          amount: '15',
          options: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })
      ).toBe('$15')
    })

    it('displays min number of decimal digits', () => {
      expect(
        formatAmount({
          amount: '15',
          options: {
            minimumFractionDigits: 3,
          },
        })
      ).toBe('$15.000')
    })

    it('displays max number of decimal digits', () => {
      expect(
        formatAmount({
          amount: '15.1234',
          options: {
            maximumFractionDigits: 2,
          },
        })
      ).toBe('$15.12')

      expect(
        formatAmount({
          amount: '15.1294',
          options: {
            maximumFractionDigits: 2,
          },
        })
      ).toBe('$15.13')
    })
  })
})
