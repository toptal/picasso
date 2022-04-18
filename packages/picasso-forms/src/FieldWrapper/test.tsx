import { Input } from '@toptal/picasso'
import { act, render, fireEvent } from '@toptal/picasso/test-utils'
import { noop } from '@toptal/picasso/utils'
import React from 'react'

import Form from '../Form'
import FieldWrapper from './FieldWrapper'

const renderFieldWrapper = () =>
  render(
    <Form onSubmit={noop}>
      <FieldWrapper name='name' required>
        {(inputProps: any) => <Input {...inputProps} />}
      </FieldWrapper>

      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  )

describe('FieldWrapper', () => {
  describe('when there is a field error', () => {
    it('passes status to its children', () => {
      const { getByRole, getByText } = renderFieldWrapper()

      act(() => {
        fireEvent.click(getByRole('button'))
      })

      expect(getByText('Please complete this field.')).toBeVisible()
    })
  })
})
