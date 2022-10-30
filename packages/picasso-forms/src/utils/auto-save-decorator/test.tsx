import { isValuesEqual } from './auto-save-decorator'

describe('auto-save-decorator', () => {
  describe('isValuesEqual', () => {
    describe('when subscribed fields is provided', () => {
      it('should return true if subscribed values are equal', () => {
        expect(
          isValuesEqual(
            { firstName: 'Bruce', lastName: 'Wayne' },
            { firstName: 'Bruce', lastName: 'Wayne' },
            ['firstName']
          )
        ).toBe(true)

        expect(
          isValuesEqual(
            { firstName: 'Bruce', lastName: 'Wayne' },
            { firstName: 'Bruce', lastName: 'Pain' },
            ['firstName']
          )
        ).toBe(true)
      })

      it('should return false if values are not equal', () => {
        expect(
          isValuesEqual(
            { firstName: 'Bruce', lastName: 'Wayne' },
            { firstName: 'Brook', lastName: 'Wayne' }
          )
        ).toBe(false)
      })
    })

    describe('when subscribed fields is not provided', () => {
      it('should check all fields and return true if values are equal', () => {
        expect(
          isValuesEqual(
            { firstName: 'Bruce', lastName: 'Wayne' },
            { firstName: 'Bruce', lastName: 'Wayne' }
          )
        ).toBe(true)
      })

      it('should check all fields and return false if values are not equal', () => {
        expect(
          isValuesEqual(
            { firstName: 'Bruce', lastName: 'Wayne' },
            { firstName: 'Brook', lastName: 'Wayne' }
          )
        ).toBe(false)
      })
    })

    it('should do shallow comparison', () => {
      expect(
        isValuesEqual(
          { items: [{ id: 1 }, { id: 2 }] },
          { items: [{ id: 1 }, { id: 2 }] }
        )
      ).toBe(false)
    })
  })
})
