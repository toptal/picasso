import React from 'react'
import {
  render,
  fireEvent,
  waitForElement,
  RenderResult
} from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import TagSelector, { Props } from './TagSelector'

const testOptions = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
  { value: 'ALG', text: 'Algeria' }
]

const testProps = {
  loading: false,
  otherOptionLabel: 'Add new option: ',
  options: testOptions,
  placeholder: 'Please select...'
}

const renderTagSelector = (props: OmitInternalProps<Props>) => {
  const {
    loading,
    disabled,
    otherOptionLabel,
    options,
    placeholder,
    value,
    onInputChange,
    onChange
  } = props

  return render(
    <TagSelector
      showOtherOption
      loading={loading}
      disabled={disabled}
      otherOptionLabel={otherOptionLabel}
      options={options}
      placeholder={placeholder}
      value={value}
      onInputChange={onInputChange}
      onChange={onChange}
    />
  )
}

const selectOption = async (
  renderResult: RenderResult,
  input: HTMLElement,
  optionText: string
) => {
  const { container, getAllByText } = renderResult

  fireEvent.change(input, { target: { value: optionText } })

  const optionElement = await waitForElement(() => getAllByText(optionText), {
    container
  })

  // add new option is duplicating all the options when typing
  // so we don't need it when selecting the option
  fireEvent.click(optionElement[0])
}

describe('TagSelector', () => {
  it('default render', () => {
    const { container } = renderTagSelector(testProps)

    expect(container).toMatchSnapshot()
  })

  it('disabled render', async () => {
    const { container } = renderTagSelector({
      ...testProps,
      disabled: true,
      value: [testOptions[0]]
    })

    expect(container).toMatchSnapshot()
  })

  it('on type', () => {
    const onInputChange = jest.fn()
    const { getByPlaceholderText } = renderTagSelector({
      ...testProps,
      onInputChange
    })
    const input = getByPlaceholderText(testProps.placeholder)

    fireEvent.change(input, { target: { value: 'Al' } })

    expect(onInputChange).toHaveBeenCalledWith('Al', { isSelected: false })
  })

  it('preselected value', () => {
    const { baseElement } = renderTagSelector({
      loading: false,
      otherOptionLabel: 'Add: ',
      options: testOptions,
      placeholder: 'Please select...',
      value: [testOptions[0]]
    })

    expect(baseElement).toMatchSnapshot()
  })

  it('selected option', async () => {
    const onChange = jest.fn()
    const renderResult = renderTagSelector({
      ...testProps,
      onChange
    })
    const { getByPlaceholderText } = renderResult

    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, testOptions[0].text)

    expect(onChange).toHaveBeenCalledWith([testOptions[0]])
  })
})
