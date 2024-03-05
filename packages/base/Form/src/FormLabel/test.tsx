import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import type { Props } from './FormLabel'
import { FormLabel } from './FormLabel'
import { FormCompound as Form } from '../FormCompound'

jest.mock('ap-style-title-case')

const TestFormLabel = ({
  children,
  requiredDecoration,
  disabled,
  titleCase,
  htmlFor,
  inline,
  labelEndAdornment,
}: OmitInternalProps<Props>) => {
  return (
    <Form>
      <Form.Field>
        <FormLabel
          requiredDecoration={requiredDecoration}
          disabled={disabled}
          titleCase={titleCase}
          htmlFor={htmlFor}
          inline={inline}
          labelEndAdornment={labelEndAdornment}
        >
          {children}
        </FormLabel>
      </Form.Field>
    </Form>
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('FormLabel', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })
  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const { container } = render(<TestFormLabel>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  it('disabled', () => {
    const { container } = render(<TestFormLabel disabled>Label</TestFormLabel>)

    expect(container).toMatchSnapshot()
  })

  it('required with (optional)', () => {
    const { container } = render(
      <TestFormLabel requiredDecoration='optional'>Label</TestFormLabel>
    )

    expect(container).toMatchSnapshot()
  })

  it('required with (optional) and with `labelEndAdornment`', () => {
    const { container } = render(
      <TestFormLabel
        labelEndAdornment={<span>label end adornment</span>}
        requiredDecoration='optional'
      >
        Label
      </TestFormLabel>
    )

    expect(container).toMatchSnapshot()
  })

  it('required with asterisk', () => {
    const { container } = render(
      <TestFormLabel requiredDecoration='asterisk'>Label</TestFormLabel>
    )

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test kb8'

    render(<TestFormLabel>{TEXT_CONTENT}</TestFormLabel>, undefined, {
      titleCase: true,
    })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    render(
      <TestFormLabel titleCase={false}>
        some text with-the-edge case for TEST
      </TestFormLabel>,
      undefined,
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })
})
