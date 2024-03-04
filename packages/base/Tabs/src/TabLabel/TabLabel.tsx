import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-typography-overflow'
import { Typography } from '@toptal/picasso-typography'
import { toTitleCase } from '@toptal/picasso-utils'

interface Props {
  label?: React.ReactNode
  orientation: 'horizontal' | 'vertical'
  titleCase?: boolean
}

const TabLabel = ({ label, orientation, titleCase }: Props) => {
  if (orientation === 'horizontal') {
    return (
      <Typography as='div' size='small' weight='semibold' color='inherit'>
        {titleCase ? toTitleCase(label) : label}
      </Typography>
    )
  }

  return (
    <TypographyOverflow
      as='div'
      color='inherit'
      inline
      size='medium'
      variant='body'
      weight='semibold'
    >
      {titleCase ? toTitleCase(label) : label}
    </TypographyOverflow>
  )
}

export default TabLabel
