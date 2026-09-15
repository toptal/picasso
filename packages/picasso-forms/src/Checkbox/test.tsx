import React from 'react'
import { act, fireEvent, render } from '@toptal/picasso-test-utils'
import { Button } from '@toptal/picasso-button'

import type { FormConfigProps } from '../FormConfig'
import { FormCompound as Form } from '../FormCompound'
import CheckboxGroup from '../CheckboxGroup'
import type { Props } from './Checkbox'
import { Checkbox } from './Checkbox'

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
    const { getByRole } = renderCheckbox({})

    expect(
      getByRole('checkbox', { name: 'The checkbox label' })
    ).toBeInTheDocument()
  })

  it('shows the label in title case', () => {
    const { getByRole } = renderCheckbox({ titleCase: true })

    expect(
      getByRole('checkbox', { name: 'The Checkbox Label' })
    ).toBeInTheDocument()
  })
  describe('when `format` and `parse` map the value to a string', () => {
    // `react-final-form@7` derives `checked` from `parse`, where 6 used
    // `format`; Picasso keeps the 6.x meaning for a checkbox without a `value`
    const renderStringCheckbox = (initialValue: string) => {
      const onSubmit = jest.fn()

      const api = render(
        <Form onSubmit={onSubmit} initialValues={{ relocation: initialValue }}>
          <Checkbox
            name='relocation'
            label='Considers relocation'
            format={value => value === 'true'}
            parse={checked => (checked ? 'true' : 'false')}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      )

      return { ...api, onSubmit }
    }

    it('renders a stored "false" unchecked', () => {
      const { getByRole } = renderStringCheckbox('false')

      expect(
        getByRole('checkbox', { name: 'Considers relocation' })
      ).not.toBeChecked()
    })

    it('renders a stored "true" checked', () => {
      const { getByRole } = renderStringCheckbox('true')

      expect(
        getByRole('checkbox', { name: 'Considers relocation' })
      ).toBeChecked()
    })

    it('submits the value the user ticked', async () => {
      const { getByRole, getByText, onSubmit } = renderStringCheckbox('false')

      fireEvent.click(getByRole('checkbox', { name: 'Considers relocation' }))

      await act(async () => {
        fireEvent.click(getByText('Submit'))
      })

      expect(onSubmit).toHaveBeenCalledWith(
        { relocation: 'true' },
        expect.anything(),
        expect.anything()
      )
    })
  })
})
