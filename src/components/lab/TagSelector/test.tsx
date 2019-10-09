import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  RenderResult
} from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../../Picasso'
import TagSelector, { Props } from './TagSelector'

const options = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
  { value: 'ALG', text: 'Algeria' }
]

const testProps = {
  loading: false,
  newOptionLabel: 'Add new option: ',
  options,
  placeholder: 'Please select...'
}

const renderTagSelector = (props: OmitInternalProps<Props>) => {
  const { loading, newOptionLabel, options, placeholder, defaultValue } = props

  return render(
    <Picasso loadFonts={false}>
      <TagSelector
        loading={loading}
        newOptionLabel={newOptionLabel}
        options={options}
        placeholder={placeholder}
        defaultValue={defaultValue}
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

  test('available options when start typing', () => {
    const { baseElement, getByPlaceholderText } = renderTagSelector(testProps)
    const input = getByPlaceholderText(testProps.placeholder)

    fireEvent.change(input, { target: { value: 'Al' } })

    expect(baseElement).toMatchSnapshot()
  })

  test('preselected value', () => {
    const { baseElement } = renderTagSelector({
      loading: false,
      newOptionLabel: 'Add: ',
      options,
      placeholder: 'Please select...',
      defaultValue: [options[0].value]
    })

    expect(baseElement).toMatchSnapshot()
  })

  test('selected option', async () => {
    const renderResult = renderTagSelector(testProps)
    const { baseElement, getByPlaceholderText } = renderResult

    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, options[0].text)

    expect(baseElement).toMatchSnapshot()
  })

  test('newly added option selected', async () => {
    const {
      baseElement,
      container,
      getByPlaceholderText,
      getByText
    } = renderTagSelector(testProps)
    const newOptionText = 'xxxx'

    const input = getByPlaceholderText(testProps.placeholder)

    fireEvent.change(input, { target: { value: newOptionText } })

    const newOptionElement = await waitForElement(
      () => getByText(newOptionText),
      { container }
    )

    fireEvent.click(newOptionElement)

    expect(baseElement).toMatchSnapshot()
  })

  test('options selected and then unselected', async () => {
    const renderResult = renderTagSelector(testProps)
    const {
      baseElement,
      getByPlaceholderText,
      getAllByLabelText
    } = renderResult
    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, options[0].text)
    await selectOption(renderResult, input, options[1].text)
    await selectOption(renderResult, input, options[2].text)

    const optionDeleteElements = getAllByLabelText('delete icon')

    expect(optionDeleteElements.length).toBe(3)

    fireEvent.click(optionDeleteElements[1])

    expect(baseElement).toMatchSnapshot()
  })
})
