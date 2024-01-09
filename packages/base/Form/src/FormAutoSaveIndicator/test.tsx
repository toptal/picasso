import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import FormAutoSaveIndicator from './FormAutoSaveIndicator'

describe('FormAutoSaveIndicator', () => {
  describe('in initial state', () => {
    it('hides label', () => {
      const { queryByText } = render(<FormAutoSaveIndicator />)

      expect(queryByText('Saved')).not.toBeVisible()
    })
  })

  describe('when saving', () => {
    it('hides label', () => {
      const { queryByText } = render(<FormAutoSaveIndicator saving />)

      expect(queryByText('Saved')).not.toBeVisible()
    })
  })

  describe('when saved', () => {
    it('should show label', () => {
      const { queryByText, rerender } = render(<FormAutoSaveIndicator saving />)

      rerender(<FormAutoSaveIndicator />)

      expect(queryByText('Saved')).toBeVisible()
    })
  })
})
