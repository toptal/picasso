import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { titleCase } from 'title-case'

import FormLabel, { Props } from './FormLabel'
import Form from '../Form'
import Input from '../Input'

jest.mock('title-case')

const TestFormLabel: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  required,
  disabled,
  titleCase,
  htmlFor,
  inline
}) => (
  <Form>
    <Form.Field>
      <FormLabel
        required={required}
        disabled={disabled}
        titleCase={titleCase}
        htmlFor={htmlFor}
        inline={inline}
      >
        {children}
      </FormLabel>
      <Input />
    </Form.Field>
  </Form>
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

  test('required and disabled', () => {
    const { container } = render(
      <TestFormLabel required disabled>
        Label
      </TestFormLabel>
    )

    expect(container).toMatchSnapshot()
  })

  test('should transform text to title case when Picasso titleCase property is true', () => {
    render(
      <TestFormLabel>some text with-the-edge case for TEST</TestFormLabel>,
      undefined,
      { titleCase: true }
    )

    expect(titleCase).toBeCalledTimes(1)
    jest.resetAllMocks()
  })

  test('should transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    render(
      <TestFormLabel titleCase={false}>
        some text with-the-edge case for TEST
      </TestFormLabel>,
      undefined,
      { titleCase: true }
    )

    expect(titleCase).toBeCalledTimes(0)
    jest.resetAllMocks()
  })
})
