import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { Input } from '@toptal/picasso-input'

import type { Props } from './FormError'
import { FormCompound as Form } from '../FormCompound'

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
  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
