import React from 'react'
import { Rating as PicassoRating, RatingProps } from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = RatingProps & FieldProps<RatingProps['value']>

export const Rating = (props: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FieldWrapper<RatingProps> {...props} type='number'>
    {(inputProps: RatingProps) => {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <PicassoRating {...inputProps} />
    }}
  </FieldWrapper>
)

Rating.defaultProps = {}

Rating.displayName = 'Rating'

export default Rating
