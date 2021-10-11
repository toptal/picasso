import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import NonNativeSelectOption, { Props } from './NonNativeSelectOption'
import noop from '../utils/noop'

const CHILDREN = 'Test'
const DESCRIPTION = 'Test description'
const OPTION = { text: 'Option #1', value: 'option1' }
const DISABLED_OPTION = { ...OPTION, disabled: true }

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
  describe('when option is enabled', () => {
    it('renders', () => {
      const { container } = renderNonNativeSelectOption()

      expect(container).toMatchSnapshot()
    })

    it('sets attributes correctly', () => {
      const { container, getByRole } = renderNonNativeSelectOption({
        selected: true,
        highlighted: true
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

  describe('when option is disabled', () => {
    it('renders', () => {
      const { container } = renderNonNativeSelectOption({
        option: DISABLED_OPTION
      })

      expect(container).toMatchSnapshot()
    })

    it('sets attributes correctly', () => {
      const { container, getByRole } = renderNonNativeSelectOption({
        selected: true,
        highlighted: true,
        option: DISABLED_OPTION
      })

      const option = getByRole('option')

      expect(option.getAttribute('aria-selected')).toEqual('true')
      expect(option.getAttribute('aria-disabled')).toEqual('true')
      expect(option.getAttribute('value')).toEqual('option1')

      expect(container).toMatchSnapshot()
    })
  })
})
