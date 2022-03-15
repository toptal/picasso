import { FieldMetaState } from 'react-final-form'

import { getInputErrorMessage } from './FieldWrapper'

describe('getErrorInputMessage', () => {
  describe('when field has an error', () => {
    it('returns the error message', () => {
      const meta: FieldMetaState<string> = {
        error: 'Some error message',
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputErrorMessage(meta, {})).toBe('Some error message')
    })
  })

  describe('when field has a submit error', () => {
    it('returns the submit error message', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputErrorMessage(meta, {})).toBe('Some error message')
    })
  })

  describe('when field has no error and no submit error and touched', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputErrorMessage(meta, {})).toBeNull()
    })
  })

  describe('when field has not been touched', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: false,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputErrorMessage(meta, {})).toBeNull()
    })
  })

  describe('when field has submit error and dirty since last submit', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: true,
        modifiedSinceLastSubmit: true
      }

      expect(getInputErrorMessage(meta, {})).toBeNull()
    })
  })
})
