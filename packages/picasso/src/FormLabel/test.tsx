import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import FormLabel, { Props } from './FormLabel'
import Form from '../Form'
import Input from '../Input'

jest.mock('ap-style-title-case')

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

let spiedOnTitleCase: jest.SpyInstance

beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

describe('FormLabel', () => {
  test('default render', () => {
    const { queryByText } = render(<TestFormLabel>Label</TestFormLabel>)

    expect(queryByText('Label')).toBeInTheDocument()
    expect(queryByText('Label (optional)')).not.toBeInTheDocument()
  })

  test('disabled', () => {
    const { container } = render(<TestFormLabel disabled>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  test('required', () => {
    const { queryByText } = render(
      <TestFormLabel required>Label</TestFormLabel>
    )

    expect(queryByText('Label')).toBeInTheDocument()
    expect(queryByText('Label (optional)')).not.toBeInTheDocument()
  })

  test('optional is displayed', () => {
    const { queryByText } = render(
      <TestFormLabel required={false}>Label</TestFormLabel>
    )

    expect(queryByText('Label (optional)')).toBeInTheDocument()
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
    const TEXT_CONTENT = 'Test kb8'

    render(<TestFormLabel>{TEXT_CONTENT}</TestFormLabel>, undefined, {
      titleCase: true
    })

    expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
  })

  test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    render(
      <TestFormLabel titleCase={false}>
        some text with-the-edge case for TEST
      </TestFormLabel>,
      undefined,
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toBeCalledTimes(0)
  })
})
