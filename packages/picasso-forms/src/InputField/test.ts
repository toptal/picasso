import { FieldMetaState } from 'react-final-form'

import { getInputStatus } from './InputField'

describe('getInputStatus', () => {
  describe('when field has an error', () => {
    it('returns "error"', () => {
      const meta: FieldMetaState<string> = {
        error: 'Some error message',
        touched: true,
      }

      expect(getInputStatus(meta, { showValidState: false })).toBe('error')
    })
  })

  it('returns "default" when field has not been touched', () => {
    const meta: FieldMetaState<string> = {
      touched: false,
    }

    expect(getInputStatus(meta, { showValidState: true })).toBe('default')
  })

  describe('when field has a submit error', () => {
    it('returns "error" if the field is not dirty since last submit', () => {
      const meta: FieldMetaState<string> = {
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: false,
      }

      expect(getInputStatus(meta, { showValidState: false })).toBe('error')
    })

    describe('when field has been dirty since last submit', () => {
      it('returns "success" if show valid state is enabled', () => {
        const meta: FieldMetaState<string> = {
          touched: true,
          submitError: 'Some error message',
          dirtySinceLastSubmit: true,
        }

        expect(getInputStatus(meta, { showValidState: true })).toBe('success')
      })

      it('returns "default" if show valid state is not enabled for the form', () => {
        const meta: FieldMetaState<string> = {
          touched: true,
          submitError: 'Some error message',
          dirtySinceLastSubmit: true,
        }

        expect(getInputStatus(meta, { showValidState: false })).toBe('default')
      })
    })
  })

  describe('when field has not been touched', () => {
    it('returns "default"', () => {
      const meta: FieldMetaState<string> = {
        touched: false,
      }

      expect(getInputStatus(meta, { showValidState: false })).toBe('default')
    })
  })

  describe('when field has no error and no submit error and touched', () => {
    it('returns "success" if show valid state is enabled for the form', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false,
      }

      expect(getInputStatus(meta, { showValidState: true })).toBe('success')
    })

    it('returns "default" if show valid state is not enabled for the form', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false,
      }

      expect(getInputStatus(meta, { showValidState: false })).toBe('default')
    })
  })

  describe('when validate on submit enabled and modified since last submit', () => {
    it('returns "default"', () => {
      const meta: FieldMetaState<string> = {
        modifiedSinceLastSubmit: true,
        submitError: 'Some error message',
      }

      expect(getInputStatus(meta, { validateOnSubmit: true })).toBe('default')
    })
  })
})
