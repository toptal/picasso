import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FormActionsContainer from './FormActionsContainer'
import Form from '../Form'

describe('FormActionsContainer', () => {
  describe('when form layout is horizontal', () => {
    it('renders two containers as two columns', () => {
      const { getByTestId } = render(
        <Form layout='horizontal'>
          <FormActionsContainer data-testid='form-actions-container'>
            <span />
          </FormActionsContainer>
        </Form>
      )

      expect(getByTestId('form-actions-container').childNodes).toHaveLength(2)
    })
  })

  describe('when form layout is vertical', () => {
    it('renders regular container with children', () => {
      const { getByTestId } = render(
        <Form layout='vertical'>
          <FormActionsContainer data-testid='form-actions-container'>
            <span />
          </FormActionsContainer>
        </Form>
      )

      expect(getByTestId('form-actions-container').childNodes).toHaveLength(1)
    })
  })
})
