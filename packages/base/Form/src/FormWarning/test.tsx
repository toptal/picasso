import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { Input } from '@toptal/picasso-input'

import type { Props } from './FormWarning'
import { FormCompound as Form } from '../FormCompound'

const TestFormError = ({ children }: OmitInternalProps<Props>) => {
  return (
    <Form>
      <Form.Field>
        <Form.Label>Label:</Form.Label>
        <Input />
        <Form.Warning>{children}</Form.Warning>
        <Form.Hint>This is a hint</Form.Hint>
      </Form.Field>
    </Form>
  )
}

describe('FormWarning', () => {
  let api: RenderResult

  beforeEach(() => {
    api = render(<TestFormError>My Warning</TestFormError>)
  })
  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
