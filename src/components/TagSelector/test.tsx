import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  RenderResult
} from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../Picasso'
import TagSelector, { Props } from './TagSelector'

const options = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
  { value: 'ALG', text: 'Algeria' }
]

const testProps = {
  loading: false,
  otherOptionLabel: 'Add new option: ',
  options,
  placeholder: 'Please select...'
}

const renderTagSelector = (props: OmitInternalProps<Props>) => {
  const {
    loading,
    otherOptionLabel,
    options,
    placeholder,
    value,
    onInputChange,
    onChange
  } = props

  return render(
    <Picasso loadFonts={false}>
      <TagSelector
        showOtherOption
        loading={loading}
        otherOptionLabel={otherOptionLabel}
        options={options}
        placeholder={placeholder}
        value={value}
        onInputChange={onInputChange}
        onChange={onChange}
      />
    </Picasso>
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

afterEach(cleanup)

describe('TagSelector', () => {
  test('default render', () => {
    const { container } = renderTagSelector(testProps)

    expect(container).toMatchSnapshot()
  })

  test('on type', () => {
    const onInputChange = jest.fn()
    const { getByPlaceholderText } = renderTagSelector({
      ...testProps,
      onInputChange
    })
    const input = getByPlaceholderText(testProps.placeholder)

    fireEvent.change(input, { target: { value: 'Al' } })

    expect(onInputChange).toBeCalledWith('Al')
  })

  test('preselected value', () => {
    const { baseElement } = renderTagSelector({
      loading: false,
      otherOptionLabel: 'Add: ',
      options,
      placeholder: 'Please select...',
      value: [options[0]]
    })

    expect(baseElement).toMatchSnapshot()
  })

  test('selected option', async () => {
    const onChange = jest.fn()
    const renderResult = renderTagSelector({
      ...testProps,
      onChange
    })
    const { getByPlaceholderText } = renderResult

    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, options[0].text)

    expect(onChange).toBeCalledWith([options[0]])
  })
})
