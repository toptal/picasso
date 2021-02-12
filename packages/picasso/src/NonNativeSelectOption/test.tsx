import React from 'react'
import { render } from '@toptal/picasso/test-utils'

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
})
