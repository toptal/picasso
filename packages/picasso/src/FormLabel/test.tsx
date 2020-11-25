import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import FormLabel, { Props } from './FormLabel'
import Form from '../Form'

jest.mock('ap-style-title-case')

const TestFormLabel: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  requiredDecoration,
  disabled,
  titleCase,
  htmlFor,
  inline
}) => (
  <Form>
    <Form.Field>
      <FormLabel
        requiredDecoration={requiredDecoration}
        disabled={disabled}
        titleCase={titleCase}
        htmlFor={htmlFor}
        inline={inline}
      >
        {children}
      </FormLabel>
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
    const { container } = render(<TestFormLabel>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  test('disabled', () => {
    const { container } = render(<TestFormLabel disabled>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  test('required with (optional)', () => {
    const { container } = render(
      <TestFormLabel requiredDecoration='optional'>Label</TestFormLabel>
    )

    expect(container).toMatchSnapshot()
  })

  test('required with asterisk', () => {
    const { container } = render(
      <TestFormLabel requiredDecoration='asterisk'>Label</TestFormLabel>
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
