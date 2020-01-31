import React from 'react'
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso'

import Form, { Props } from './Form'

const renderFormInput = (props: OmitInternalProps<Props>) => {
  const { onSubmit } = props

  return render(
    <Picasso loadFonts={false}>
      <Form onSubmit={onSubmit}>
        <Form.Input name='test' placeholder='test input' />
        <Button type='submit'>Submit</Button>
      </Form>
    </Picasso>
  )
}

describe('FormInput', () => {
  test('default render', () => {
    const { container } = renderFormInput({
      onSubmit: values => console.log(values)
    })

    expect(container).toMatchSnapshot()
  })
})
