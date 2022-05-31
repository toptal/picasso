import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { FormConfigProps } from '../FormConfig'
import { FormCompound as Form } from '../FormCompound'
import CheckboxGroup from '../CheckboxGroup'
import Checkbox, { Props } from './Checkbox'

const renderCheckbox = (
  { required, titleCase }: Props,
  formConfig: FormConfigProps = {}
) =>
  render(
    <Form.ConfigProvider value={formConfig}>
      <Form onSubmit={() => {}}>
        <Checkbox
          name='single-checkbox'
          label='The checkbox label'
          value='checkbox-value'
          data-testid='single-checkbox'
          required={required}
          titleCase={titleCase}
        />
      </Form>
    </Form.ConfigProvider>
  )

const renderCheckboxInGroup = () =>
  render(
    <Form onSubmit={() => {}}>
      <CheckboxGroup name='checkbox-group' label='checkbox-group-label'>
        <Checkbox label='checkbox-label-0' value='checkbox-value-0' />
        <Checkbox label='checkbox-label-1' value='checkbox-value-1' />
      </CheckboxGroup>
    </Form>
  )

describe('Form.Checkbox', () => {
  it('default render for single checkbox', () => {
    const { container } = renderCheckbox({})

    expect(container).toMatchSnapshot()
  })

  describe('when required prop is passed', () => {
    it('does not set "required" attribute to input tag, to avoid Chrome tooltip', () => {
      const { container } = renderCheckbox({})

      expect(
        container.querySelector('[name="single-checkbox"]')
      ).toMatchSnapshot()
    })
  })

  it('default render for checkboxes in a group', () => {
    const { container } = renderCheckboxInGroup()

    expect(container).toMatchSnapshot()
  })

  it('required with asterisk single checkbox', () => {
    const { container } = renderCheckbox(
      {
        required: true,
      },
      {
        requiredVariant: 'asterisk',
      }
    )

    expect(container).toMatchSnapshot()
  })

  it('never shows (optional) postfix for single checkbox', () => {
    const { getByTestId } = renderCheckbox({})

    expect(getByTestId('single-checkbox')).not.toHaveTextContent('(optional)')
  })

  it('shows the label in default case', () => {
    const { getByLabelText } = renderCheckbox({})

    expect(getByLabelText('The checkbox label')).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByLabelText } = renderCheckbox({ titleCase: true })

    expect(getByLabelText('The Checkbox Label')).toBeInTheDocument()
  })
})
