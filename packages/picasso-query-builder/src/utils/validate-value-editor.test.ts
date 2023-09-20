import validateValueEditor from './validate-value-editor'

describe('validateValueEditor', () => {
  describe('when touched is true', () => {
    describe('when validation is undefined', () => {
      it('returns false', () => {
        expect(
          validateValueEditor({
            touched: true,
          })
        ).toBe(false)
      })
    })

    describe('when validation is false', () => {
      it('returns true', () => {
        expect(validateValueEditor({ touched: true, validation: false })).toBe(
          true
        )
      })
    })

    describe('when validation is true', () => {
      it('returns false', () => {
        expect(validateValueEditor({ touched: true, validation: true })).toBe(
          false
        )
      })
    })

    describe('when validation is a validation result', () => {
      describe('when valid is true', () => {
        it('returns false', () => {
          expect(
            validateValueEditor({ touched: true, validation: { valid: true } })
          ).toBe(false)
        })
      })

      describe('when valid is false', () => {
        it('returns true', () => {
          expect(
            validateValueEditor({ touched: true, validation: { valid: false } })
          ).toBe(true)
        })
      })
    })
  })

  describe('when touched is false', () => {
    describe('when validation is undefined', () => {
      it('returns false', () => {
        expect(
          validateValueEditor({
            touched: false,
          })
        ).toBe(false)
      })
    })

    describe('when validation is false', () => {
      it('returns false', () => {
        expect(validateValueEditor({ touched: false, validation: false })).toBe(
          false
        )
      })
    })

    describe('when validation is true', () => {
      it('returns false', () => {
        expect(validateValueEditor({ touched: false, validation: true })).toBe(
          false
        )
      })
    })

    describe('when validation is a validation result', () => {
      describe('when valid is true', () => {
        it('returns false', () => {
          expect(
            validateValueEditor({ touched: false, validation: { valid: true } })
          ).toBe(false)
        })
      })

      describe('when valid is false', () => {
        it('returns false', () => {
          expect(
            validateValueEditor({
              touched: false,
              validation: { valid: false },
            })
          ).toBe(false)
        })
      })
    })
  })
})
