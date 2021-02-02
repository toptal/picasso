import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import Rating, { Props } from './Rating'

const defaultProps: Props = {
  name: 'rating-name',
  value: 3,
  onChange: jest.fn()
}

const renderRating = (props = defaultProps) => render(<Rating {...props} />)

describe('Rating', () => {
  it('renders', () => {
    const { container } = renderRating()

    expect(container).toMatchSnapshot()
  })

  it('sets the given value', () => {
    const name = 'custom-rating-name'
    const value = 5

    const { getByTestId } = renderRating({ ...defaultProps, name, value })

    expect(getByTestId(`${name}-${value}`)).toBeChecked()
  })

  it('calls onChange', () => {
    const onChange = jest.fn()

    const name = 'custom-rating-name'
    const newValue = 4

    const { getByTestId } = renderRating({ ...defaultProps, name, onChange })

    fireEvent.click(getByTestId(`${name}-${newValue}`))

    expect(onChange).toHaveBeenCalledWith(expect.anything(), newValue)
  })

  it('is not interactive', () => {
    const onChange = jest.fn()

    const name = 'custom-rating-name'

    const { getByTestId } = renderRating({
      ...defaultProps,
      name,
      onChange,
      interactive: false
    })

    fireEvent.click(getByTestId(`${name}-1`))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('shows 5 icons by default', () => {
    const DEFAULT_NUMBER_OF_ICONS = 5
    const value = 2
    const { getAllByTestId } = renderRating({ ...defaultProps, value })

    expect(getAllByTestId('active-rating-icon')).toHaveLength(value)
    expect(getAllByTestId('inactive-rating-icon')).toHaveLength(
      DEFAULT_NUMBER_OF_ICONS - value
    )
  })

  it('shows max number of icons', () => {
    const max = 8
    const value = 2
    const { getAllByTestId } = renderRating({ ...defaultProps, value, max })

    expect(getAllByTestId('active-rating-icon')).toHaveLength(value)
    expect(getAllByTestId('inactive-rating-icon')).toHaveLength(max - value)
  })
})
