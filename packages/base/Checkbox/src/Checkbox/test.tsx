import React from 'react'
import type { RenderResult, PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import type { Props } from './Checkbox'
import { CheckboxCompound as Checkbox } from '../CheckboxCompound'

jest.mock('ap-style-title-case')

let spiedOnTitleCase: jest.SpyInstance

const renderCheckbox = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const {
    label,
    disabled,
    titleCase,
    indeterminate,
    onChange,
    requiredDecoration,
  } = props

  return render(
    <Checkbox
      disabled={disabled}
      label={label}
      indeterminate={indeterminate}
      onChange={onChange}
      titleCase={titleCase}
      requiredDecoration={requiredDecoration}
    />,
    undefined,
    picassoConfig
  )
}

describe('Checkbox', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders default checkbox without label', () => {
    const { container } = renderCheckbox({})

    expect(container).toMatchSnapshot()
  })

  it('should render default checkbox with label', () => {
    const { container } = renderCheckbox({ label: 'Select item' })

    expect(container).toMatchSnapshot()
  })

  it('renders disabled state', () => {
    const { container } = renderCheckbox({ disabled: true })

    expect(container).toMatchSnapshot()
  })

  it('renders indeterminate state', () => {
    const { container } = renderCheckbox({ indeterminate: true })

    expect(container).toMatchSnapshot()
  })

  it('renders with asterisk', () => {
    const { container } = renderCheckbox({ requiredDecoration: 'asterisk' })

    expect(container).toMatchSnapshot()
  })

  it('renders with (optional)', () => {
    const { container } = renderCheckbox({ requiredDecoration: 'optional' })

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const LABEL_TEXT = 'abc ac4'

    renderCheckbox({ label: LABEL_TEXT }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(LABEL_TEXT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderCheckbox({ label: 'abc dp3', titleCase: false }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  describe('checkbox interaction', () => {
    let onChange: () => void
    let api: RenderResult
    let label: string

    beforeEach(() => {
      label = 'Select item'
      onChange = jest.fn()
      api = renderCheckbox({ onChange, label })

      const { getByText } = api
      const checkboxLabel = getByText(label)

      fireEvent.click(checkboxLabel)
    })

    it('should render checked checkbox', () => {
      const { container } = api

      expect(container).toMatchSnapshot()
    })

    it('should fire onChange event on click on label', () => {
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Checkbox.Group', () => {
    it('renders checkbox in a grid group', () => {
      const { container } = render(
        <Checkbox.Group horizontal sm={4}>
          <Checkbox label='Checkbox 1' value='checkbox1' />
          <Checkbox label='Checkbox 2' value='checkbox2' />
          <Checkbox label='Checkbox 3' value='checkbox3' />
          <Checkbox label='Checkbox 4' value='checkbox4' />
          <Checkbox label='Checkbox 5' value='checkbox5' />
          <Checkbox label='Checkbox 6' value='checkbox6' />
        </Checkbox.Group>
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('single label-associated node (PF-2244)', () => {
    it('matches getByLabelText once and resolves to the accessible control', () => {
      const { getByLabelText, getByRole } = renderCheckbox({
        label: 'No Rate Limit',
      })

      // Regression: the base-ui control renders a role="checkbox" span plus a
      // hidden native <input>. Both used to be label-associated (the span via
      // aria-labelledby, the input via the wrapping <label>), so getByLabelText
      // threw "Found multiple elements". It must now match exactly the
      // accessible control.
      expect(getByLabelText('No Rate Limit')).toBe(
        getByRole('checkbox', { name: 'No Rate Limit' })
      )
    })

    it('toggles once when the label text is clicked', () => {
      const onChange = jest.fn()
      const { getByText } = renderCheckbox({
        label: 'No Rate Limit',
        onChange,
      })

      fireEvent.click(getByText('No Rate Limit'))

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('does not toggle when disabled and the label is clicked', () => {
      const onChange = jest.fn()
      const { getByText } = renderCheckbox({
        label: 'No Rate Limit',
        disabled: true,
        onChange,
      })

      fireEvent.click(getByText('No Rate Limit'))

      expect(onChange).not.toHaveBeenCalled()
    })

    it('moves focus to the control when the label text is clicked', () => {
      const { getByText, getByRole } = renderCheckbox({
        label: 'No Rate Limit',
      })

      fireEvent.click(getByText('No Rate Limit'))

      expect(getByRole('checkbox')).toHaveFocus()
    })

    it('does not toggle when an interactive element inside the label is clicked', () => {
      const onChange = jest.fn()
      const { getByRole } = render(
        <Checkbox
          onChange={onChange}
          label={
            <>
              I agree to the <a href='/terms'>Terms</a>
            </>
          }
        />
      )

      fireEvent.click(getByRole('link', { name: 'Terms' }))

      expect(onChange).not.toHaveBeenCalled()
    })

    describe('when nested inside a role="menuitem"', () => {
      it('toggles on label-text click', () => {
        const onChange = jest.fn()
        const { getByText } = render(
          <div role='menuitem'>
            <Checkbox onChange={onChange} label='Select item' />
          </div>
        )

        fireEvent.click(getByText('Select item'))

        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })
  })
})
