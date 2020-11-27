import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { FormConfigProps } from '../FormConfig'
import Form from '../Form'
import { Props as RadioGroupProps } from '../RadioGroup'

const renderFormRadio = (
  { required, name }: RadioGroupProps,
  formConfig: FormConfigProps = {}
) =>
  render(
    <Form.ConfigProvider value={formConfig}>
      <Form onSubmit={() => {}} initialValues={{ color: '#ffe4b5' }}>
        <Form.RadioGroup
          name={name}
          label="What's your favorite color?"
          required={required}
        >
          <Form.Radio label='Crimson' value='#ed143d' />
          <Form.Radio label='Moccasin' value='#ffe4b5' />
        </Form.RadioGroup>
      </Form>
    </Form.ConfigProvider>
  )

describe('FormRadio', () => {
  test('default render', () => {
    const { container } = renderFormRadio({
      name: 'color'
    })

    expect(container).toMatchSnapshot()
  })

  test('required with asterisk', () => {
    const { container } = renderFormRadio(
      {
        name: 'color',
        required: true
      },
      {
        requiredVariant: 'asterisk'
      }
    )

    expect(container).toMatchSnapshot()
  })
})
