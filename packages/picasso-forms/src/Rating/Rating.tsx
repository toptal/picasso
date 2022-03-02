import React from 'react'
import {
  Rating as PicassoRating,
  RatingStarsProps as PicassoRatingStarsProps
} from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type RatingStarsProps = PicassoRatingStarsProps &
  FieldProps<PicassoRatingStarsProps['value']>

const Stars = (props: RatingStarsProps) => (
  <FieldWrapper<PicassoRatingStarsProps> {...props} type='number'>
    {inputProps => <PicassoRating.Stars {...inputProps} />}
  </FieldWrapper>
)

export const Rating = {
  Stars
}

export default Rating
