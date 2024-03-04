import { Input } from '@toptal/picasso'
import { act, render, fireEvent } from '@toptal/picasso-test-utils'
import { noop } from '@toptal/picasso-utils'
import React from 'react'

import { FormCompound as Form } from '../FormCompound'
import FieldWrapper from './FieldWrapper'

const renderFieldWrapper = () =>
  render(
    <Form onSubmit={noop}>
      <FieldWrapper name='name' required>
        {(inputProps: any) => <Input {...inputProps} />}
      </FieldWrapper>

      <Form.SubmitButton data-testid='submit'>Submit</Form.SubmitButton>
    </Form>
  )

describe('FieldWrapper', () => {
  describe('when there is a field error', () => {
    it('passes status to its children', () => {
      const { getByTestId, getByText } = renderFieldWrapper()

      act(() => {
        fireEvent.click(getByTestId('submit'))
      })

      expect(getByText('Please complete this field.')).toBeVisible()
    })
  })
})
