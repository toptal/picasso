import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import TagSelector, { Props, isIncluded } from './TagSelector'

const testOptions = [
  { value: 'AF', text: 'Afghanistan', id: '100' },
  { value: 'AI', text: 'Aland Islands', id: '101' },
  { value: 'ALB', text: 'Albania', id: '102' },
  { value: 'ALG', text: 'Algeria', id: '103' },
]

const testProps = {
  loading: false,
  otherOptionLabel: 'Add new option: ',
  options: testOptions,
  placeholder: 'Please select...',
}

const renderTagSelector = (props: OmitInternalProps<Props>) => {
  return render(<TagSelector {...props} />)
}

const selectOption = async (
  renderResult: RenderResult,
  input: HTMLElement,
  optionText: string
) => {
  const { container, getAllByText } = renderResult

  fireEvent.change(input, { target: { value: optionText } })

  const optionElement = await waitFor(() => getAllByText(optionText), {
    container,
  })

  // add new option is duplicating all the options when typing
  // so we don't need it when selecting the option
  fireEvent.click(optionElement[0])
}

describe('TagSelector', () => {
  it('renders', () => {
    const { container } = renderTagSelector(testProps)

    expect(container).toMatchSnapshot()
  })

  it('disabled render', async () => {
    const { container } = renderTagSelector({
      ...testProps,
      disabled: true,
      value: [testOptions[0]],
    })

    expect(container).toMatchSnapshot()
  })

  it('on type', () => {
    const onInputChange = jest.fn()
    const { getByPlaceholderText } = renderTagSelector({
      ...testProps,
      onInputChange,
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
      value: [testOptions[0]],
    })

    expect(baseElement).toMatchSnapshot()
  })

  it('selected option', async () => {
    const onChange = jest.fn()
    const renderResult = renderTagSelector({
      ...testProps,
      onChange,
    })
    const { getByPlaceholderText } = renderResult

    const input = getByPlaceholderText(testProps.placeholder)

    await selectOption(renderResult, input, testOptions[0].text)

    expect(onChange).toHaveBeenCalledWith([testOptions[0]])
  })

  describe('when in a valid state', () => {
    it('shows check icon', () => {
      const { getByTestId, rerender } = renderTagSelector({
        ...testProps,
        testIds: {
          validIcon: 'valid-icon',
        },
        status: 'success',
      })

      const validIcon = getByTestId('valid-icon')

      expect(validIcon).toBeVisible()

      // rerender with different props
      rerender(<TagSelector {...testProps} status='error' />)

      expect(validIcon).not.toBeVisible()
    })
  })
})

describe('isIncluded', () => {
  it("compares object's value attribute by default", () => {
    const actual = isIncluded(testOptions, testOptions[0])

    expect(actual).toBe(true)
  })

  describe('when custom getKey function is provided', () => {
    it('uses custom function', () => {
      const getKey = jest.fn(item => item.id as string)

      const actual = isIncluded(testOptions, testOptions[3], getKey)

      expect(actual).toBe(true)
      // 1 for 3rd option + 4 for each list item
      expect(getKey).toHaveBeenCalledTimes(5)
    })
  })

  it.each`
    value   | text              | result
    ${'AF'} | ${'Afghanistan'}  | ${true}
    ${'NO'} | ${'Non existing'} | ${false}
  `('compares object by value', ({ value, text, result }) => {
    const actual = isIncluded(testOptions, { text, value })

    expect(actual).toEqual(result)
  })
})
