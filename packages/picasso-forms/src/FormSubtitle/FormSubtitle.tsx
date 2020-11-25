import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { WeightType } from '@toptal/picasso-shared'
import { Typography, Container } from '@toptal/picasso'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Title content */
  children: ReactNode
  weight?: WeightType
}

export const FormSubtitle = forwardRef<HTMLDivElement, Props>(
  function FormSubtitle({ children, weight = 'semibold', ...rest }, ref) {
    return (
      <Container
        bottom='small'
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
      >
        <Typography size='medium' weight={weight}>
          {children}
        </Typography>
      </Container>
    )
  }
)

FormSubtitle.displayName = 'FormSubtitle'

export default FormSubtitle
