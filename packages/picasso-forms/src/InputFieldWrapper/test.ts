import { FieldMetaState } from 'react-final-form'

import { getInputStatus } from './InputFieldWrapper'

describe('getInputStatus', () => {
  describe('when field has an error', () => {
    it('returns "error"', () => {
      const meta: FieldMetaState<string> = {
        error: 'Some error message',
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputStatus(meta, { showValidState: false })).toBe('error')
    })
  })

  describe('when field has a submit error', () => {
    it('returns "error"', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputStatus(meta, { showValidState: false })).toBe('error')
    })
  })

  describe('when field has not been touched', () => {
    it('returns undefined', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: false,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputStatus(meta, { showValidState: false })).toBeUndefined()
    })
  })

  describe('when field has been dirty since last submit and has no error', () => {
    it('returns undefined', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: true,
        modifiedSinceLastSubmit: false
      }

      expect(getInputStatus(meta, { showValidState: false })).toBeUndefined()
    })
  })

  describe('when field has no error and no submit error and touched', () => {
    it('returns "success" if show valid state is enabled for the form', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputStatus(meta, { showValidState: true })).toBe('success')
    })

    it('returns undefined if show valid state is not enabled for the form', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: undefined,
        dirtySinceLastSubmit: false,
        modifiedSinceLastSubmit: false
      }

      expect(getInputStatus(meta, { showValidState: false })).toBeUndefined()
    })
  })
})
