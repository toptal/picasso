import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'

import { FormCompound as Form } from '../FormCompound'

const renderFormButtonRadio = () =>
  render(
    <Form onSubmit={() => {}} initialValues={{ color: '#ffe4b5' }}>
      <Form.RadioGroup name='color'>
        <Form.ButtonRadio value='#ed143d'>Crimson</Form.ButtonRadio>
        <Form.ButtonRadio value='#ffe4b5'>Moccasin</Form.ButtonRadio>
      </Form.RadioGroup>
    </Form>
  )

describe('FormButtonRadio', () => {
  it("checks the radio that holds its group's value", () => {
    renderFormButtonRadio()

    expect(screen.getByRole('radio', { name: 'Moccasin' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Crimson' })).not.toBeChecked()
  })

  it("moves the group's value to the radio that is clicked", () => {
    renderFormButtonRadio()

    fireEvent.click(screen.getByRole('radio', { name: 'Crimson' }))

    expect(screen.getByRole('radio', { name: 'Crimson' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Moccasin' })).not.toBeChecked()
  })
})
