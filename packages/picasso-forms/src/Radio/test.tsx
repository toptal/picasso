import React from 'react'
import { render } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Form from '../Form/Form'

const renderFormRadio = () => {
  return render(
    <Picasso loadFonts={false}>
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
    </Picasso>
  )
}

describe('FormRadio', () => {
  test('default render', () => {
    const { container } = renderFormRadio()

    expect(container).toMatchSnapshot()
  })
})
