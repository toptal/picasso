import React from 'react'

import TypographyOverflow from '../TypographyOverflow'
import Typography from '../Typography'
import toTitleCase from '../utils/to-title-case'

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
      variant='body'
      size='medium'
      weight='semibold'
      inline
      color='inherit'
    >
      {titleCase ? toTitleCase(label) : label}
    </TypographyOverflow>
  )
}

export default TabLabel
