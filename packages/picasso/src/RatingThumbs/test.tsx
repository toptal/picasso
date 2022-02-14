import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import RatingThumbs, { Props } from './RatingThumbs'

const defaultProps = {
  name: 'rating-thumbs',
  onChange: jest.fn()
} as const

const renderRatingThumbs = (props: Partial<OmitInternalProps<Props>> = {}) => {
  const normalizedProps: Props = { ...defaultProps, ...props }
  const result = render(<RatingThumbs {...normalizedProps} />)

  return {
    ...result,

    getPositiveInput: () =>
      result.getByTestId('positive-input') as HTMLInputElement,

    getNegativeInput: () =>
      result.getByTestId('negative-input') as HTMLInputElement
  } as const
}

const expectNotNull = <T extends any>(val: T): NonNullable<T> => {
  expect(val).not.toBeNull()

  return val as NonNullable<T>
}

describe('RatingThumbs', () => {
  it.each([['small'], ['large']] as const)(
    'should render for size %s',
    size => {
      const { container } = renderRatingThumbs({ size })

      expect(container).toMatchSnapshot()
    }
  )

  it.each([
    [undefined, false, false],
    [true, true, false],
    [false, false, true]
  ])(
    'should show correct thumbs when value is %s',
    (value, positiveChecked, negativeChecked) => {
      const {
        container,
        getNegativeInput,
        getPositiveInput
      } = renderRatingThumbs({
        value
      })

      expect(container).toMatchSnapshot()

      expect(getPositiveInput().checked).toStrictEqual(positiveChecked)
      expect(getNegativeInput().checked).toStrictEqual(negativeChecked)
    }
  )

  it('should trigger onChange when clicking the label', () => {
    const onChange = jest.fn()

    const { getPositiveInput } = renderRatingThumbs({ onChange })

    const parentLabel = expectNotNull(getPositiveInput().parentElement)

    expect(parentLabel).toBeInstanceOf(HTMLLabelElement)

    fireEvent.click(parentLabel)

    expect(onChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('should not trigger onChange when not interactive', () => {
    const onChange = jest.fn()

    const { getPositiveInput } = renderRatingThumbs({
      onChange,
      interactive: false
    })

    const parentLabel = expectNotNull(getPositiveInput().parentElement)

    expect(parentLabel).toBeInstanceOf(HTMLLabelElement)

    fireEvent.click(parentLabel)

    expect(onChange).not.toHaveBeenCalled()
  })
})
