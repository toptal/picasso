import type { FieldMetaState } from 'react-final-form'

import { getFieldError } from './use-field-validation'

describe('getFieldError', () => {
  describe('when field has an error', () => {
    it('returns the error message', () => {
      const meta: FieldMetaState<string> = {
        error: 'Some error message',
        touched: true,
      }

      expect(getFieldError(meta)).toBe('Some error message')
    })
  })

  describe('when field has a submit error', () => {
    it('returns the submit error message', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: 'Some error message',
      }

      expect(getFieldError(meta)).toBe('Some error message')
    })
  })

  describe('when field has no error and no submit error and touched', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        touched: true,
      }

      expect(getFieldError(meta)).toBeNull()
    })
  })

  describe('when field has not been touched', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        touched: false,
        error: 'Some error message',
      }

      expect(getFieldError(meta)).toBeNull()
    })
  })

  describe('when field has submit error and dirty since last submit', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: true,
      }

      expect(getFieldError(meta)).toBeNull()
    })
  })

  describe('when validate on submit enabled and modified since last submit', () => {
    it('returns null', () => {
      const shouldValidateOnSubmit = true
      const meta: FieldMetaState<string> = {
        modifiedSinceLastSubmit: true,
        submitError: 'Some error message',
      }

      expect(getFieldError(meta, shouldValidateOnSubmit)).toBeNull()
    })
  })
})
