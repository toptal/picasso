import React, { Fragment } from 'react'
import { useScreen } from '@toptal/picasso/utils'
import { Typography } from '@toptal/picasso'

const UseScreenExample = () => {
  const isSmall = useScreen('small')
  const isSmallOrMedium = useScreen(['small', 'medium'])

  return (
    <Fragment>
      <Typography>{`Breakpoint 'small' matches: ${isSmall}`}</Typography>
      <Typography>{`Breakpoint 'small' or 'medium' matches: ${isSmallOrMedium}`}</Typography>
    </Fragment>
  )
}

export default UseScreenExample
