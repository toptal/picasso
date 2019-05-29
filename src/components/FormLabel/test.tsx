import React, { FunctionComponent } from 'react'
import { render } from 'react-testing-library'
import 'react-testing-library/cleanup-after-each'

import FormLabel, { Props } from './FormLabel'
import Form from '../Form'
import TextField from '../TextField'
import Picasso, { OmitInternalProps } from '../Picasso'

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
        <TextField />
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
