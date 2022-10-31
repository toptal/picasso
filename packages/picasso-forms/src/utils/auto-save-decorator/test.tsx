import { getChangedFields } from './auto-save-decorator'

describe('auto-save-decorator', () => {
  describe('getChangedValues', () => {
    describe('when subscribed fields is provided', () => {
      describe('when subscribed fields are changed', () => {
        it('should return changed fields if values are not equal', () => {
          expect(
            getChangedFields(
              { firstName: 'Bruce', lastName: 'Wayne' },
              { firstName: 'Brook', lastName: 'Wayne' },
              ['firstName']
            )
          ).toEqual({ firstName: true })
        })
      })

      describe('when subscribed fields are not changed', () => {
        it('should return empty object for fields', () => {
          expect(
            getChangedFields(
              { firstName: 'Bruce', lastName: 'Wayne' },
              { firstName: 'Bruce', lastName: 'Wayne' },
              ['firstName']
            )
          ).toEqual({})

          expect(
            getChangedFields(
              { firstName: 'Bruce', lastName: 'Wayne' },
              { firstName: 'Bruce', lastName: 'Pain' },
              ['firstName']
            )
          ).toEqual({})
        })
      })
    })

    describe('when subscribed fields is not provided', () => {
      describe('when values are not equal', () => {
        it('should check all fields and return changed fields', () => {
          expect(
            getChangedFields(
              { firstName: 'Bruce', lastName: 'Wayne' },
              { firstName: 'Brook', lastName: 'Wayne' }
            )
          ).toEqual({ firstName: true })

          expect(
            getChangedFields(
              { firstName: 'Bruce', lastName: 'Wayne' },
              { firstName: 'Brook', lastName: 'Pain' }
            )
          ).toEqual({ firstName: true, lastName: true })
        })
      })

      it('should check all fields and return empty object if values are equal', () => {
        expect(
          getChangedFields(
            { firstName: 'Bruce', lastName: 'Wayne' },
            { firstName: 'Bruce', lastName: 'Wayne' }
          )
        ).toEqual({})
      })
    })

    it('should do shallow comparison', () => {
      expect(
        getChangedFields(
          { items: [{ id: 1 }, { id: 2 }] },
          { items: [{ id: 1 }, { id: 2 }] }
        )
      ).toEqual({ items: true })
    })
  })
})
