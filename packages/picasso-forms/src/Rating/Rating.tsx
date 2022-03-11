import React from 'react'
import {
  Rating as PicassoRating,
  RatingStarsProps as PicassoRatingStarsProps,
  RatingThumbsProps as PicassoRatingThumbsProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'
import { validators } from '../utils'

export type RatingStarsProps = PicassoRatingStarsProps &
  FieldProps<PicassoRatingStarsProps['value']>

const Stars = (props: RatingStarsProps) => (
  <FieldWrapper<PicassoRatingStarsProps> {...props} type='number'>
    {(inputProps: RatingStarsProps) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { validateStatus, ...rest } = inputProps

      return <PicassoRating.Stars {...rest} />
    }}
  </FieldWrapper>
)

export type RatingThumbsProps = PicassoRatingThumbsProps &
  FieldProps<PicassoRatingThumbsProps['value']> & { requirePositive?: boolean }

/*
 * The default required validator gives an error when the value is false, this
 * makes sense for checkboxes and similar controls, with the Thumbs component
 * however, it is expected to return false as the thumbs down option. We are
 * overriding the default required validation to only give an error on
 * null/undefined values.
 *
 * We still have an requiredPositive prop in case you need to have the default
 * behavior and requires a thumbs up for whatever reason.
 */
const thumbsRequired = (value: boolean | undefined) =>
  value == null ? validators.required(null) : undefined

const Thumbs = ({
  required,
  validate,
  requirePositive,
  ...props
}: RatingThumbsProps) => {
  const validateOverride = validators.composeValidators([
    required && !requirePositive ? thumbsRequired : undefined,
    validate
  ])

  return (
    <FieldWrapper<PicassoRatingThumbsProps>
      validate={validateOverride}
      required={requirePositive}
      {...props}
    >
      {(inputProps: RatingThumbsProps) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { validateStatus, ...rest } = inputProps

        return <PicassoRating.Thumbs {...rest} />
      }}
    </FieldWrapper>
  )
}

export const Rating = {
  Stars,
  Thumbs
} as const

export default Rating
