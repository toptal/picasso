import React from 'react'
import {
  Rating as PicassoRating,
  RatingStarsProps as PicassoRatingStarsProps,
  RatingThumbsProps as PicassoRatingThumbsProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type RatingStarsProps = PicassoRatingStarsProps &
  FieldProps<PicassoRatingStarsProps['value']>

const Stars = (props: RatingStarsProps) => (
  <FieldWrapper<PicassoRatingStarsProps> {...props} type='number'>
    {inputProps => <PicassoRating.Stars {...inputProps} />}
  </FieldWrapper>
)

export type RatingThumbsProps = PicassoRatingThumbsProps &
  FieldProps<PicassoRatingThumbsProps['value']>

const Thumbs = (props: RatingThumbsProps) => (
  <FieldWrapper<PicassoRatingThumbsProps> {...props}>
    {inputProps => <PicassoRating.Thumbs {...inputProps} />}
  </FieldWrapper>
)

export const Rating = {
  Stars,
  Thumbs
}

export default Rating
