import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import NonNativeSelectOption, { Props } from './NonNativeSelectOption'
import noop from '../utils/noop'

const CHILDREN = 'Test'
const DESCRIPTION = 'Test description'
const OPTION = { text: '', value: '' }

const renderNonNativeSelectOption = ({
  children = CHILDREN,
  description = DESCRIPTION,
  onMouseDown = noop,
  onMouseEnter = noop,
  selected = false,
  highlighted = false,
  size,
  onClick = noop,
  option = OPTION
}: Partial<Props<string>> = {}) =>
  render(
    <NonNativeSelectOption
      description={description}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      selected={selected}
      highlighted={highlighted}
      size={size}
      onClick={onClick}
      option={option}
    >
      {children}
    </NonNativeSelectOption>
  )

describe('NonNativeSelectOption', () => {
  it('renders', () => {
    const { container } = renderNonNativeSelectOption()

    expect(container).toMatchSnapshot()
  })

  it('sets attributes correctly', () => {
    const { container, getByRole } = renderNonNativeSelectOption({
      selected: true,
      option: { text: 'Option #1', value: 'option1' }
    })

    const option = getByRole('option')

    expect(option.getAttribute('aria-selected')).toEqual('true')
    expect(option.getAttribute('value')).toEqual('option1')

    expect(container).toMatchSnapshot()
  })

  it('fires events correctly', () => {
    const onMouseDown = jest.fn()
    const onMouseEnter = jest.fn()
    const onClick = jest.fn()
    const { getByRole } = renderNonNativeSelectOption({
      onMouseDown,
      onMouseEnter,
      onClick
    })

    const option = getByRole('option')

    fireEvent.mouseDown(option)
    expect(onMouseDown).toHaveBeenCalledTimes(1)

    fireEvent.mouseEnter(option)
    expect(onMouseEnter).toHaveBeenCalledTimes(1)

    fireEvent.click(option)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
