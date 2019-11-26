import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import FormLabel, { Props } from './FormLabel'
import Form from '../Form'
import Input from '../Input'

const TestFormLabel: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  required,
  disabled,
  htmlFor,
  inline
}) => (
  <Picasso loadFonts={false}>
    <Form>
      <Form.Field>
        <FormLabel
          required={required}
          disabled={disabled}
          htmlFor={htmlFor}
          inline={inline}
        >
          {children}
        </FormLabel>
        <Input />
      </Form.Field>
    </Form>
  </Picasso>
)

describe('FormLabel', () => {
  test('default render', () => {
    const { container } = render(<TestFormLabel>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  test('disabled', () => {
    const { container } = render(<TestFormLabel disabled>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  test('required', () => {
    const { container } = render(<TestFormLabel required>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  test('requried and disabled', () => {
    const { container } = render(
      <TestFormLabel required disabled>
        Label
      </TestFormLabel>
    )

    expect(container).toMatchSnapshot()
  })
})
