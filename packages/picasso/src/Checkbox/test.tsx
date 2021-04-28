import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  PicassoConfig
} from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Checkbox, { Props } from './Checkbox'

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
    requiredDecoration
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

      const { getByLabelText } = api
      const checkboxLabel = getByLabelText(label)

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
        <Checkbox.Group horizontal small={4}>
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
})
