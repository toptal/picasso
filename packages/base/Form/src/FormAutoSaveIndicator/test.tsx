import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import FormAutoSaveIndicator, { TEST_ID } from './FormAutoSaveIndicator'

describe('FormAutoSaveIndicator', () => {
  describe('in initial state', () => {
    it('hides label', () => {
      const { getByTestId } = render(<FormAutoSaveIndicator />)

      expect(getByTestId(TEST_ID)).toMatchSnapshot()
    })
  })

  describe('when saving', () => {
    it('hides label', () => {
      const { getByTestId } = render(<FormAutoSaveIndicator saving />)

      expect(getByTestId(TEST_ID)).toMatchSnapshot()
    })
  })

  describe('when saved', () => {
    it('should show label', () => {
      const { getByTestId, rerender } = render(<FormAutoSaveIndicator saving />)

      rerender(<FormAutoSaveIndicator />)

      expect(getByTestId(TEST_ID)).toMatchSnapshot()
    })
  })
})
