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
beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

const renderCheckbox = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { label, disabled, titleCase, indeterminate, onChange } = props

  return render(
    <Checkbox
      disabled={disabled}
      label={label}
      indeterminate={indeterminate}
      onChange={onChange}
      titleCase={titleCase}
    />,
    undefined,
    picassoConfig
  )
}

test('renders default checkbox without label', () => {
  const { container } = renderCheckbox({})

  expect(container).toMatchSnapshot()
})

test('should render default checkbox with label', () => {
  const { container } = renderCheckbox({ label: 'Select item' })

  expect(container).toMatchSnapshot()
})

test('renders disabled state', () => {
  const { container } = renderCheckbox({ disabled: true })

  expect(container).toMatchSnapshot()
})

test('renders indeterminate state', () => {
  const { container } = renderCheckbox({ indeterminate: true })

  expect(container).toMatchSnapshot()
})

test('should transform text to title case when Picasso titleCase property is true', () => {
  const LABEL_TEXT = 'abc ac4'
  renderCheckbox({ label: LABEL_TEXT }, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledWith(LABEL_TEXT)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderCheckbox({ label: 'abc dp3', titleCase: false }, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledTimes(0)
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

  test('should render checked checkbox', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should fire onChange event on click on label', () => {
    expect(onChange).toHaveBeenCalled()
  })
})
