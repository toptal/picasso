import React from 'react'
import { render, fireEvent, act } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './RatingThumbs'
import { RatingThumbs } from './RatingThumbs'

const enum DataIds {
  POSITIVE_INPUT = 'positive-input',
  NEGATIVE_INPUT = 'negative-input',
}

const defaultProps: Props = {
  name: 'rating-thumbs',
  onChange: jest.fn(),
  testIds: {
    positiveInput: DataIds.POSITIVE_INPUT,
    negativeInput: DataIds.NEGATIVE_INPUT,
  },
}

const renderRatingThumbs = (props: Partial<OmitInternalProps<Props>> = {}) => {
  const normalizedProps: Props = { ...defaultProps, ...props }
  const result = render(<RatingThumbs {...normalizedProps} />)

  return {
    ...result,

    getPositiveInput: () =>
      result.getByTestId(DataIds.POSITIVE_INPUT) as HTMLInputElement,

    getNegativeInput: () =>
      result.getByTestId(DataIds.NEGATIVE_INPUT) as HTMLInputElement,
  } as const
}

const expectNotNull = <T,>(val: T): NonNullable<T> => {
  expect(val).not.toBeNull()

  return val as NonNullable<T>
}

describe('RatingThumbs', () => {
  describe.each([
    [undefined, false, false],
    [true, true, false],
    [false, false, true],
  ])('when value is %s', (value, positiveChecked, negativeChecked) => {
    it('shows correct input checked', () => {
      const { getNegativeInput, getPositiveInput } = renderRatingThumbs({
        value,
      })

      expect(getPositiveInput().checked).toStrictEqual(positiveChecked)
      expect(getNegativeInput().checked).toStrictEqual(negativeChecked)
    })
  })

  describe('when clicking on a thumb label', () => {
    it('triggers onChange with the correct value and event', () => {
      const onChange = jest.fn()

      const { getPositiveInput } = renderRatingThumbs({ onChange })

      const parentLabel = expectNotNull(getPositiveInput().parentElement)

      expect(parentLabel).toBeInstanceOf(HTMLLabelElement)

      act(() => {
        fireEvent.click(parentLabel)
      })

      expect(onChange).toHaveBeenCalledWith(true, expect.anything())
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('when not interactive', () => {
    it("doesn't trigger onChange", () => {
      const onChange = jest.fn()

      const { getPositiveInput } = renderRatingThumbs({
        onChange,
        interactive: false,
      })

      const parentLabel = expectNotNull(getPositiveInput().parentElement)

      expect(parentLabel).toBeInstanceOf(HTMLLabelElement)

      act(() => {
        fireEvent.click(parentLabel)
      })

      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
