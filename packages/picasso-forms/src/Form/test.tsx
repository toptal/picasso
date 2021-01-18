import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso'

import Form, { Props } from './Form'

const renderForm = (props: OmitInternalProps<Props>) => {
  const { onSubmit } = props

  return render(
    <Form onSubmit={onSubmit}>
      <Form.Input name='test' placeholder='test input' />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

describe('Form', () => {
  it('renders', () => {
    const { container } = renderForm({
      onSubmit: values => console.log(values)
    })

    expect(container).toMatchSnapshot()
  })
})
