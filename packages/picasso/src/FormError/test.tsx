import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './FormError'
import Form from '../Form'
import Input from '../Input'

const TestFormError = ({ children }: OmitInternalProps<Props>) => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Label:</Form.Label>
        <Input />
        <Form.Error>{children}</Form.Error>
        <Form.Hint>This is a hint</Form.Hint>
      </Form.Field>
    </Form>
  )
}

describe('FormError', () => {
  let api: RenderResult

  beforeEach(() => {
    api = render(<TestFormError>My Error</TestFormError>)
  })
  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
