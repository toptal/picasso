import React, { Fragment } from 'react'
import { useBreakpoint } from '@toptal/picasso/utils'
import { Typography } from '@toptal/picasso'

const Example = () => {
  const isSmall = useBreakpoint('small')
  const isSmallOrMedium = useBreakpoint(['small', 'medium'])

  return (
    <Fragment>
      <Typography>{`Breakpoint 'small' matches: ${isSmall}`}</Typography>
      <Typography>{`Breakpoint 'small' or 'medium' matches: ${isSmallOrMedium}`}</Typography>
    </Fragment>
  )
}

export default Example
