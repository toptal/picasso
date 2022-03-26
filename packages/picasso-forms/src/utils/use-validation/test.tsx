import { FieldMetaState } from 'react-final-form'

import { getInputError } from './use-validation'

describe('getErrorInput', () => {
  describe('when field has an error', () => {
    it('returns the error message', () => {
      const meta: FieldMetaState<string> = {
        error: 'Some error message',
        touched: true
      }

      expect(getInputError(meta)).toBe('Some error message')
    })
  })

  describe('when field has a submit error', () => {
    it('returns the submit error message', () => {
      const meta: FieldMetaState<string> = {
        error: undefined,
        touched: true,
        submitError: 'Some error message'
      }

      expect(getInputError(meta)).toBe('Some error message')
    })
  })

  describe('when field has no error and no submit error and touched', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        touched: true
      }

      expect(getInputError(meta)).toBeNull()
    })
  })

  describe('when field has not been touched', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        touched: false,
        error: 'Some error message'
      }

      expect(getInputError(meta)).toBeNull()
    })
  })

  describe('when field has submit error and dirty since last submit', () => {
    it('returns null', () => {
      const meta: FieldMetaState<string> = {
        touched: true,
        submitError: 'Some error message',
        dirtySinceLastSubmit: true
      }

      expect(getInputError(meta)).toBeNull()
    })
  })

  describe('when validate on submit enabled and modified since last submit', () => {
    it('returns null', () => {
      const shouldValidateOnSubmit = true
      const meta: FieldMetaState<string> = {
        modifiedSinceLastSubmit: true,
        submitError: 'Some error message'
      }

      expect(getInputError(meta, shouldValidateOnSubmit)).toBeNull()
    })
  })
})
