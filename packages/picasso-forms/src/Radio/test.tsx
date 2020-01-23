import React from 'react'
import { render } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Form from '../Form/Form'

const renderFormRadio = () => {
  return render(
    <Picasso loadFonts={false}>
      <Form onSubmit={() => {}}>
        <Form.Radio name='test' placeholder='test input' />
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
