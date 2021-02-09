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
  close = noop,
  selected = false,
  highlighted = false,
  multiple = false,
  size,
  onItemSelect = noop,
  option = OPTION
}: Partial<Props<string>> = {}) =>
  render(
    <NonNativeSelectOption
      description={description}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      close={close}
      selected={selected}
      highlighted={highlighted}
      multiple={multiple}
      size={size}
      onItemSelect={onItemSelect}
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

  it('handles click', () => {
    const close = jest.fn()
    const onItemSelect = jest.fn()
    const { getByRole } = renderNonNativeSelectOption({
      close,
      onItemSelect
    })

    fireEvent.click(getByRole('option'))

    expect(close).toHaveBeenCalled()
    expect(onItemSelect.mock.calls[0][1]).toEqual(OPTION)
  })
})
