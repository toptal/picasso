import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Form from '../Form/Form'

const renderFormRadio = () => {
  return render(
    <Form onSubmit={() => {}}>
      <Form.RadioGroup
        name='color'
        required
        label="What's your favorite color?"
      >
        <Form.Radio label='Crimson' value='#ed143d' />
        <Form.Radio label='Moccasin' value='#ffe4b5' />
      </Form.RadioGroup>
    </Form>
  )
}

describe('FormRadio', () => {
  test('default render', () => {
    const { container } = renderFormRadio()

    expect(container).toMatchSnapshot()
  })
})
