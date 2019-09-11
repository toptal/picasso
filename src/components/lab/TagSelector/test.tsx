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
  const { container, getByText } = renderResult

  fireEvent.change(input, { target: { value: optionText } })

  const optionElement = await waitForElement(() => getByText(optionText), {
    container
  })

  fireEvent.click(optionElement)
}

afterEach(cleanup)

describe('TagSelector', () => {
  test('default render', () => {
    const { container } = renderTagSelector(testProps)

    expect(container).toMatchSnapshot()
  })

  test('available options when start typing', () => {
    const { container, getByPlaceholderText } = renderTagSelector(testProps)
    const input = getByPlaceholderText(testProps.placeholder)

    fireEvent.change(input, { target: { value: 'Al' } })

    expect(container).toMatchSnapshot()
  })

  test('preselected value', () => {
    const { container } = renderTagSelector({
      loading: false,
      newOptionLabel: 'Add: ',
      options,
      placeholder: 'Please select...',
      defaultValue: [options[0].value]
    })

    expect(container).toMatchSnapshot()
  })

  test('selected option', async () => {
    const renderResult = renderTagSelector(testProps)
    const { container, getByPlaceholderText } = renderResult

    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, options[0].text)

    expect(container).toMatchSnapshot()
  })

  test('newly added option selected', async () => {
    const { container, getByPlaceholderText, getByText } = renderTagSelector(
      testProps
    )
    const newOptionText = 'xxxx'

    const input = getByPlaceholderText(testProps.placeholder)

    fireEvent.change(input, { target: { value: newOptionText } })

    const newOptionElement = await waitForElement(
      () => getByText(testProps.newOptionLabel + newOptionText),
      { container }
    )

    fireEvent.click(newOptionElement)

    expect(container).toMatchSnapshot()
  })

  test('options selected and then unselected', async () => {
    const renderResult = renderTagSelector(testProps)
    const { container, getByPlaceholderText, getAllByLabelText } = renderResult
    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, options[0].text)
    await selectOption(renderResult, input, options[1].text)
    await selectOption(renderResult, input, options[2].text)

    const optionDeleteElements = getAllByLabelText('delete icon')

    expect(optionDeleteElements.length).toBe(3)

    fireEvent.click(optionDeleteElements[1])

    expect(container).toMatchSnapshot()
  })
})
