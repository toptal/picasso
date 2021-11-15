import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/shared'

import Input, { Props } from './Input'
import Search16 from '../Icon/Search16'

const testIds = {
  limit: 'limit-adornment-multiline-label'
}

const renderInput = (props: OmitInternalProps<Props>) => {
  return render(<Input {...props} />)
}

describe('Input', () => {
  it('renders icon in the end', () => {
    const { container } = renderInput({ icon: <Search16 /> })

    expect(container).toMatchSnapshot()
  })

  it('renders icon in the beginning', () => {
    const { container } = renderInput({
      icon: <Search16 />,
      iconPosition: 'start'
    })

    expect(container).toMatchSnapshot()
  })

  it('shows counter for regular input', () => {
    const { container } = renderInput({ limit: 10 })

    expect(container).toMatchSnapshot()
  })

  it('shows counter for multiline input', () => {
    const { container } = renderInput({ multiline: true, rows: 4, limit: 10 })

    expect(container).toMatchSnapshot()
  })

  it('shows remaining chars for for multiline input with limit', () => {
    const { getByTestId } = renderInput({
      multiline: true,
      limit: 1,
      value: 'A',
      testIds: { limit: testIds.limit }
    })

    expect(getByTestId(testIds.limit)).toMatchSnapshot()
  })

  it('shows excess chars for multiline input with exceeded limit', () => {
    const { getByTestId } = renderInput({
      multiline: true,
      limit: 1,
      value: 'AB',
      testIds: { limit: testIds.limit }
    })

    expect(getByTestId(testIds.limit)).toMatchSnapshot()
  })

  it('shows entered characters for multiline input with `counter: entered`, ignoring the limit', () => {
    const { getByTestId } = renderInput({
      multiline: true,
      counter: 'entered',
      limit: 1,
      value: 'AB',
      testIds: { limit: testIds.limit }
    })

    const inputText = getByTestId(testIds.limit).textContent

    expect(inputText).toContain('2 characters entered')
    expect(inputText).not.toContain('limit')
  })

  it('is focused when autoFocus', () => {
    const { getByPlaceholderText } = renderInput({
      autoFocus: true,
      placeholder: 'test input'
    })

    const input = getByPlaceholderText('test input')

    expect(document.activeElement).toEqual(input)
  })

  it('should show reset button', () => {
    const { container } = renderInput({
      enableReset: true,
      value: 'Some value'
    })

    expect(container).toMatchSnapshot()
  })

  it('should show manual resize handler', () => {
    const { container } = renderInput({
      multiline: true,
      multilineResizable: true,
      rows: 4,
      value: 'Some value'
    })

    expect(container).toMatchSnapshot()
  })

  it('handles clicks', () => {
    const handleClick = jest.fn()
    const { getByTestId } = renderInput({
      onClick: handleClick,
      'data-testid': 'input'
    })

    const input = getByTestId('input')
    const inputWrapper = input.parentElement

    expect(inputWrapper).not.toBeNull()

    fireEvent.click(input)
    expect(handleClick).toHaveBeenCalledTimes(1)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(inputWrapper!)
    expect(handleClick).toHaveBeenCalledTimes(2)
  })
})
